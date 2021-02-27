// import * as dbHistory from "../database/service/history"
import { addDays, randomInt } from "./utils";
import config from "./config";
import events from "./events";

const createNotifications = (id:number, time: string, isEntryToday: boolean) => {
    
    // globalThis.cordova.plugins.notification.local.getAll(console.log) -> Gespeicherte Erinnerungen

    if (time.length !== 5) return;
    const notifyTime:number[] = time.split(":").map(e => parseInt(e));
    let d = new Date();
    const rand = randomInt();

    for (let i = 0; i <= 14; i++) {

        if (i === 0 && isEntryToday) d = addDays(d, 1);
        
        (globalThis as any).cordova.plugins.notification.local.schedule({
            id: rand + i,
            title: `${id}. Er­in­ne­rung 🔔 (Tag ${i})`,
            text: 'Heute wurden noch keine Vokabeln gelernt.',
            trigger: { at: new Date(d.getFullYear(), d.getMonth(), d.getDate(), notifyTime[0], notifyTime[1]) }
        });

        d = addDays(d, 1);

    }

}

const updateNotification = () => {

    if (!(globalThis as any).cordova) return;

    (globalThis as any).cordova.plugins.notification.local.cancelAll();

    // dbHistory.isEntryAtDay((isEntryToday: boolean) => {

    //     const c = config.get;

    //     if (c("notification:firstEnabled")) {
    //         createNotifications(1, c("notification:firstTime"), isEntryToday);
    //     }
    //     if (c("notification:secondEnabled")) {
    //         createNotifications(2, c("notification:secondTime"), isEntryToday);
    //     }

    // });

}

events.on("historyChange", () => {
    updateNotification();
})

events.on("configChange", (changedConfigID: any) => {

    if (!changedConfigID.startsWith("notification:")) return;
    updateNotification();

});

events.on("startApp", () => {
    updateNotification();
})