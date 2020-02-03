import * as JsStore from 'jsstore';

import {
    groupsTable,
    subGroupsTable,
    listsTable,
    itemsTable,
    historysTable
} from "./tables"

export const idbCon = new JsStore.Instance();
// export const idbCon = new JsStore.Instance(new Worker("./../lib/jsstore.worker.min.js"));

export const dbname = 'VokabApp';

export const initJsStore = () => {
    
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