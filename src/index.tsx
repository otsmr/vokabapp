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


function VokabApp (props: {}) {


    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        initMaterialize();
        setIsLoading(false);
    }, []);


    return (
        <HashRouter>

            <Navigation title={"App wird geladen"} />

            <main>
                {(isLoading) ? (
                    <div className="app-loader">
                        <div className="logo">
                            <p className="img"></p>
                        </div>
                        <p className="footer">VokabApp wird geladen</p>
                    </div>
                ) : (
                    <Switch>

                        <Route path="/settings" exact >
                            <Settings />
                        </Route>
                        <Route path="/statistics" exact >
                            <Statistics />
                        </Route>

                    </Switch>
                )}
            </main>
    
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