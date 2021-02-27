import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/de';
import config, { ICWorkflow, ICGeneral, ICNotification } from '../utils/config';
import { initMaterialize } from '../utils/materialize';
import events from '../utils/events';
moment.locale('de');

import Modal from '../parts/Modals';

// import { initMaterialize } from "../../layout/materialize"

// import apiClient from "../../api/client"
// import { syncAll } from "../../api/sync"

export const ExtraMenuSettingItems = [
    {
        title: "Zurücksetzen",
        click: () => {
            // this.modals.find("[resetSettings] [reset]").off("click").click(()=>{
            //     config.reset();
            //     const oldElement = this.element;
            //     oldElement.replaceWith(this.create());
            //     initMaterialize();
            //     this.updateConfigs();
            // });
            // this.openModal("resetSettings");
        }
    },
    {
        title: "Willkommen",
        click: () => {
            // introduction();
        }
    },
    {
        title: "About",
        modal: (
            <Modal>
                <ModalAbout version="10.0" />
            </Modal>
        )
    }
]

function ModalAbout (props: {
    version: string
}) {

    return (
        <div className="modal">
            <div className="modal-content">
                <h4>VokabApp</h4>
                <p style={{margin: "-10px 3px 0"}}>by TSMR.eu</p>
                <p>
                    <b>Version:     {props.version}</b><br />
                    Diese App ist Open-Source. Den Quellcode gibt es auf <a href="https://github.com/otsmr/vokabapp">Github</a>.<br /><br />
                    <b>Credits</b><br />
                    <a href="https://github.com/rikschennink/fitty">Fitty</a>, <a href="https://jsstore.net/">JsStore</a>, <a href="https://materializecss.com/">Materialize</a>, <a href="https://jquery.com/">JQuery</a>, <a href="https://material.io/resources/icons/?style=round">Material Icons</a>, <a href="https://fontawesome.com/icons">Font Awesome</a>, <a href="https://fonts.google.com/specimen/Roboto">Roboto</a><br />
                    Vielen Dank auch an die Entwickler von Mozilla Firefox, phpmyadmin, PHP, mysql, Linux, VSCode, Gulp, TypeScript, Sass, NodeJS und vielen mehr, die ihre Software kostenlos zur Verfügung stellen.
                </p>
            </div>
            <div className="modal-footer">
                <a className="modal-close waves-effect waves-dark btn-flat">Ok</a>
            </div>
        </div>
    )

}

function ModalReset (props: {}) {

    return (
        <div className="modal">
            <div className="modal-content">
                <h4>Einstellungen zurücksetzen?</h4>
            </div>
            <div className="modal-footer">
                <a className="modal-close waves-effect waves-dark btn-flat">Ok</a>
                <a className="modal-close waves-effect waves-dark btn-flat">Abbrechen</a>
            </div>
        </div>
    )

}

function ModalRemoveSession () {
    
    return (
        <div className="modal">
            <div className="modal-content">
                <h4>Wirklich Abmelden?</h4>
            </div>
            <div className="modal-footer">
                <a className="modal-close waves-effect waves-dark btn-flat">Ok</a>
                <a className="modal-close waves-effect waves-dark btn-flat">Abbrechen</a>
            </div>
        </div>
    )

}

function ModalCreateSession () {

    return (
        <div className="modal" >
            <div className="modal-content">
                <h4>Mit Odmin anmelden</h4>
                <div className="preloader-wrapper small active" style={{display: "block", margin: "50px auto"}}>
                    <div className="spinner-layer spinner-primary-only">
                        <div className="circle-clipper left"> <div className="circle"></div>
                        </div><div className="gap-patch"> <div className="circle"></div>
                        </div><div className="circle-clipper right"> <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a className="modal-close waves-effect waves-dark btn-flat">Ok</a>
            </div>
        </div>
    )

} 

//     create () {

//         this.element.find("[config]").on("change", ((event)=>{
//             const element:any = $(event.currentTarget);
//             let val = element.val();
//             if (element[0].type === "checkbox") {
//                 val = element.is(":checked");
//             }
//             if (element.attr("number")) {
//                 val = parseFloat(val);
//             }
//             if (element.attr("unfocus")) {
//                 setTimeout(() => {
//                     element.blur();
//                 }, 50);
//             }
//             globalThis.config.set(element.attr("config"), val);
//         }));

        
function destroySession () {
// this.modals.find("[destroySession] [ok]").off("click").click(()=>{
//                     apiClient.destroySession(()=>{
//                         this.closeModal("destroySession");
//                         this.updateConfigs();
//                     })
//                 });
//                 this.openModal("destroySession");
}

function syncStart () {

    // const el:JQuery = this.element.find('[action="sync:start"]');

    // el.attr("disabled", "true");
    // el.children("i").addclassName("fa-spin");

    // syncAll(()=>{
    //     setTimeout(() => {
    //         el.removeAttr("disabled");
    //         el.children("i").removeclassName("fa-spin");
    //     }, 1000);
    // });

}

function createNewSession () {

    // element.attr('disabled', "true");
            
    // displayModal(<ModalCreateSession />);
    
    // apiClient.createNewSession((err, json)=>{
    //     if (err) {
    //         this.closeModal("createNewSession");
    //         element.removeAttr('disabled');
    //         alert("Die Verbindung ist fehlgeschlagen.");
    //         return;
    //     }
    //     const {siginPath, sessionID} = json;
    //     globalThis.config.set("api:sessionID", sessionID);
    //     localStorage.setItem("lastUpdate", null);

    //     window.open(siginPath);

    //     const int = setInterval(() => {
    //         apiClient.checkSessionID((err: Boolean, valid: Boolean)=>{
    //             if (err || !valid) return;
    //             clearInterval(int);
    //             this.openModal("createNewSession");
    //             this.modals.find("[createNewSession] .preloader-wrapper").remove();
    //             this.modals.find("[createNewSession] h4").after(`<p>Erfolgreich verbunden.</p>`);
    //             this.updateConfigs();
    //             this.syncStart();
    //             element.removeAttr('disabled');
    //         })
    //     }, 5000);

    // })

}

export default function (props: {}) {

    const [lastSync, setLastSync] = useState("Noch nie");

    
    let _w: ICWorkflow = config.get("workflow");
    const [configWorkflow, setConfigWorkflow] = useState(_w);
    let _g: ICGeneral = config.get("general");
    const [configGeneral, setConfigGeneral] = useState(_g);
    let _n: ICNotification = config.get("notification");
    const [configNotification, setConfigNotification] = useState(_n);
    const [configApiBase, setConfigApiBase] = useState(config.get("api:base"));
    const [configSyncTrigger, setConfigSyncTrigger] = useState(config.get("sync:trigger"));

    function updateLastSync () {

        let lastSyncTimestamp = config.get("api:lastSync");
        setLastSync((lastSyncTimestamp) ? moment(new Date(lastSyncTimestamp)).fromNow() : "Noch nie");

    }

    function updateConfigs () {

        setConfigWorkflow(config.get("workflow"));
        setConfigGeneral(config.get("general"));
        setConfigNotification(config.get("notification"));
        setConfigApiBase(config.get("api:base"));
        setConfigSyncTrigger(config.get("sync:trigger"));

//         this.element.find("[config]").each((i, el)=>{
//             const element:any = $(el);
//             const conf:any = globalThis.config.get(element.attr("config"));
//             if(element[0].tagName === "SELECT") {
//                 const instance = globalThis.M.FormSelect.getInstance(element[0]);
//                 if (instance) instance.destroy();
//             }
//             element.val(conf);

//             if (element[0].type === "checkbox") {
//                 element.prop('checked', conf);
//             }

//         });
        
        initMaterialize();

//         setTimeout(() => {
//             globalThis.updateNotificationsUI($(`[config="notification:firstEnabled"]`));
//             globalThis.updateNotificationsUI($(`[config="notification:secondEnabled"]`));
//         }, 50);

        updateLastSync();

    }

    function uc (configID: string, value: any) {

        console.log(configID);
        
        config.set(configID, value);
        updateConfigs();

    }


    useEffect(() => {
        
        updateLastSync();
        updateConfigs();

        events.on("afterConfigSync", (changes: any) => {
            if (changes) updateConfigs();
            else updateLastSync();
        })

    }, [])

    return (
        <>
        <div className="cart">
            <p className="title">Allgemein</p>
            <div className="content">
                <table>
                <tbody>
                    <tr>
                        <td>Letzte Seite merken</td>
                        <td className="checkbox">
                        <label>
                            <input onChange={e => uc("general:saveOpenPage", e.currentTarget.checked)} type="checkbox" className="filled-in" checked={configGeneral.saveOpenPage} />
                            <span></span>
                        </label>
                        </td>
                    </tr>
                    <tr>
                        <td>Dark Mode</td>
                        <td className="checkbox">
                        <label>
                            <input onChange={e => uc("general:darkMode", e.currentTarget.checked)} type="checkbox" className="filled-in" checked={configGeneral.darkMode} />
                            <span></span>
                        </label>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        <div className="cart">
            <p className="title">Workflow</p>
            <div className="content">
                <table>
                    <tbody>
                    <tr>
                        <td>Richtung</td>
                        <td>
                            <select value={configWorkflow.direction} onChange={e => uc("workflow:direction", e.currentTarget.value)}>
                                <option value="a>b">A&rarr;B</option>
                                <option value="b>a">B&rarr;A</option>
                                <option value="a<>b">A&#8697&#65038;B</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Durchsatz/Tag</td>
                        <td>
                            <select value={configWorkflow.dailyThroughput} onChange={e => uc("workflow:dailyThroughput", e.currentTarget.value)}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Nicht gewusst<br /> nach X-Versuchen</td>
                        <td>
                            <select value={configWorkflow.notKnownFromXAttempts} onChange={e => uc("workflow:notKnownFromXAttempts", e.currentTarget.value)} >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="cart">
            <p className="title">Benachrichtigung</p>
            <div className="content">
                <table>
                <tbody>
                    <tr>
                        <td>1. Erinnerung</td>
                        <td className="checkbox">
                        <label>
                            <input onChange={e => uc("notification:firstEnabled", e.currentTarget.checked)} type="checkbox" className="filled-in" checked={configNotification.firstEnabled} />
                            <span></span>
                        </label>
                        </td>
                    </tr>
                    {(configNotification.firstEnabled) ? (
                        <>
                        <tr>
                            <td className="timepicker-td">
                                <input data-unfocus="true" value={configNotification.firstTime} onChange={e => uc("configNotification.firstTime", e.currentTarget.value)} placeholder="Zeit wählen" type="text" className="timepicker" />
                            </td>
                        </tr>
                        <tr>
                            <td>2. Erinnerung</td>
                            <td className="checkbox">
                            <label>
                                <input onChange={e => uc("notification:secondEnabled", e.currentTarget.checked)} type="checkbox" className="filled-in" checked={configNotification.secondEnabled} />
                                <span></span>
                            </label>
                            </td>
                        </tr>
                        {(configNotification.secondEnabled) ? (
                            <tr >
                                <td className="timepicker-td">
                                    <input data-unfocus="true" value={configNotification.secondTime} onChange={e => uc("configNotification.secondTime", e.currentTarget.value)} placeholder="Zeit wählen" type="text" className="timepicker" />
                                </td>
                            </tr>
                        ) : null}
                        </>
                    ) : null}
                </tbody>
                </table>
            </div>
        </div>
        <div className="cart">
            <p className="title">Synchronisation</p>
            <div className="content">
                <table>
                <tbody>
                    <tr>
                        <td> API-Server </td>
                        <td style={{flex: 3}}>
                            <input value={configApiBase} onChange={e => uc("api:base", e.currentTarget.value)} type="text" placeholder="https://" />
                        </td>
                    </tr>
                    <tr> <td> <a href="https://github.com/otsmr/vokabapp-server">Quellcode vom Server</a> </td> </tr>
                </tbody>
                </table>
            </div><br />

            {(config.get("api:sessionID")) ? (

                <div className="content" style={{display: "none"}}>
                <table>
                <tbody>
                    <tr>
                        <td>
                            Letzter Sync: <b>{lastSync}</b>
                        </td>
                    </tr>
                    <tr>
                        <td>Sync-Auslöser</td>
                        <td style={{flex: 2}}>
                            <select value={configSyncTrigger} onChange={e => uc("sync:trigger", e.currentTarget.value)}>
                                <option value="startup">App-Start</option>
                                <option value="change">Änderung</option>
                                <option value="always">Start + Änderung</option>
                                <option value="manuell">Manuell</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td> Manuell starten </td>
                        <td>
                            <a onClick={syncStart} className="waves-effect btn btn-flat"><i className="m-icon"> refresh </i></a>
                        </td>
                    </tr>
                    <tr>
                        <td> Account </td>
                        <td style={{flex: 3}}>
                            <a onClick={destroySession} className="btn waves-effect red btn-flat">Abmelden</a>
                        </td>
                    </tr>
                    <tr> <td> <a href="https://oproj.de/privacy?inline=true">Datenschutzerklärung</a> </td> </tr>
                </tbody>
                </table>
                </div>

            ) : (
                <div className="content">
                    <table>
                    <tbody>
                        <tr><td>
                            Speichern des Fortschritts.<br />
                            Daten über mehrere Geräte hinweg synchronisieren.
                        </td></tr>
                        <tr>
                            <td> Account </td>
                            <td style={{flex: 3}}>
                                <a onClick={createNewSession} className="btn waves-effect btn-flat">Anmelden</a>
                            </td>
                        </tr>
                        <tr> <td> <a href="https://oproj.de/privacy?inline=true">Datenschutzerklärung</a> </td> </tr>
                    </tbody>
                    </table>
                </div>
            )}
            
        </div>
        <br /><br />
        </>
    )
};