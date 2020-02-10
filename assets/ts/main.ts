///<reference path="../../node_modules/@types/jquery/jquery.d.ts" />

const g = globalThis;
g.VERSION = "1.0.0";

import "./utils/events"
import "./utils/config"
import "./utils/notifications"

import { initThemeMode } from "./utils/utils"

import "./tabs/index"

import "./layout/navigation"
import "./layout/threePointMenu"
import "./layout/materialize"
import displayIntroduction from "./layout/introduction"


import { initSync, syncAll } from "./api/sync";

initThemeMode();
initSync();

const startApp = () => {

    if (g.config.get("general:displayIntroduction")) {
        return displayIntroduction(globalThis.events.startApp());
    }

    const trigger = g.config.get("sync:trigger");

    if (navigator.onLine && ["startup", "always"].indexOf(trigger) > -1) {
        
        syncAll(globalThis.events.startApp);

    } else globalThis.events.startApp();
    
}

if (globalThis.cordova) {
    document.addEventListener("deviceready", startApp, false);
} else window.onload = startApp;