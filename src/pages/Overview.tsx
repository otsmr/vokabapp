import React, { useEffect } from 'react';

import { initMaterialize } from "../utils/materialize";
// import { dbService } from "../../database/service/main";
import { syncMetaData } from "../api/sync";


import { sortArray } from "../utils/array";
import Loader from "../components/Loader";

function ModalSaveChanges (props: {}) {

    return (
        <div className="modal">
            <div className="modal-content">
                <h4>Bitte warten</h4>
                <p>Die Datenbank wird aktualisiert.</p>
                <Loader  />
                {/* _="display: block; margin: 36px auto;" */}
            </div>
        </div>
    )

}


export default function (props: {}) {


    useEffect(() => {

        // dbService.getListsByGroups((err, items)=>{
        //     if (err) return globalThis.M.toast({html: `Fehler: ${items}`});
        
        //     items = items.map(e => {return {...e, offlineBefore: e.offline}});
        //     call(items);
        // })

        if (navigator.onLine) {
            syncMetaData(()=>{
                // this.createList();
            });
        } else {
            // this.createList();
        }

    }, []);


    function saveChanges () {
        // let count = 0;
        // const done = () => {
        //     count++;
        //     if (count >= 2) {
        //         this.getList((items)=> {
        //             setTimeout(() => {
        //                 this.closeModal("saveChanges");
        //             }, 500);
        //             this.listItems.updateList(items);
        //             this.updateCounters();
        //             globalThis.events.listChanged();
        //             this.setTitle();
        //         })
        //     }
        // }
        // this.openModal("saveChanges", {dismissible:false});

        // const changes = this.listItems.changes();
        // changes.add = changes.add.map(e => e.listID);
        // changes.remove = changes.remove.map(e => e.listID);

        // if (changes.add.length === 0) done();
        // else apiClient.downloadLists(changes.add, (err)=>{
        //     if (err) globalThis.M.toast({html: "Listen konnten nicht heruntergeladen werden."})
        //     done();
        // })
        // if (changes.remove.length === 0) done();
        // else dbService.removeLists(changes.remove, ()=>{
        //     done();
        // });
    }

    return (

        <>

        <div className="status-anzeige">
            <div>
                <span className="green-text"><span>0</span> Herunterladen</span><br />
                <span className="red-text"><span>0</span> Löschen</span>
            </div>
            <div> <a onClick={saveChanges} className="btn btn-flat waves-effect"><i className="m-icon">save</i></a> </div>
        </div>

        </>

    )

}



class ListItems {

    constructor (items:any[]) {

        // this.items = items;

        // this.element = this.createList();
        // this.setCounters();

    }

    updateList (items:any[]) {

        // this.items = items;
        // const element = this.createList();

        // this.element.replaceWith(element);
        // this.element = element;

        // this.setCounters();

        // globalThis.M.AutoInit();

    }

    createList () {

        // const element = $(`<ul class="collapsible list-collaps">`);

        // const sortGroups = sortArray(this.items, "groupName");
        // const sortSubGroups = sortArray(this.items, "subGroupName");
        // const sortItem = sortArray(this.items, "listName");

        // for (const item of sortGroups) {

        //     let group = element.find(`[groupID=${item.groupID}]`);
        //     if (group.length !== 0) continue;
        //     element.append(`
        //         <li groupID="${item.groupID}">
        //             <div class="collapsible-header"><span class="downCounter">0</span> <p>${item.groupName}</p> </div>
        //             <div class="collapsible-body"> <ul class="collapsible list-collaps subGroups"> </ul> </div>
        //         </li>
        //     `);

        // }

        // for (const item of sortSubGroups) {

        //     let subGroup = element.find(`[subGroupID=${item.subGroupID}]`);
        //     if (subGroup.length !== 0) continue;
        //     element.find(`[groupID=${item.groupID}]`).find(".subGroups").append(`
        //         <li subGroupID="${item.subGroupID}">
        //             <div class="collapsible-header"><span class="downCounter">0</span> <p>${item.subGroupName}</p> </div>
        //             <div class="collapsible-body"> <ul class="collapsible list-collaps lists"> </ul> </div>
        //         </li>
        //     `);
            
        // }

        // for (const item of sortItem) {

        //     element.find(`[subGroupID=${item.subGroupID}]`).find(".lists").append(`
        //         <label class="select-list" for="${item.listID}">
        //         <div>
        //             <p>${item.listName}</p>
        //             <span>a: ${item.aTitel}, b: ${item.bTitel}</span>
        //         </div>
        //         <div>
        //             <label>
        //                 <input data-listid="${item.listID}" type="checkbox" class="filled-in" id="${item.listID}" ${(item.offline) ? "checked" : ""}>
        //                 <span></span>
        //             </label>
        //         </div>
        //         </label>
        //     `);

        // }

        // element.find("[data-listid]").click((event)=>{
        //     const element = $(event.currentTarget);
        //     const listID = element.data("listid");
        //     const checked = element.is(":checked");
        //     const list = this.items.find(e => e.listID === listID);
        //     list.offline = checked;
        //     this.setCounters();
        //     this.onClick(listID, checked);
        // });
        // return element;
        
    }

    changes () {
        // const changes = {
        //     add: [],
        //     remove: []
        // }
        // for (const list of this.items) {
        //     if (list.offline !== list.offlineBefore) {
        //         if (list.offline) changes.add.push(list)
        //         else changes.remove.push(list)
        //     }
        // }
        // return changes;
    }

    setCounters () {
        // this.items
        // const group = {};
        // const subGroup = {};
        // for (const item of this.items) {
        //     if (!group[item.groupID]) group[item.groupID] = 0;
        //     if (!subGroup[item.subGroupID]) subGroup[item.subGroupID] = 0;
        //     if (!item.offline) continue;
        //     group[item.groupID]++;
        //     subGroup[item.subGroupID]++;
        // }

        // this.element.find("[subGroupID]").each((i, element)=>{
        //     const e:JQuery = $(element);
        //     e.children(".collapsible-header").children(".downCounter").text(subGroup[e.attr("subGroupID")]);
        // });
        // this.element.find("[groupID]").each((i, element)=>{
        //     const e:JQuery = $(element);
        //     e.children(".collapsible-header").children(".downCounter").text(group[e.attr("groupID")]);
        // });

    }

}


// class Lists extends Tab implements TabInterface {

//     listItems: ListItems;


//     getList (call: {(items: any[])}) {

//         dbService.getListsByGroups((err, items)=>{
//             if (err) return globalThis.M.toast({html: `Fehler: ${items}`});
            
//             items = items.map(e => {return {...e, offlineBefore: e.offline}});
//             call(items);
//         })

//     }

//     createList () {

//         this.getList((items)=> {

//             this.listItems = new ListItems(items);

//             this.element.empty().append(statusDisplay,
//                 this.listItems.element
//             );
//             initMaterialize();

//             this.listItems.onClick = () => {
//                 this.updateCounters();
//             };

//             this.element.find("[saveChanges]").click(()=>{
//                 this.saveChanges();
//             })
            
//         });

//     }

// }