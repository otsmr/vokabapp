import React from 'react';
import { randomInt } from "../utils/utils";
// import { dbService } from "../database/service/main";
import config from '../utils/config';
import events from '../utils/events';
import { dbService } from '../database/service/main';

interface CallBack {
    (err: Boolean, data?: any): void;
}

function post (path: string, body: any, call: CallBack) {
    
    body.sessionID = config.get("api:sessionID");

    var form_data = new FormData();

    for ( var key in body ) {
        form_data.append(key, body[key]);
    }

    fetch(config.get("api:base") + path, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'application/json'
        },
        body: form_data
    })
    .then(e => e.json())
    .then(data => {
        call(false, data);
    })
    .catch(err => {
        call(true, "Die Verbindung ist fehlgeschlagen.");
    });


}

export function downloadLists (listIDs: number[], call: CallBack) {
    
    post("/getlist.php", {
        getListsByIDs: JSON.stringify(listIDs)
    }, (err, message) => {
        if (err) {
            return call(true, message);
        }
        console.log(message);
        dbService.importItems(message.items, ()=>{
            call(false, listIDs);
        })
    })

}

export function getMetaData (call: CallBack) {

    post("getlist.php", {getMetaData: true}, (err, data) => {
        if (err) {
            events.error("API", "Fehler beim Herunterladen der Liste.");
            return call(true);
        }
        call(false, data);
    })

}

export function getListInfos () {

}

// class APIClient {

//     get baseUrl () {
//         return globalThis.;
//     }

//     basicRequest ({ path, call }: { path: string; call: CallBack; }) {
//         $.getJSON(this.baseUrl + path + "?c=" + randomInt(10), (json) => {
//             call(false, json);
//         }).fail(() => {
//             call(true, "Informationen konnten nicht geladen werden.")
//         });
//     }

//     destroySession (call: CallBack): void {
//         this.basicPost({
//             path: "/sync.php",
//             data: {destroySession: true},
//             call: (err, message) => {
//                 if (err) {
//                     alert("Fehler: " + message);
//                 } else {
//                     globalThis.config.set("api:sessionID", null)
//                 }
//                 call(false);
//             }
//         })
//     }

//     createNewSession (call: CallBack) {

//         this.basicRequest({
//             path: "/sync.php",
//             call
//         })
        
//     }

//     checkSessionID (call: CallBack) {

//         const sessionID:string = globalThis.config.get("api:sessionID");
//         $.post(this.baseUrl + "sync.php", {checkSessionID:true, sessionID}, (res) => {
//             try {
//                 if (res.ok) call(false, true);
//                 else call(false, false);
//             } catch (error) {
//                 console.log(error);
//                 call(true, "Die Verbindung ist fehlgeschlagen.");
//             }
//         });

//     }

// }

// export default new APIClient();