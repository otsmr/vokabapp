///<reference path="../../node_modules/@types/jquery/jquery.d.ts" />
///<reference path="./@types/html.modul.ts" />

import g from "./globals"

import "./layout/navigation"
import { registerEventsMaterialize } from "./layout/materialize"
registerEventsMaterialize();

import initTab from "./tabs/tabs"
import initThreePointMenu from "./layout/threePointMenu"

import { initThemeMode } from "./utils/utils"
initThemeMode();

import { initNotification } from "./utils/notifications"

const startUp = () => {

    initNotification();

    $("nav").fadeIn(0);
    $("main").empty();

    g.threePointMenu = initThreePointMenu();
    g.tabs = initTab();

    let openTab = ["kasten", "1"];
    if (g.config.get("general:saveOpenPage")) 
        openTab = globalThis.config.get("general:openPage");
    g.tabs.changeTab(openTab);

}

const startApp = () => {
    
    const trigger = g.config.get("sync:trigger");

    if (navigator.onLine && ["startup", "always"].indexOf(trigger) > -1) {
        
        g.sync.init(()=>{
            startUp();
        });

    } else  startUp();
    
}

if (globalThis.cordova) {
    document.addEventListener("deviceready", startApp, false);
} else window.onload = startApp;