import { Tab, TabInterface } from "../tab" 

import dbHistory from "../../../database/service/history"

class StatisticsTab extends Tab implements TabInterface {

    create (openTab:string[]) {

        return this.element = $("<div>");

    }

    focus (openTab:string[]) {

        globalThis.tabs.setTitle("Statistiken");

        this.element.html(`
            <div class="loader" style="margin-top: 50px;">
                <div class="preloader-wrapper small active" style='display: block; margin: 0 auto;'>
                    <div class="spinner-layer spinner-primary-only">
                        <div class="circle-clipper left"> <div class="circle"></div> </div>
                        <div class="gap-patch"> <div class="circle"></div> </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
            </div>`
        );

        dbHistory.getCountItemsinHistoryByBox((err, counts)=>{

            this.element.html(`
            
            <div class="cart">
                <p class="title">Im Kasten</p>
                <div class="content">

                    ${(()=>{

                        let total = 0;
                        for (const count in counts) {
                            total += counts[count];
                        };

                        const oneInPercent = 100 / total;
                        const icons = {
                            1: "playlist_add",
                            2: "wrap_text",
                            3: "wrap_text",
                            4: "call_split",
                            5: "playlist_add_check",
                        }

                        let out = "";

                        for (const count in counts) {
                            out += `
                            <div class="statistics-boxes">
                                <div class="text">
                                    <p class="boxID">${count}</p>
                                    <i class="m-icon">${icons[count]}</i>
                                </div>
                                <div class="process">
                                    <div class="process-out">
                                        <p>${counts[count]}</p>
                                        <div style="width:${counts[count] * oneInPercent}%" class="in"></div>
                                    </div>
                                </div>
                            </div>
                            `
                        }

                        return out;

                    })()}
                    
                </div>
            </div>
            
            `)

        })

    }

    blur () {

    }

}

export default StatisticsTab;