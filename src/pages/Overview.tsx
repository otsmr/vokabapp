import React, { useEffect, useState, cloneElement } from 'react';

import { initMaterialize } from "../utils/materialize";
import { syncMetaData } from "../api/sync";


import { sortArray } from "../utils/array";
import Loader from "../components/Loader";
import { dbService } from '../database/service/main';

import Modal from '../parts/Modals';
import events from '../utils/events';
import { downloadLists } from '../api/client';

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


    let _i: any[] = [];
    const [sortGroups, setSortGroups] = useState(_i);
    const [sortSubGroups, setSortSubGroups] = useState(_i);
    const [sortItems, setSortItems] = useState(_i);
    const [selectedItems, setSelectedItems] = useState(_i);
    const [modal, setModal] = useState(<div></div>);

    function setLists () {

        dbService.getListsByGroups((err, items)=>{
            if (err) return M.toast({html: `Fehler: ${items}`});
            
            items = items.map((e: { offline: any; }) => {
                return {...e, offlineBefore: e.offline}
            });

            setSortGroups(sortArray(items, "groupName").filter((element, index, self) => 
                self.findIndex(t => t.groupID === element.groupID) === index
            ));
            setSortSubGroups(sortArray(items, "subGroupName").filter((element, index, self) => 
                self.findIndex(t => t.subGroupID === element.subGroupID) === index
            ));
            setSortItems(sortArray(items, "listName").filter((element, index, self) => 
                self.findIndex(t => t.listID === element.listID) === index
            ));

            setSelectedItems(items.filter((item: any) => item.offline));

            initMaterialize();

        })
    }

    function getChangesStats () {
        return {
            download: sortItems.filter(e => !e.offline && selectedItems.find(f => f.listID === e.listID)),
            delete: sortItems.filter(e => e.offline && !selectedItems.find(f => f.listID === e.listID))
        }
    }

    useEffect(() => {

        setLists();
        
        if (navigator.onLine)
            syncMetaData(setLists);
        
    }, []);


    function saveChanges () {

        let timeout = setTimeout(() => {
            setModal(
                <Modal>
                    <ModalSaveChanges />
                </Modal>
            );
        }, 500);
        let count = 0;
        const done = () => {
            count++;
            if (count >= 2) {
                if (timeout) clearTimeout(timeout);
                setLists();
                setModal(<div></div>);
                events.listChanged();
            }
        }

        let addListIDs = getChangesStats().download.map(e => e.listID)
        let removeListIDs = getChangesStats().delete.map(e => e.listID)

        if (addListIDs.length === 0) done();
        else downloadLists(addListIDs, (err)=>{
            if (err) globalThis.M.toast({html: "Listen konnten nicht heruntergeladen werden."})
            done();
        })
        if (removeListIDs.length === 0) done();
        else dbService.removeLists(removeListIDs, ()=>{
            done();
        });
    }

    const downloadCount = getChangesStats().download.length;
    const deleteCount = getChangesStats().delete.length;

    return (

        <>

        {modal}

        <div className="status-anzeige">
            <div>
                <span className="green-text">
                    {downloadCount} Herunterladen
                </span><br />
                <span className="red-text">
                    {deleteCount} Löschen
                </span>
            </div>
            <div>
                {(downloadCount !== 0 || deleteCount !== 0) ? (
                    <a onClick={saveChanges} className="btn btn-flat waves-effect"><i className="m-icon">save</i></a>
                ) : null}
            </div>
        </div>

        <ul className="collapsible list-collaps">

            {sortGroups.map(sortGroup => (
                <li key={sortGroup.groupID}>
                    <div className="collapsible-header">
                        <span className="downCounter">{selectedItems.filter(e => e.groupID === sortGroup.groupID).length}</span> 
                        <p>{sortGroup.groupName}</p>
                    </div>
                    <div className="collapsible-body">
                        <ul className="collapsible list-collaps subGroups">
                            {sortSubGroups.filter(e => e.groupID === sortGroup.groupID).map(sortSubGroup => (
                                <li key={sortSubGroup.subGroupID}>
                                    <div className="collapsible-header">
                                        <span className="downCounter">{selectedItems.filter(e => e.subGroupID === sortSubGroup.subGroupID).length}</span>
                                        <p>{sortSubGroup.subGroupName}</p>
                                    </div>
                                    <div className="collapsible-body">
                                        <ul className="collapsible list-collaps lists">
                                            {sortItems.filter(e => e.subGroupID === sortSubGroup.subGroupID).map(sortItem => (
                                                <label className="select-list" html-for={"listid" + sortItem.listID} key={sortItem.listID}>
                                                    <div>
                                                        <p>{sortItem.listName}</p>
                                                        <span>{sortItem.aTitel} &lt;-&gt; {sortItem.bTitel}</span>
                                                    </div>
                                                    <div style={{margin: "0 0 0 auto"}}>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                className="filled-in"
                                                                id={"listid" + sortItem.listID}
                                                                checked={(selectedItems.find(e => e.listID === sortItem.listID)) ? true : false} 
                                                                onChange={event => {
                                                                    if (event.currentTarget.checked) {
                                                                        setSelectedItems(selectedItems.concat([sortItem]));
                                                                    } else {
                                                                        setSelectedItems(selectedItems.filter(e => e.listID !== sortItem.listID))
                                                                    }
                                                                }}
                                                                />
                                                            <span></span>
                                                        </label>
                                                    </div>
                                                </label>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </li>
            ))}

        </ul>

        </>

    )

}