import fitty from "fitty";

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

        for (let i = 1;i<=rounds;i++) {
            this.root.find(".balken").append(`
                <div balken="${i}"></div>
            `)
        }

        let touchend = 'touchend';
        if (navigator.userAgent.indexOf("Windows") > 1) {
            touchend = 'mouseup touchend';
            this.clickSensitive = 150;
        }

        this.root.find(".right").click(() => {
            this.triggerRight();
        })
        this.root.find(".wrong").click(() => {
            this.triggerWrong();
        })
        this.root.find(".toggleTurn").click(() => {
            this.toggleTurn();
        })
        

        $(document).bind(touchend, ()=>{
            if (this.inFocus && new Date().getTime() - this.timetamp > this.clickSensitive) this.endSwipe();
        });

        this.rotate.bind('touchstart mousedown', (event:any) => {
            event = this.getEvent(event);

            this.inFocus = true;
            this.timetamp = new Date().getTime();
            this.startClientX = event.clientX;

            $("body").addClass("noselect");
            this.rotate.addClass("grabbing");

        });

        $(document).bind('touchmove mousemove', (event:any) => {
            if (this.inFocus && new Date().getTime() - this.timetamp > this.clickSensitive) {
                event.clientX = event.originalEvent.touches ?  event.originalEvent.touches[0].pageX : event.clientX;
                this.swiping(event);
            }
        });

        this.rotate.bind(touchend, (event) => {
            if (this.inFocus && new Date().getTime() - this.timetamp <= this.clickSensitive) {
                this.toggleTurn();
                this.inFocus = false;
            }

        });

    }

    getEvent (event) {
        try {
            event.clientX = event.originalEvent.touches ?  event.originalEvent.touches[0].pageX : event.clientX;
        } catch (error) {
        }
        return event;
    }

    toggleTurn () {

        if (this.turnBlocked) return;

        this.turnBlocked = true;
        let degre:number = 0;

        if (this.isFrontOpen) this.isFrontOpen = false;
        else this.isFrontOpen = true;

        try {
            degre = this.rotateDeg;
        } catch (error) { }

        const toDegre: number = degre + 180;

        this.rotate.css({ transform: `rotateY(${toDegre}deg)` });
        this.rotate.find("p").animate({
            opacity: 0
        }, 125)

        setTimeout(() => {
            this.displayFront();
            this.rotate.find("p").animate({
                opacity: 1
            }, 125)

            setTimeout(() => {
                this.rotate.addClass("notransition");
                this.rotate.css({ transform: `rotateY(0deg)` });
                this.toggleText();
                this.displayFront();
                setTimeout(() => {
                    this.rotate.removeClass("notransition");
                    this.turnBlocked = false;
                }, 50);
                
            }, 150);
        }, 150);

        this.pulseElement(this.root.find(".toggleTurn"), () => {
            this.toggleTurn();
        });

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

    getColorPercent (color1:string, ratio: number) {

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

    swiping (event) {

        let swipe = this.swipe = event.clientX - this.startClientX;
        let color = "4caf50";
        if (swipe < 0) color = "ff5722";

        const css = {
            background: "#" + this.getColorPercent(color, Math.sqrt(Math.pow(swipe, 2))/300)
        }
 
        this.front.css(css);
        this.behind.css(css);
        this.rotate.addClass("transition_hundert");
        this.rotate.css({ 
            transform: `translateX(${swipe}px) rotateY(${this.rotateDeg}deg) translateY(${swipe/20}px) rotateZ(${swipe/10}deg)`
        });

        setTimeout(() => {
            this.rotate.removeClass("transition_hundert");
        }, 10);

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

    pulseElement (element: JQuery, call: Function) {

        var elm = element.addClass("pulseMe")[0];
        var newone = elm.cloneNode(true);
        elm.parentNode.replaceChild(newone, elm);
        
        $(newone).click(()=>{call()});

    }

    triggerWrong () {

        this.pulseElement(this.root.find(".wrong"), () => {
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

        this.pulseElement(this.root.find(".right"), () => {
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

    endSwipe () {
        this.rotate.removeClass("transition_hundert");

        this.inFocus = false;

        if (this.swipe >= 100) this.triggerRight();
        else if (this.swipe <= -100) this.triggerWrong();
        else {
            this.rotate.css({ 
                transform: `rotateY(${this.rotateDeg}deg)`
            });

            this.front.css({background: "var(--c-white)"})
            this.behind.css({background: "var(--c-white)"})
        }

        $("body").removeClass("noselect");
        this.rotate.removeClass("grabbing");

        this.swipe = 0;

    }

    updateBalken (stats: number[]) {

        for (const i in stats) {
            this.root.find(`.balken`).children().eq(parseInt(i)).css({
                "width": `${stats[i]}%`
            })
        }

    }

    addFittyText (element: JQuery, html:string) {

        // if (html.indexOf("<") < 0) {
            element.html(`<div><p>${html}</p></div>`);

            fitty(element.find("p")[0], {
                maxSize: 70,
                multiLine: true
            });

        // } else {
        //     console.log("ADD NO HTML");
        //     element.html(html);
        // }

    }

    get rotateDeg ():number {
        try {
            return parseInt(this.rotate[0].style.transform.match(/rotateY\((.*?)\)/)[1]);
        } catch (error) {
            return 0;
        }
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
