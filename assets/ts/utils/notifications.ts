import dbHistory from "../database/service/history"
import { addDays, randomInt } from "./utils";

const createNotifications = (id:number, time: string, isEntryToday: boolean) => {
    
    // globalThis.cordova.plugins.notification.local.getAll(console.log) -> Gespeicherte Erinnerungen

    if (time.length !== 5) return;
    const notifyTime:number[] = time.split(":").map(e => parseInt(e));
    let d = new Date();
    const rand = randomInt();

    for (let i = 0; i <= 14; i++) {

        if (i === 0 && isEntryToday) {
            d = addDays(d, 1);
        }

        globalThis.cordova.plugins.notification.local.schedule({
            id: rand + i,
            title: `${id}. Er­in­ne­rung 🔔 (Tag ${i})`,
            text: 'Heute wurden noch keine Vokabeln gelernt.',
            trigger: { at: new Date(d.getFullYear(), d.getMonth(), d.getDate(), notifyTime[0], notifyTime[1]) }
        });

        d = addDays(d, 1);

    }

}

const updateNotification = () => {

    if (!globalThis.cordova) {
        return globalThis.events.error("notifications", "Cordova ist nicht definiert.");
    }

    globalThis.cordova.plugins.notification.local.cancelAll(console.log)

    dbHistory.isEntryAtDay((isEntryToday: boolean) => {

        const config = globalThis.config.get;

        if (config("notification:firstEnabled")) {
            const time = config("notification:firstTime");
            createNotifications(1, time, isEntryToday);
        }
        if (config("notification:secondEnabled")) {
            const time = config("notification:secondTime");
            createNotifications(2, time, isEntryToday);

        }

    });

}


export const initNotification = () => {

    globalThis.events.on("historyChange", () => {
        updateNotification();
    })
    globalThis.events.on("configChange", (changedConfigID) => {
        if (changedConfigID.startsWith("notification:")) {
            updateNotification();
        }
    })
    updateNotification();

}