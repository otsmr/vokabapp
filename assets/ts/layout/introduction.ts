/*
> Swiper
 - Willkommen
 - Erklärung
 - Einstellungen
 - Datenschutz mit der Möglichkeit eines eigenen Servers
> Callback
*/


export default (callback:Function = null):void => {

    //TODO: Einführung einrichten

    const node = $(`<div class="introduction">

        <div class="logo">
            <img src="./img/light/logo.png">
        </div>

        <div class="slogan">
            offline<br>
            überall<br>
            VokabApp
        </div>

        <div class="button">
            App starten
        </div>

    </div>
    `)

    $("app").prepend(node);

    node.find(".button").click(()=>{
        node.remove();
        globalThis.config.set("general:displayIntroduction", false)
        if (callback) callback();
    })

}