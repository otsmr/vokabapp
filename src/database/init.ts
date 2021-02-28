import * as JsStore from 'jsstore';

import {
    groupsTable,
    subGroupsTable,
    listsTable,
    itemsTable,
    historysTable
} from "./tables"

export const idbCon = new JsStore.Connection();
export const dbname = 'VokabApp';

export default function () {
    
    try {

        idbCon.initDb({
            name: dbname,
            tables: [
                groupsTable,
                subGroupsTable,
                listsTable,
                itemsTable,
                historysTable
            ]
        });
        
    }
    catch (ex) {
        console.error("initDB", ex);
    }
};