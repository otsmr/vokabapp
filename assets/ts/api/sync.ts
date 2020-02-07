
import apiClient from "./client";
import { dbService } from "./../database/service/main";
import dbHistory from "./../database/service/history";

class Sync {

    constructor () {

        globalThis.events.on("configChange", () => {
            this.checkSyncTigger("config");
        })

        globalThis.events.on("historyChange", () => {
            this.checkSyncTigger("history");
        })

    }

    checkSyncTigger (type) {
        if (
            globalThis.config.get("sync:trigger") === "change" ||
            globalThis.config.get("sync:trigger") === "always") {

                if (type === "config") this.syncConfig();
                if (type === "history") this.syncProgress();
        }
    }

    init (doneCall: Function = () => {}) {
        
        let count = 0;
        let ok = false;
        if (!globalThis.config.get("api:sessionID")) {
            return doneCall();
        }
        const done = (status) => {
            if (status) ok = status;
            count++;
            if (count === 2) {
                if (ok) globalThis.config.set("api:lastSync", new Date().getTime());
                doneCall();
            }
        }
        this.syncConfig((s)=>{
            done(s);
        });
        this.syncProgress((s)=>{
            done(s);
        });

    }

    syncConfig (done:Function = () => {}) {

        const config = globalThis.config.exportConfig();

        apiClient.basicPost({
            path: "sync.php",
            data: {config},
            call: (err, response) => {
                if(err) {
                    console.warn(response);
                    return done(false);
                } else {
                    globalThis.config.set("api:lastSync", new Date().getTime());
                    if (response.config) {
                        globalThis.config.importConfig(response);
                        globalThis.events.afterConfigSync(true);
                    } else globalThis.events.afterConfigSync(false);
                }
                done(true);
            } 
        });

    }

    syncProgress (done:Function = () => {}) {

        dbHistory.getDataForSync((history)=>{

            apiClient.basicPost({
                path: "sync.php",
                data: {history},
                call: async (err, res) => {
    
                    if (err) return done(false)
                    else {
    
                        globalThis.config.set("api:lastSync", new Date().getTime());
    
                        if (res.historysFromServer && res.historysFromServer.length > 0) {
                            // Herunterladen
                            await dbHistory.importNewHistory(res.historysFromServer);
                        }

                        if (res.uploadedHistorys && res.uploadedHistorys.length > 0) {
                            // Hochgeladen
                            await dbHistory.uploadedHistorys(res.uploadedHistorys);
                        }
    
                    }
    
                    done(true);
                    
                } 
            });

        });

    }

    syncMetaData (done:Function = () => {}) {

        apiClient.basicPost({
            path: "getlist.php",
            data: {getMetaData: true},
            call: (err, response:any) => {
                if (err) {
                    globalThis.events.error("API", "Fehler beim Herunterladen der Liste.");
                } else {
                    dbService.importMetadata(response);
                }
                done();
            }
        })

    }

}

export default Sync;