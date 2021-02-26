import React from 'react';
import ReactDOM from 'react-dom';

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


function VokabApp (props: {}) {


    return (
        <>

            <Navigation />

            <main>

                <div className="app-loader">
                    <div className="logo">
                        <p className="img"></p>
                    </div>
                    <p className="footer">VokabApp wird geladen</p>
                </div>

            </main>

        </>
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