export function getStartOfDay(date: Date = new Date()) {
   
    const d= date;
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d.getTime();
    
}

export function addDays (date: Date, days) {
    date.setDate(date.getDate() + days);
    return date;
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

export function initThemeMode () {

    updateThemeMode();
    globalThis.events.on("configChange", updateThemeMode);
    globalThis.events.on("afterConfigSync", updateThemeMode);

}

export function getColorPercent (color1:string, ratio: number) {

    let color2 = 'F4F5F7';
    if (globalThis.config.get("general:darkMode")) {
        color2 = '222222';
    }
    ratio = ratio / 4;

    const hex = function(x) {
        x = x.toString(16);
        return (x.length == 1) ? '0' + x : x;
    };

    const r = Math.ceil(parseInt(color1.substring(0,2), 16) * ratio + parseInt(color2.substring(0,2), 16) * (1-ratio));
    const g = Math.ceil(parseInt(color1.substring(2,4), 16) * ratio + parseInt(color2.substring(2,4), 16) * (1-ratio));
    const b = Math.ceil(parseInt(color1.substring(4,6), 16) * ratio + parseInt(color2.substring(4,6), 16) * (1-ratio));

    return hex(r) + hex(g) + hex(b);

}

export function pulseElement (element: JQuery, call: Function) {

    var elm = element.addClass("pulseMe")[0];
    var newone = elm.cloneNode(true);
    elm.parentNode.replaceChild(newone, elm);
    
    $(newone).click(()=>{call()});

}