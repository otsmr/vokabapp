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