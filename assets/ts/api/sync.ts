
import apiClient from "./client";
import { dbService } from "./../database/service/main";
import dbHistory from "./../database/service/history";

export const initSync = ():void => {

    globalThis.events.on("configChange", () => {
        checkSyncTigger("config");
    })

    globalThis.events.on("historyChange", () => {
        checkSyncTigger("history");
    })

}

export const syncAll = (doneCall: {(err: boolean)} = () => {}):void => {
        
    let count = 0;
    let ok = false;
    if (!globalThis.config.get("api:sessionID")) {
        return doneCall(true);
    }
    
    const done = (status: boolean) => {
        if (status) ok = status;
        count++;
        if (count === 2) {
            if (ok) globalThis.config.set("api:lastSync", new Date().getTime());
            doneCall(false);
        }
    }

    syncConfig((err: boolean)=>{
        done(!err);
    });
    syncProgress((err: boolean)=>{
        done(!err);
    });

}

export const syncMetaData = (done: {(err: boolean)} = () => {}):void => {

    apiClient.basicPost({
        path: "getlist.php",
        data: {getMetaData: true},
        call: async (err: boolean, response:any) => {
            if (err) {
                globalThis.events.error("API", "Fehler beim Herunterladen der Liste.");
                return done(true);
            }
            await dbService.importMetadata(response);
            done(false);
        }
    })

}

const checkSyncTigger = (type:string):void => {

    const trigger = globalThis.config.get("sync:trigger");
    if ( ["change", "always"].indexOf(trigger) === -1)  return;

    switch (type) {
        case "config": syncConfig(); break;
        case "history": syncProgress(); break;
    }

}

const syncConfig = (done: {(err: boolean)} = () => {}) => {

    const config = globalThis.config.exportConfig();

    apiClient.basicPost({
        path: "sync.php",
        data: {config},
        call: (err, response) => {
            if(err) {
                console.warn(response);
                return done(true);
            } else {
                globalThis.config.set("api:lastSync", new Date().getTime());
                if (response.config) {
                    globalThis.config.importConfig(response);
                    globalThis.events.afterConfigSync(true);
                } else globalThis.events.afterConfigSync(false);
            }
            done(false);
        } 
    });

}

const syncProgress = (done: {(err: boolean)} = () => {}): void => {

    dbHistory.getDataForSync((history)=>{

        apiClient.basicPost({
            path: "sync.php",
            data: {history},
            call: async (err: boolean, res: { historysFromServer?: any[], uploadedHistorys?: any[] }) => {

                if (err) return done(true);

                globalThis.config.set("api:lastSync", new Date().getTime());

                if (res.historysFromServer && res.historysFromServer.length > 0) 
                    await dbHistory.importNewHistory(res.historysFromServer); // Neue HistoryItems heruntergeladen

                if (res.uploadedHistorys && res.uploadedHistorys.length > 0) 
                    await dbHistory.uploadedHistorys(res.uploadedHistorys); // Diese HistoryItems wurden hochgeladen

                done(false);
                
            } 
        });

    });

}