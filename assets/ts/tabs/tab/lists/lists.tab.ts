import {Tab, TabInterface} from "../tab" 

import apiClient from "../../../api/client";
import { dbService } from "../../../database/service/main";
import { ListItems } from "./listItems";
import modalsHtml from "./modals.html"

export default class Lists extends Tab implements TabInterface {

    listItems: ListItems;

    saveChanges () {

        let count = 0;
        const done = () => {
            count++;
            if (count >= 2) {
                this.getList((items)=> {
                    setTimeout(() => {
                        this.closeModal("saveChanges");
                    }, 500);
                    this.listItems.updateList(items);
                    this.updateCounters();
                    globalThis.events.listChanged();
                })
            }
        }
        this.openModal("saveChanges", {dismissible:false});

        const changes = this.listItems.changes();
        changes.add = changes.add.map(e => e.listID);
        changes.remove = changes.remove.map(e => e.listID);

        if (changes.add.length === 0) done();
        else apiClient.downloadLists(changes.add, (err)=>{
            if (err) globalThis.M.toast({html: "Listen konnten nicht heruntergeladen werden."})
            done();
        })
        if (changes.remove.length === 0) done();
        else dbService.removeLists(changes.remove, ()=>{
            done();
        });

    }

    getList (call: {(items: any[])}) {

        dbService.getListsByGroups((err, items)=>{
            if (err) return globalThis.M.toast({html: `Fehler: ${items}`});
            
            items = items.map(e => {return {...e, offlineBefore: e.offline}});
            call(items);
        })

    }

    createList () {

        this.getList((items)=> {

            this.listItems = new ListItems(items);

            this.element.empty().append(`
                <div class="status-anzeige">
                    <div>
                        <span class="green-text"><span down>0</span> Herunterladen</span><br>
                        <span class="red-text"><span del>0</span> Löschen</span>
                    </div>
                    <div> <a saveChanges class="btn btn-flat waves-effect"><i class="m-icon">save</i></a> </div>
                </div>`,
                this.listItems.element
            );
            globalThis.M.AutoInit();

            this.listItems.onClick = () => {
                this.updateCounters();
            };

            this.element.find("[saveChanges]").click(()=>{
                this.saveChanges();
            })
            
        });

    }

    create() {

        this.element = $("<div>").append(`
            <div class="preloader-wrapper small active" style='display: block; margin: 50px auto;'>
                <div class="spinner-layer spinner-primary-only">
                    <div class="circle-clipper left"> <div class="circle"></div>
                    </div><div class="gap-patch"> <div class="circle"></div>
                    </div><div class="circle-clipper right"> <div class="circle"></div>
                    </div>
                </div>
            </div>
        `);

        this.modals = $(modalsHtml).appendTo("main");

        if (navigator.onLine) {
            globalThis.sync.syncMetaData(()=>{
                this.createList();
            });
        } else {
            this.createList();
        }


        return this.element;
    }

    updateCounters () {
        const changes = this.listItems.changes();
        this.element.find("[del]").text(changes.remove.length);
        this.element.find("[down]").text(changes.add.length);
    }

    focus() {
        globalThis.tabs.setTitle("Listen");
    }

    blur() {}
}
