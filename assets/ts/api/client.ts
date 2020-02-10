import { randomInt } from "../utils/utils";
import { dbService } from "../database/service/main";

interface CallBack {
    (err: Boolean, data?: any);
}

class APIClient {

    get baseUrl () {
        return globalThis.config.get("api:base");
    }

    basicRequest ({ path, call }: { path: string; call: CallBack; }) {
        $.getJSON(this.baseUrl + path + "?c=" + randomInt(10), (json) => {
            call(false, json);
        }).fail(() => {
            call(true, "Informationen konnten nicht geladen werden.")
        });
    }

    basicPost ({ path, data = {}, call }: { path: string; data:any; call: CallBack; }) {

        data.sessionID = globalThis.config.get("api:sessionID");

        $.post(this.baseUrl + path, data, (res) => {
            call(false, res);
        }).fail(() => {
            call(true, "Die Verbindung ist fehlgeschlagen.");
        });

    }

    destroySession (call: CallBack): void {
        this.basicPost({
            path: "/sync.php",
            data: {destroySession: true},
            call: (err, message) => {
                if (err) {
                    alert("Fehler: " + message);
                } else {
                    globalThis.config.set("api:sessionID", null)
                }
                call(false);
            }
        })
    }

    createNewSession (call: CallBack) {

        this.basicRequest({
            path: "/sync.php",
            call
        })
        
    }

    checkSessionID (call: CallBack) {

        const sessionID:string = globalThis.config.get("api:sessionID");
        $.post(this.baseUrl + "sync.php", {checkSessionID:true, sessionID}, (res) => {
            try {
                if (res.ok) call(false, true);
                else call(false, false);
            } catch (error) {
                console.log(error);
                call(true, "Die Verbindung ist fehlgeschlagen.");
            }
        });

    }

    downloadLists (listIDs: number[], call: CallBack) {

        this.basicPost({
            path: "/getlist.php",
            data: {getListsByIDs: listIDs},
            call: (err, message) => {
                if (err) {
                    return call(true, message);
                }
                console.log(message);
                dbService.importItems(message.items, ()=>{
                    call(false, listIDs);
                })
            }
        })

    }

    getJSONListInfo (call: CallBack) {
        this.basicRequest({ path: "data/info.json", call });
    }

    getJSONList (path:string, call: CallBack) {
        this.basicRequest({ path, call });
    }

}

export default new APIClient();