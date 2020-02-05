///<reference path="../../node_modules/@types/jquery/jquery.d.ts" />
///<reference path="./@types/html.modul.ts" />

const g = globalThis;

g.VERSION = "1.0.0";

import * as M from "materialize-css";
import config from "./utils/config";
import Sync from "./api/sync";
import {Events} from "./utils/events";
g.events = new Events();
g.config = config;
g.sync = new Sync();

import "./layout/navigation";
import initTab from "./tabs/tabs";
import initThreePointMenu from "./layout/threePointMenu";
import { updateThemeMode } from "./utils/utils";

updateThemeMode();
g.events.on("configChange", updateThemeMode);
g.events.on("afterConfigSync", updateThemeMode);


const startUp = () => {

    $("nav").fadeIn(0);
    $("main").empty();

    M.AutoInit(document.body);

    setTimeout(() => {
        
        //TODO: Code aufräumen
        const elems:any = document.querySelectorAll('.timepicker');
        for (const el of elems) {
            const instances = M.Timepicker.getInstance(el);
            instances.destroy();
        }
    
        $('.timepicker').timepicker({
            twelveHour: false,
            autoClose: true,
            i18n: {
                cancel: "Abbrechen",
                done: "Ok"
            },
            vibrate: true
        });
        $(".timepicker-modal").appendTo("body");

    }, 150);


    g.events.on("afterPageChange", () => {
        M.AutoInit(document.body);
    })

    g.threePointMenu = initThreePointMenu();
    g.tabs = initTab();

    let openTab = ["kasten", "1"];
    if (config.get("general:saveOpenPage")) 
        openTab = globalThis.config.get("general:openPage");
    g.tabs.changeTab(openTab);

}

const startApp = () => {
    
    if (globalThis.cordova && false) {
        
        //TODO: Erinnerungen erstellen für die nächste Woche.
        //TODO: Nach einem Abgeschlossenen Kasten heute keine Errinerung mehr 
        globalThis.cordova.plugins.notification.local.getAll(console.log)
        globalThis.cordova.plugins.notification.local.cancelAll(console.log)

        globalThis.cordova.plugins.notification.local.schedule([
            {
                id: 1,
                title: '1. Er­in­ne­rung 🔔',
                text: 'Heute wurden noch keine Vokabeln gelernt.',
                trigger: { at: new Date(2020, 1, 5, 20, 23) }
            },
            {
                id: 2,
                title: '2. Er­in­ne­rung 🔔',
                text: 'Heute wurden noch keine Vokabeln gelernt.',
                trigger: { at: new Date(2020, 1, 5, 20, 23, 30) }
            }
        ]);
        globalThis.cordova.plugins.notification.local.getAll(console.log)
    }

    if (
        navigator.onLine &&
        config.get("sync:trigger") === "startup" ||
        config.get("sync:trigger") === "always"
    ) {
        
        g.sync.init(()=>{
            startUp();
        });

    } else {
        startUp();
    }

}

if (globalThis.cordova) {
    document.addEventListener("deviceready", startApp, false);
} else window.onload = startApp;