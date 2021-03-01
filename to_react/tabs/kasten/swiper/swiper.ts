import fitty from "fitty";
import { getColorPercent, pulseElement } from "../../../utils/utils";

export default class Swipper {

    front: JQuery;
    behind: JQuery;
    rotate: JQuery;
    root: JQuery;
    timetamp: number;
    inFocus: Boolean = false;
    startClientX: number;
    swipe: number;
    clickSensitive: number = 80;
    onStatusChange: {(known:Boolean)};
    _typeNames: string[];
    isFrontOpen: Boolean = false;
    turnBlocked: Boolean = false;

    constructor (kastenElement: JQuery, rounds: number, onStatusChange: {(known:Boolean)}) {

        this.onStatusChange = onStatusChange;

        this.root = kastenElement;
        this.rotate = kastenElement.find(".rotate");
        this.behind = kastenElement.find(".behind");
        this.front = kastenElement.find(".front");
    }

    toggleText () {

        const behindHTML = this.behind.html();
        this.behind.html(this.front.html())
        this.front.html(behindHTML)

    }

    displayFront () {

        if (this.isBehind) {
            this.front.css("z-index", 0);
            this.behind.css("z-index", 1);
        } else {
            this.front.css("z-index", 1);
            this.behind.css("z-index", 0);
        }
        this.root.find(".status").children().eq(1).text(this._typeNames[this.isFrontOpen ? 1 : 0]);

    }

    swipeOutIn () {

        this.rotate.addClass("notransition").css({ 
            transform: `scale(0.99)`,
            opacity: 0
        });
        setTimeout(() => {
            this.rotate.removeClass("notransition").css({ 
                transform: `scale(1)`,
                opacity: 1
            });
            this.front.css({background: "var(--c-white)"})
            this.behind.css({background: "var(--c-white)"})

        }, 20);

    }

    triggerWrong () {

        pulseElement(this.root.find(".wrong"), () => {
            this.triggerWrong();
        });

        this.rotate.css({ 
            transform: `translateX(-366px) rotateY(${this.rotateDeg}deg) translateY(-9.15px) rotateZ(-18.3deg)`
        })

        this.front.css({background: "var(--c-light-red)"})
        this.behind.css({background: "var(--c-light-red)"})
        setTimeout(() => {
            this.swipeOutIn();
            this.onStatusChange(false);
        }, 300);

    }

    triggerRight () {

        pulseElement(this.root.find(".right"), () => {
            this.triggerRight();
        });

        this.rotate.css({ 
            transform: `translateX(366px) rotateY(${this.rotateDeg}deg) translateY(9.15px) rotateZ(18.3deg)`
        })

        this.front.css({background: "var(--c-green-red)"})
        this.behind.css({background: "var(--c-green-red)"})

        setTimeout(() => { 
            this.swipeOutIn();
            this.onStatusChange(true);
        }, 300);

    }

    updateBalken (stats: number[]) {

        for (const i in stats) {
            this.root.find(`.balken`).children().eq(parseInt(i)).css({
                "width": `${stats[i]}%`
            })
        }

    }

    addFittyText (element: JQuery, html:string) {

        element.html(`<div><p>${html}</p></div>`);

        fitty(element.find("p")[0], {
            maxSize: 70,
            multiLine: true
        });

    }

    get isBehind ():Boolean {
        return Boolean(Math.sqrt(Math.pow(Math.round((this.rotateDeg)/180) % 2, 2)));
    }

    set typeName (name: string[]) {
        this._typeNames = name;
        this.isFrontOpen = false;
        this.root.find(".status").children().eq(1).text(this._typeNames[0]);
    }

    set stillOpenTrials (trias: number) {
        this.root.find(".status").children().eq(0).text(`Noch ${trias}`);
    }

    set aHtml (html:string) {
        this.addFittyText(this.front, html);
    }

    set bHtml (html:string) {
        this.addFittyText(this.behind, html);
    }

    set listName (title:string) {
        this.root.find(".listName").text(title);
    }

}