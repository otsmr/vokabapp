
import { morph } from "../utils/utils"

const toggleNav = (forceStat:Boolean = null):void => {

    const toggle = () => {
        $("nav .menu").toggleClass("open");
        morph("nav header .morph-icon");
    }

    if (forceStat === null) return toggle();

    const isOpen:Boolean = $("nav .menu").hasClass("open");

    if (forceStat && !isOpen) toggle();
    if (!forceStat && isOpen) toggle();

}

const getClientX = (event) => {
    return event.originalEvent.touches ?  event.originalEvent.touches[0].pageX : event.clientX;
}


globalThis.events.on("startApp", () => {
    $("nav").fadeIn(0);
})

$("nav header [icon=menu]").click(() => {
    toggleNav();
});

let openNav = false;
let closeNav = false;
let openNavSekond = false;
let closeMoveX = 0;

$(document).bind('mouseup touchend', (()=>{

    if (openNav) toggleNav(true);
    if (closeNav) toggleNav(false);
    
    openNav = false;
    closeNav = false;
    openNavSekond = false;

}));

$(document).bind('touchmove mousemove', ((event:any) => {
    const clientX = getClientX(event);

    if (openNavSekond && clientX > 20) openNav = true;
    else openNav = false;

    if (closeMoveX - clientX > 30) closeNav = true;

}));

$(document).bind('touchstart mousedown', ((event:any) => {
    const clientX = getClientX(event);
    
    if (clientX <= 10) openNavSekond = true;
    closeMoveX = clientX;

}));

export default toggleNav;