import React from 'react';

/*
> Swiper
 - Willkommen
 - Erklärung
 - Einstellungen
 - Datenschutz mit der Möglichkeit eines eigenen Servers
> Callback
*/

export default function (props: {
    nextPath?: string
}) {

    //TODO: Einführung einrichten

    return (

        <div className="introduction">

            <div className="logo">
                <img src="./img/light/logo.png" />
            </div>

            <div className="slogan">
                offline<br />
                überall<br />
                VokabApp
            </div>

            <div className="button" onClick={_ => {
                if (props.nextPath) 
                    location.hash = "#/" + props.nextPath
                else
                    location.hash = "#/stack"
            }}>
                App starten
            </div>

        </div>
    )

}