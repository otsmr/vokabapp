
import { threePointMenuInterfaces }  from "../../layout/threePointMenu" 
import { shuffleArray } from "../../utils/array";
import { getDBTime } from "../../utils/utils";

import SwipeManage from "./swiper/manage"

import dbHistory from "../../database/service/history";
import dbKastenService from "../../database/service/kasten";


export default class Kasten {

    kastenID:string;
    title:string;
    element:JQuery = $("<div>");
    lastQueryResult:({itemsByListID: any, lists: any, listsForTodayThrough: any});
    isKastenUsed: boolean = false;

    ready (items) {

        if (parseInt(this.kastenID) === 0) items = [];
        
        // Kasten 6 ist der Letzte, weshalb die Items immer in diesem bleiben
        let insertItems = items.filter(e => e.known).map(e => {
            return {
                box: (parseInt(this.kastenID) === 6) ? 6 : parseInt(this.kastenID) + 1,
                itemID: e.itemID,
                time: getDBTime()
            }
        });
        
        if (parseInt(this.kastenID) === 5) {
            // Im Kasten 5 falsch -> Item geht zurück in 2.
            const backToKastenTwo = items.filter(e => !e.known).map(e => {
                return {
                    box: 2,
                    itemID: e.itemID,
                    time: getDBTime()
                }
            });
            insertItems.push(backToKastenTwo);
        }
        dbHistory.insertItemsInHistory(insertItems, (err, res)=>{

            if (err) M.toast({html: "Fehler: " + res.message});
            
            this.isKastenUsed = false;
            //TODO: Ergebnisse anzeigen über items
            // this.displayResults(items);
            this.element.empty();

        })

    }

    createSwipe (items, list) {

        const rounds = [4, 4, 4, 3, 3, 2, 2];

        this.element.empty().css({
            transform: "scale(0.9)",
            opacity: 0
        });

        setTimeout(() => {
            this.element.css({
                transition: "100ms",
                transform: "scale(1)",
                opacity: 1
            });
        }, 10);

        setTimeout(() => {
            this.element.css("transition", "none");
        }, 110);

        new SwipeManage({
            parentElement: this.element,
            items: itemsSelected,
            typeNames: [
                list.aTitel,
                list.bTitel
            ],
            rounds: rounds[parseInt(this.kastenID)],
            callBack: (items) => {
                this.ready(items);
            }
        })


    }

}