import React, { useEffect, useState, useRef } from "react";
import { isMobile, getColorPercent } from "../../utils/utils";

export default function (props: {}) {

    let clickSensitive = 80;
    let touchstart = 0;
    let isSwiping = false;
    let isTurnBlocked = false;
    let startClientX = 0;

    const [rounds, setRounds] = useState(4);
    const [viewerBgColor, setViewerBgColor] = useState("var(--c-white)");
    const viewerRef: React.MutableRefObject<any> = useRef(null);

    function notKnow () {

    }

    function know () {

    }

    function turn () {

        if (isTurnBlocked) return;

        isTurnBlocked = true;
        let degre = getRotateDeg();

        // if (this.isFrontOpen) this.isFrontOpen = false;
        // else this.isFrontOpen = true;

        const el = viewerRef.current;
        if (!el) return;

        
        el.style.transform = `rotateY(${degre + 180}deg)`;
        // this.rotate.find("p").animate({
            //     opacity: 0
            // }, 125)
            
        setTimeout(() => {
                
                // this.displayFront();
                // this.rotate.find("p").animate({
                    //     opacity: 1
                    // }, 125);
                    
            setTimeout(() => {
                el.classList.add("notransition");
                el.style.transform = `rotateY(0deg)`;
                // this.toggleText();
                // this.displayFront();
                
                setTimeout(() => {
                    el.classList.remove("notransition");
                    isTurnBlocked = false;
                }, 50);
                
            }, 150);

        }, 150);

        // pulseElement(this.root.find(".toggleTurn"), () => {
        //     this.toggleTurn();
        // });

    }

    function getRotateDeg ():number {
        try {
            return parseInt(viewerRef.current?.style.transform.match(/rotateY\((.*?)\)/)[1]);
        } catch (error) {
            return 0;
        }
    }

    function swiping (progres: number) {

        let color = "4caf50";
        if (progres < 0) color = "ff5722";

        setViewerBgColor("#" + getColorPercent(color, Math.sqrt(Math.pow(progres, 2))/300));
 
        viewerRef.current?.classList.add("transition_hundert");
        viewerRef.current.style.transform = `translateX(${progres}px) rotateY(${getRotateDeg()}deg) translateY(${progres/20}px) rotateZ(${progres/10}deg)`;
        
        setTimeout(() => {
            viewerRef.current?.classList.remove("transition_hundert");
        }, 10);

    }

    function endSwipe (progres: number) {

        const el = viewerRef.current;
        if (!el) return;


        el.classList.remove("transition_hundert");
        isSwiping = false;

        console.log("progres=", progres);

        if (progres >= 100) know();
        else if (progres <= -100) notKnow();
        else {
            el.style.transform = `rotateY(${getRotateDeg()}deg)`;
            setViewerBgColor("var(--c-white)");
        }

    }

    useEffect(() => {
        // const itemsSelected = shuffleArray(items).slice(0, globalThis.config.get("workflow:dailyThroughput"));

        if (!isMobile()) clickSensitive = 150;

        viewerRef.current?.addEventListener((isMobile()) ? "touchstart" : "mousedown", (event: any) => {
            
            try {
                event.clientX = event.originalEvent.touches ?  event.originalEvent.touches[0].pageX : event.clientX;
            } catch (error) {}
            
            touchstart = new Date().getTime();
            
            startClientX = event.clientX;
            isSwiping = true;
            
            // $("body").addClass("noselect");
            // this.rotate.addClass("grabbing");
            
            
        })

        viewerRef.current?.addEventListener((isMobile()) ? "touchend" : "mouseup", (event: any) => {
            if (isSwiping && new Date().getTime() - touchstart <= clickSensitive) {
                turn();
            }
        })


        document.addEventListener((isMobile()) ? "touchend" : "mouseup", (event: any)=>{
            if (new Date().getTime() - touchstart > clickSensitive) {
                try {
                    event.clientX = event.originalEvent.touches ?  event.originalEvent.touches[0].pageX : event.clientX;
                } catch (error) {}
                endSwipe(event.clientX - startClientX);
                isSwiping = false;
            }
        });
        document.addEventListener((isMobile()) ? "touchmove" : "mousemove", (event: any)=>{
            if (isSwiping && new Date().getTime() - touchstart > clickSensitive) {
                try {
                    event.clientX = event.originalEvent.touches ?  event.originalEvent.touches[0].pageX : event.clientX;
                } catch (error) { }

                swiping(event.clientX - startClientX);
            }
        });



    }, []);

    return (
        <div className="kasten">
        <div className="status">
            <p></p>
            <p></p>
        </div>
        <div className="item">
            <div ref={viewerRef} className="content rotate" >
                <div className="front" style={{ backgroundColor: viewerBgColor }}>
                    <p>Vorne</p>
                    <div dangerouslySetInnerHTML={{
                        __html: `<iframe sandbox srcdoc="Hallo Welt! <script> alert(1); </script>"> </iframe>`
                    }}></div>
                </div>
                <div className="behind" style={{ backgroundColor: viewerBgColor }}>
                    <p>Hinten</p>
                </div>
                <div className="listName"></div>
            </div>
        </div>
        <div className="buttons noselect">
            <div>
                <div onClick={notKnow} className="wrong m-icon">close</div>
            </div>
            <div>
                <div onClick={turn} className="toggleTurn m-icon">cached</div>
            </div>
            <div>
                <div onClick={know} className="right m-icon">done</div>
            </div>
        </div>
        <div className="balken">
            {new Array(rounds).fill(0).map((a, i) => (
                <div data-balken={i} key={i}></div>
            ))}
        </div>
        </div>
    );
}
