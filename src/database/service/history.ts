import React from 'react';
import { DBService, CallBack } from "./main";
import { getDBTime } from "../../utils/utils";
import events from '../../utils/events';


class DBHistoryService extends DBService {

    isEntryAtDay (call: {(isEnty: boolean): void}, date:Date = new Date()) {

        const day = getDBTime(date);

        this._default(this.conn.select({
            from: "historys",
            where: {
                time: {
                    ">": day
                }
            },
            limit: 1
        }), (err, isEntry) => {

            if (err) return events.error("database", err);

            call((isEntry.length === 0) ? false : true);

        })

    }

    getDataForSync (call: any) {

        this._default(this.conn.select({
            from: "historys",
            where: {
                historyDBID: -1
            }
        }), (err, uploadHistory) => {

            this._default(this.conn.select({
                from: "historys",
                limit: 1,
                order: {
                    by: "historyDBID",
                    type: "desc"
                }
            }), (err, lastHistoryDBID) => {

                if (lastHistoryDBID.length === 0) lastHistoryDBID = null;
                else lastHistoryDBID = lastHistoryDBID[0]["historyDBID"];
                if (lastHistoryDBID === -1) lastHistoryDBID = null;

                call({
                    uploadHistory,
                    lastHistoryDBID
                });
    
            });

        });

    }

    async importNewHistory (history: any[]) {

        history = history.map(e => {
            return {
                box: parseInt(e.box),
                itemID: parseInt(e.itemID),
                time: getDBTime(new Date(e.time)),
                historyID: parseInt(e.historyID),
                historyDBID: parseInt(e.historyDBID)
            }
        })

        await this.conn.insert({
            "into": "historys",
            values: history
        });

    }

    async uploadedHistorys (uploadedHistorys: any[]) {

        for (const history of uploadedHistorys) {
            await this.conn.update({
                in: "historys",
                set: {
                    historyDBID: history.historyDBID
                },
                where: {
                    historyID: history.historyID
                }
            });
        }

    }

    insertItemsInHistory (items: any, call: CallBack) {

        this._default(this.conn.insert({
            "into": "historys",
            values: items
        }), (err, data) => {
            call(err, data);
            events.historyChange();
        });

    }

    getCountItemsinHistoryByBox (call: CallBack) {

        this.getDownloadedListIDs(async (err, listIDs)=>{
            
            const sqlQuery = {
                from: "historys",
                groupBy: "itemID",
                join: {
                    with: "items",
                    type:"inner",
                    on: "historys.itemID=items.itemID",
                    where: ["_"]
                }
            }

            const listWhere: any[] = [];
            for (const listID of listIDs) {
                listWhere.push({
                    or: { "listID": listID }
                })
            }
            sqlQuery.join.where = listWhere;

            const listTotalCount = await this.conn.count({
                from: "items",
                where: listWhere
            });

            this._default(this.conn.select(sqlQuery), (err, result) => {

                const counts: any = {
                    1: listTotalCount - result.length,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0,
                    6: 0
                };

                result.forEach((e: { box: string | number; }) => {
                    counts[e.box]++;
                });
                
                call(err, counts);
                
            });

        })

    }

}

export default new DBHistoryService();