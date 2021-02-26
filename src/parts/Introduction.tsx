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
    next: {(): void}
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

            <div className="button" onClick={props.next}>
                App starten
            </div>

        </div>
    )

}