///<reference path="../../node_modules/@types/jquery/jquery.d.ts" />

import g from "./globals"

import "./layout/navigation"
import { registerEventsMaterialize } from "./layout/materialize"
registerEventsMaterialize();

import initTab from "./tabs/index"
import initThreePointMenu from "./layout/threePointMenu"
import intoduction from "./layout/introduction"

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

const startApp2 = () => {
    const trigger = g.config.get("sync:trigger");

    if (navigator.onLine && ["startup", "always"].indexOf(trigger) > -1) {
        
        g.sync.init(()=>{
            startUp();
        });

    } else  startUp();
}

const startApp = () => {

    if (g.config.get("general:displayIntroduction")) {
        intoduction(startApp2);
    } else startApp2();
    

    
}

if (globalThis.cordova) {
    document.addEventListener("deviceready", startApp, false);
} else window.onload = startApp;