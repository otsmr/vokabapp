import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route, HashRouter, Redirect } from "react-router-dom"

import "./assets/sass/main.sass"

import Navigation from "./parts/Navigations"
import Settings from './pages/Settings';

import { initMaterialize } from "./utils/materialize"
import initDatabase from "./database/init"
import Statistics from './pages/Statistics';
import events from './utils/events';
import config from './utils/config';
import Overview from './pages/Overview';
import Stack from './pages/Stack';
import Introduction from './pages/Introduction';

function getTitel () {
    let pageID = location.hash.slice(location.hash.indexOf("/")+1);
    if (pageID.indexOf("/") > -1) {
        pageID = pageID.slice(0, pageID.indexOf("/"));
    }

    switch (pageID) {
        case "settings": return "Einstellungen";
        case "statistics": return "Statistik";
        case "overview": return "Kartenübersicht";
        case "stack": return "Stapel";
        default: return "VokabApp";
    }
}

const setThemeMode = () => document.querySelector("body")?.classList[(config.get("general:darkMode")) ? "add" : "remove"]("dark");

function VokabApp (props: {}) {

    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitel] = useState(getTitel());

    useEffect(() => {

        initDatabase();
        initMaterialize();
        setThemeMode();
        setIsLoading(false);

        events.on("configChange", () => {
            setThemeMode();
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
                <Switch>
                    <Route path="/intro" exact>
                        <Introduction />
                    </Route>
                    <Route path="*">
                        <Navigation title={title} />
                        <main>
                            <Switch>

                                <Route path="/stack" >
                                    <Stack />
                                </Route>
                                <Route path="/settings" exact >
                                    <Settings />
                                </Route>
                                <Route path="/statistics" exact >
                                    <Statistics />
                                </Route>
                                <Route path="/overview" exact >
                                    <Overview />
                                </Route>

                                <Route path="*">
                                    <Redirect to="/overview"/>
                                </Route>

                            </Switch>
                        </main>
                    </Route>
                </Switch>
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