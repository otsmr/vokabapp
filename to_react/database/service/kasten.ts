import { DBService, CallBack } from "./main";
import { getStartOfDay, getDBTime } from "./../../utils/utils";
import { shuffleArray } from "../../utils/array";

class DBKastenService extends DBService {

    getItemsForKasten (kastenID: number, call: CallBack) {

        this._default(this.conn.select({
            from: 'historys',
            groupBy: "itemID",
            join: {
                with: "items",
                on: "historys.itemID=items.itemID",
            },
            order: {
                by: "historys.time",
                type: "asc"
            }
        }), (err, allItems) => {

            let items = allItems.filter(e => e.box === kastenID);

            const time = getDBTime(getStartOfDay());
    
            let timeForKasten = time * 2;
    
            if (kastenID >= 2 && kastenID <= 6) {
                timeForKasten = time - globalThis.config.get(`boxTimes:${kastenID}`)
            }

            const openItems = items.length;
            items = items.filter(item => (item.time < timeForKasten));

            this._returnItemsForKasten(kastenID, err, allItems, items, call, openItems - items.length);
            
        });
        
    }
    
    _returnItemsForKasten (kastenID, err: Boolean, allItems, items, call: CallBack, openItems: number = 0) {
        
        if (err) return call(true, "Fehler in Datenbank: " + items.message);
        
        const time = getDBTime(getStartOfDay());
        const inUse = items.map(e => e.itemID);

        const listsForTodayThrough = Array.from(
            new Set(
                allItems
                    .filter(h => (h.box === kastenID + 1 && h.time > time))
                    .map(e => e.listID)
            )
        );

        this._default(this.conn.select({
            from: 'items'
        }), (err, allItems) => {
            if (err) return call(true, "Fehler in Datenbank");
            if (allItems.length === 0) return call(false, {
                openItems: 0,
                items: [],
                lists: [],
                listsForTodayThrough
            });

            this.getListsByGroups((err, lists)=> {
                if (err) return call(true, "Fehler in Datenbank");
                let filteredItems = items;

                if (kastenID === 1) {
                    filteredItems = allItems.filter(i => inUse.indexOf(i.itemID) === -1)
                }

                const byListID = {};
                for (const item of filteredItems) {
                    if (!byListID[item.listID]) byListID[item.listID] = [];
                    byListID[item.listID].push(item);
                }

                call(false, {
                    itemsByListID: byListID,
                    lists,
                    openItems,
                    listsForTodayThrough
                });
            })

        });

    }

    getItemsForKastenOne (call: CallBack) {

        //* Alle, die noch nicht in der History sind.

        this._default(this.conn.select({
            from: 'historys',
            join: {
                with: "items",
                on: "historys.itemID=items.itemID",
            },
            order: {
                by: "historys.time",
                type: "asc"
            }
        }), (err, historys) => {

            this._returnItemsForKasten(1, err, historys, historys, call);

        });

    }

    getItemsForKastenTrain (call: CallBack) {

        //* Alle, die noch nicht in der History sind.

        this._default(this.conn.select({
            from: 'items'
        }), (err, items) => {

            items = shuffleArray(items);

            this._returnItemsForKasten(0, err, items, items, call);

        });

    }

}

export default new DBKastenService();