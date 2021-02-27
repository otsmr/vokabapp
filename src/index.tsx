import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route, HashRouter } from "react-router-dom"

import "./assets/sass/main.sass"
// const g = globalThis;
// g.VERSION = "1.0.0";

// import "./utils/events"
// import "./utils/config"
// import "./utils/notifications"

// import { initThemeMode } from "./utils/utils"

// import "./tabs/index"

// import "./layout/navigation"
// import "./layout/threePointMenu"
// import "./layout/materialize"
// import displayIntroduction from "./layout/introduction"

// import { initSync, syncAll } from "./api/sync";

import Navigation from "./parts/Navigations"
import Settings from './pages/Settings';

import { initMaterialize } from "./utils/materialize"
import Statistics from './pages/Statistics';
import events from './utils/events';
import config from './utils/config';

function getTitel () {
    let pageID = location.hash.slice(location.hash.indexOf("/")+1);

    switch (pageID) {
        case "settings": return "Einstellungen";
        case "statistics": return "Statistik";
        default: return "VokabApp";
    }
}


function VokabApp (props: {}) {

    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitel] = useState(getTitel());

    useEffect(() => {

        initMaterialize();
        setIsLoading(false);

        events.on("configChange", () => {
            document.querySelector("body")?.classList[(config.get("general:darkMode")) ? "add" : "remove"]("dark");
        })

        window.addEventListener("hashchange", () => {
            setTitel(getTitel());
        })

    }, []);

    return (
        <HashRouter>

            {(isLoading) ? (
                <div className="app-loader">
                    <div className="logo">
                        <p className="img"></p>
                    </div>
                    <p className="footer">VokabApp wird geladen</p>
                </div>
            ) : (
                <>
                <Navigation title={title} />
                <main>
                    <Switch>

                        <Route path="/settings" exact >
                            <Settings />
                        </Route>
                        <Route path="/statistics" exact >
                            <Statistics />
                        </Route>

                    </Switch>
                </main>
                </>
            )}
    
        </HashRouter>
    )

}


ReactDOM.render(<VokabApp />, document.getElementById('root'));


// initThemeMode();
// initSync();

// const startApp = () => {

//     if (g.config.get("general:displayIntroduction")) {
//         return displayIntroduction(globalThis.events.startApp());
//     }

//     const trigger = g.config.get("sync:trigger");

//     if (navigator.onLine && ["startup", "always"].indexOf(trigger) > -1) {
        
//         syncAll(globalThis.events.startApp);

//     } else globalThis.events.startApp();
    
// }

// if (globalThis.cordova) {
//     document.addEventListener("deviceready", startApp, false);
// } else window.onload = startApp;