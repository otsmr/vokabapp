
import { threePointMenuInterfaces }  from "../../layout/threePointMenu.int" 
import { shuffleArray } from "../../utils/array";
import { getDBTime } from "../../utils/utils";

import SwipeManage from "./swiper/manage"

import dbHistory from "../../database/service/history";
import dbKastenService from "../../database/service/kasten";


export default class Kasten {

    kastenID:string;
    title:string;
    element:JQuery = $("<div>");
    lastQueryResult:({itemsByListID: any, lists: any, listsForTodayThrough: any});
    isKastenUsed: boolean = false;

    constructor (kastenID:string) {

        this.kastenID = kastenID;
        this.title = this.kastenID;

        const threePointItems:threePointMenuInterfaces = [{
            title: "Übung abbrechen",
            display: () => {
                return this.isKastenUsed;
            },
            click: () => {
                this.isKastenUsed = false;
                this.element.empty();
                this.focus();
            }
        }]

        globalThis.threePointMenu.register(`kasten:${this.kastenID}`, threePointItems);

        globalThis.events.on("listChanged", () => {
            if (this.element.find(".selectexercise").length === 0) return;
            this.isKastenUsed = false;
            this.focus();
        })
        
    }

    ready (items) {

        // Kasten 6 ist der Letzte, weshalb die Items immer in diesem bleiben

        
        
        const insertItems = items.filter(e => e.known).map(e => {
            return {
                box: (parseInt(this.kastenID) === 6) ? 6 : parseInt(this.kastenID) + 1,
                itemID: e.itemID,
                time: getDBTime()
            }
        });
        
        if (parseInt(this.kastenID) === 5) {
            // Im Kasten 5 falsch -> Item geht zurück in 2.
            const backToKastenTwo = items.filter(e => !e.known).map(e => {
                return {
                    box: 2,
                    itemID: e.itemID,
                    time: getDBTime()
                }
            });
            insertItems.push(backToKastenTwo);
        }

        dbHistory.insertItemsInHistory(insertItems, (err, res)=>{

            if (err) M.toast({html: "Fehler: " + res.message});
            
            this.isKastenUsed = false;
            //TODO: Ergebnisse anzeigen über items
            // this.displayResults(items);
            this.element.empty();
            this.focus();

        })

    }

    getItemsFromDB (callBack) {

        const kastenID = parseInt(this.kastenID);

        if (kastenID === 1) {

            return dbKastenService.getItemsForKastenOne((err, itemsInKasten)=>{
                if (err) return console.log(itemsInKasten);
                callBack(itemsInKasten);
            });

        }

        dbKastenService.getItemsForKasten(kastenID, (err, itemsInKasten)=>{
            if (err) return console.log(itemsInKasten);
            callBack(itemsInKasten);
        });

    }
    
    focus () {

        globalThis.threePointMenu.update();
        const subName = $(`[opentab="kasten:${this.kastenID}"]`)[0].innerText.split("\n")[0];
        
        if (!this.isKastenUsed) this.title = `Kasten: ${subName}`;
        
        globalThis.tabs.setTitle(this.title);

        if (this.isKastenUsed) return;

        // this.isKastenUsed = true; Performene verbessern?
        
        this.element.find(".empty").remove();
        this.element.find(".selectexercise").remove();

        this.element.append(`
            <div class="selectexercise">
                <p open class="title">offene Übungen</p>
                <div class="loader">
                    <div class="preloader-wrapper small active" style='display: block; margin: 0 auto;'>
                        <div class="spinner-layer spinner-primary-only">
                            <div class="circle-clipper left"> <div class="circle"></div> </div>
                            <div class="gap-patch"> <div class="circle"></div> </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <p closed class="title">Heute bereits erledigt</p>
            </div>`
        );

        this.getItemsFromDB((itemsInKasten)=>{ 

            const { lists, listsForTodayThrough, itemsByListID, openItems } = itemsInKasten;

            if (lists.length === 0) {                
                return globalThis.tabs.changeTab(["lists"])
            }

            this.element.find(".loader").remove();

            let count = 0;
            for (const listID in itemsByListID) {
                count++;
                const isOpen = (listsForTodayThrough.indexOf(parseInt(listID)) > -1) ? "closed" : "open";
                const itemsFromList = itemsByListID[listID];
                const list = lists.find(e => (e.listID == listID));

                this.element.find(`[data-listid="${listID}"]`).remove();

                this.element.find(`[${isOpen}]`).fadeIn(0).after($(`
                    <div class="cart" data-listid="${listID}">
                        <div class="content">
                            <p class="header">${list.groupName} → ${list.subGroupName}</p>
                            <b>${list.listName}</b><br>
                            <p class="schema">Schema: Karten</p>
                            <div class="count">${itemsFromList.length}</div>
                        </div>
                    </div>`
                ).click((e)=>{
                    const element = $(e.currentTarget);
                    const listID = element.data("listid");
                    element.find(".content").addClass("clicked");
                    this.createSwipe(
                        itemsByListID[listID],
                        lists.find(e => (e.listID == listID))
                    )
                }))

            }

            if (count === 0) {
                this.element.empty().append(`
                    <div class="empty">
                        <i class="fas fa-inbox"></i>  
                        <div class="openItems">${openItems}</div>
                        <p>Keine offenen Karten heute</p>    
                    </div>`
                );
            }
            
        });

    }

    createSwipe (items, list) {

        const itemsSelected = shuffleArray(items).slice(0, globalThis.config.get("workflow:dailyThroughput"));

        const rounds = [5, 5, 4, 4, 3, 2];

        this.element.empty().css({
            transform: "scale(0.9)",
            opacity: 0
        });

        setTimeout(() => {
            this.element.css({
                transition: "100ms",
                transform: "scale(1)",
                opacity: 1
            });
        }, 10);

        setTimeout(() => {
            this.element.css("transition", "none");
        }, 110);

        new SwipeManage({
            parentElement: this.element,
            items: itemsSelected,
            typeNames: [
                list.aTitel,
                list.bTitel
            ],
            rounds: rounds[parseInt(this.kastenID) - 1],
            callBack: (items) => {
                this.ready(items);
            }
        })

        this.title = `${this.kastenID} - ${list.subGroupName}`;
        globalThis.tabs.setTitle(this.title);

        this.isKastenUsed = true;
        globalThis.threePointMenu.update();

    }

}