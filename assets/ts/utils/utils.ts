export function getStartOfDay(date: Date = new Date()) {
   
    const d= date;
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d.getTime();
    
}

export function morph (query:string):void  {

    const div:Element = document.querySelector(query);

    const icon:string  = div.getAttribute("icon");

    div.classList.toggle("play");

    setTimeout(_ => {
        div.classList.toggle("play");
        div.classList.toggle(`${icon}-1`);
        div.classList.toggle(`${icon}-2`);
    }, 300);

}

export function toggleFullscreen ():void {

    const elem = $("app")[0];

    if (globalThis.fullScreen) {
        elem.requestFullscreen();
    } else {
        document.exitFullscreen();
    }

}

export function randomInt (length:number = 5) {
    return Math.round(Math.random() * Math.pow(10, length))
}

export function getDBTime(date: Date | number = new Date()) {
    return parseInt("" + new Date(date).getTime() / 1000);
}

export function updateThemeMode () {

    let isDarkMode = globalThis.config.get("general:darkMode");

    if (isDarkMode === null) {

        isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        globalThis.config.set("general:darkMode", isDarkMode);

    }

    document.body.classList.remove("dark");

    if (isDarkMode) document.body.classList.add("dark");

}