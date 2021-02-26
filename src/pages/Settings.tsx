import * as moment from 'moment';
import 'moment/locale/de';
moment.locale('de');

// import { threePointMenuInterfaces } from "../../layout/threePointMenu";
// import { initMaterialize } from "../../layout/materialize"
// import { Tab, TabInterface } from "../tab" 

// import apiClient from "../../api/client"
// import { syncAll } from "../../api/sync"


// globalThis.updateNotificationsUI = (el) => { 
//     const $e = $(el);
//     console.log($e.is(":checked"));
//     $(`[display="${$e.attr("config")}"]`).css("display", ($e.is(":checked")) ? "flex" : "none")
// };

function modalAbout (props: {}) {

    return (
        <div className="modal">
            <div className="modal-content">
                <h4>VokabApp</h4>
                <p style={{margin: "-10px 3px 0;"}}>by TSMR.eu</p>
                <p>
                    <b>Version:\t\t#VERSION#</b><br />
                    Diese App ist Open-Source. Den Quellcode gibt es auf <a href="https://github.com/otsmr/vokabapp">Github</a>.<br /><br />
                    <b>Credits</b><br />
                    <a href="https://github.com/rikschennink/fitty">Fitty</a>, <a href="https://jsstore.net/">JsStore</a>, <a href="https://materializecss.com/">Materialize</a>, <a href="https://jquery.com/">JQuery</a>, <a href="https://material.io/resources/icons/?style=round">Material Icons</a>, <a href="https://fontawesome.com/icons">Font Awesome</a>, <a href="https://fonts.google.com/specimen/Roboto">Roboto</a><br />
                    <p>Vielen Dank auch an die Entwickler von Mozilla Firefox, phpmyadmin, PHP, mysql, Linux, VSCode, Gulp, TypeScript, Sass, NodeJS und vielen mehr, die ihre Software kostenlos zur Verfügung stellen.</p>
                </p>
            </div>
            <div className="modal-footer">
                <a className="modal-close waves-effect waves-dark btn-flat">Ok</a>
            </div>
        </div>
    )

}

function modalReset (props: {}) {

    return (
        <div className="modal">
            <div className="modal-content">
                <h4>Einstellungen zurücksetzen?</h4>
            </div>
            <div className="modal-footer">
                <a className="modal-close waves-effect waves-dark btn-flat" reset>Ok</a>
                <a className="modal-close waves-effect waves-dark btn-flat">Abbrechen</a>
            </div>
        </div>
    )

}

function modalRemoveSession () {
    
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

function modalCreateSession () {

    return (
        <div className="modal" >
            <div className="modal-content">
                <h4>Mit Odmin anmelden</h4>
                <div className="preloader-wrapper small active" style={{display: "block", margin: "50px auto";}}>
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


// class SettingsTabs extends Tab implements TabInterface {

//     constructor () {
//         super();
//         this.initThreePointMenu();
//     }

//     create () {

//         globalThis.events.on("afterConfigSync", (changes) => {
//             if (changes) this.updateConfigs();
//             else this.setLastSync();
//         })

//         this.element = $(settingsHtml);
//         this.modals = $(modalsHtml.replace("#VERSION#", globalThis.VERSION)).appendTo("main");

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

//         this.element.find("[action]").click((event)=>{
//             const element:JQuery = $(event.currentTarget);
//             const action:string = element.attr("action");

//             if (action === "createNewSession") {
//                 this.createNewSession(element);
//             }
//             if (action === "destroySession") {
//                 this.modals.find("[destroySession] [ok]").off("click").click(()=>{
//                     apiClient.destroySession(()=>{
//                         this.closeModal("destroySession");
//                         this.updateConfigs();
//                     })
//                 });
//                 this.openModal("destroySession");
//             }
//             if (action === "sync:start") {
//                 this.syncStart();
//             }

//         });
        
//         this.updateConfigs();
//         return this.element;

//     }

//     syncStart () {

//         const el:JQuery = this.element.find('[action="sync:start"]');

//         el.attr("disabled", "true");
//         el.children("i").addclassName("fa-spin");

//         syncAll(()=>{
//             setTimeout(() => {
//                 el.removeAttr("disabled");
//                 el.children("i").removeclassName("fa-spin");
//             }, 1000);
//         });

//     }

//     updateConfigs () {

//         const sessionID:string = globalThis.config.get("api:sessionID");
//         if (sessionID) {
//             this.element.find('[notConnected]').fadeOut(0);
//             this.element.find('[connected]').fadeIn(0);
//         } else {
//             this.element.find('[notConnected]').fadeIn(0);
//             this.element.find('[connected]').fadeOut(0);
//         }

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

        
//         initMaterialize();

//         setTimeout(() => {
//             globalThis.updateNotificationsUI($(`[config="notification:firstEnabled"]`));
//             globalThis.updateNotificationsUI($(`[config="notification:secondEnabled"]`));
//         }, 50);

//         this.setLastSync();
        
//     }
    
//     setLastSync () {
//         let lastSync = globalThis.config.get("api:lastSync");
//         if (!lastSync) lastSync = "Noch nie";
//         else lastSync = moment(new Date(lastSync)).fromNow();
//         this.element.find("[lastSync]").text(lastSync);
//     }

//     createNewSession (element: JQuery) {

//         element.attr('disabled', "true");
                
//         this.openModal("createNewSession");
        
//         apiClient.createNewSession((err, json)=>{
//             if (err) {
//                 this.closeModal("createNewSession");
//                 element.removeAttr('disabled');
//                 alert("Die Verbindung ist fehlgeschlagen.");
//                 return;
//             }
//             const {siginPath, sessionID} = json;
//             globalThis.config.set("api:sessionID", sessionID);
//             localStorage.setItem("lastUpdate", null);

//             window.open(siginPath);

//             const int = setInterval(() => {
//                 apiClient.checkSessionID((err: Boolean, valid: Boolean)=>{
//                     if (err || !valid) return;
//                     clearInterval(int);
//                     this.openModal("createNewSession");
//                     this.modals.find("[createNewSession] .preloader-wrapper").remove();
//                     this.modals.find("[createNewSession] h4").after(`<p>Erfolgreich verbunden.</p>`);
//                     this.updateConfigs();
//                     this.syncStart();
//                     element.removeAttr('disabled');
//                 })
//             }, 5000);

//         })
//     }

//     initThreePointMenu () {

//         const items:threePointMenuInterfaces = [
//             {
//                 title: "Zurücksetzen",
//                 click: () => {
//                     this.modals.find("[resetSettings] [reset]").off("click").click(()=>{
//                         globalThis.config.reset();
//                         const oldElement = this.element;
//                         oldElement.replaceWith(this.create());
//                         initMaterialize();
//                         this.updateConfigs();
//                     });
//                     this.openModal("resetSettings");
//                 }
//             },
//             {
//                 title: "Willkommen",
//                 click: () => {
//                     introduction();
//                 }
//             },
//             {
//                 title: "Über die App",
//                 click: () => {
//                     this.openModal("aboutPage");
//                 }
//             }
//         ]

//         globalThis.threePointMenu.register(`settings`, items);

//     }

//     focus () {

//         globalThis.tabs.setTitle("Einstellungen");

//         this.updateConfigs();

//     }

//     blur () {

//     }

// }

export default function (props: {}) {

    return (
        <>
        <div className="cart">
            <p className="title">Allgemein</p>
            <div className="content">
                <table>
                    <tr>
                        <td>Letzte Seite merken</td>
                        <td className="checkbox">
                        <label>
                            <input config="general:saveOpenPage" type="checkbox" className="filled-in" checked="checked" />
                            <span></span>
                        </label>
                        </td>
                    </tr>
                    <tr>
                        <td>Dark Mode</td>
                        <td className="checkbox">
                        <label>
                            <input config="general:darkMode" type="checkbox" className="filled-in" checked="checked" />
                            <span></span>
                        </label>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div className="cart">
            <p className="title">Workflow</p>
            <div className="content">
                <table>
                    <tr>
                        <td>Richtung</td>
                        <td>
                            <select data-config="workflow:direction">
                                <option value="a>b">A&rarr;B</option>
                                <option value="b>a">B&rarr;A</option>
                                <option value="a<>b">A&#8697&#65038;B</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Durchsatz/Tag</td>
                        <td>
                            <select data-config="workflow:dailyThroughput">
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
                            <select data-config="workflow:notKnownFromXAttempts">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div className="cart">
            <p className="title">Benachrichtigung</p>
            <div className="content">
                <table>
                    <tr>
                        <td>1. Erinnerung</td>
                        <td className="checkbox">
                        <label>
                            <input onclick="updateNotificationsUI(this)" config="notification:firstEnabled" type="checkbox" className="filled-in" checked={true} />
                            <span></span>
                        </label>
                        </td>
                    </tr>
                    <tr data-display="notification:firstEnabled" >
                        <td className="timepicker-td">
                            <input data-unfocus="true" data-config="notification:firstTime" placeholder="Zeit wählen" type="text" className="timepicker" />
                        </td>
                    </tr>
                    <tr>
                        <td>2. Erinnerung</td>
                        <td className="checkbox">
                        <label>
                            <input data-onclick="updateNotificationsUI(this)" data-config="notification:secondEnabled" type="checkbox" className="filled-in" checked={true} />
                            <span></span>
                        </label>
                        </td>
                    </tr>
                    <tr data-display="notification:secondEnabled" >
                        <td className="timepicker-td">
                            <input data-unfocus="true" data-config="notification:secondTime" placeholder="Zeit wählen" type="text" className="timepicker" />
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div className="cart">
            <p className="title">Synchronisation</p>
            <div className="content">
                <table>
                    <tr>
                        <td> API-Server </td>
                        <td style={{flex: 3}}>
                            <input data-config="api:base" type="text" placeholder="https://" />
                        </td>
                    </tr>
                    <tr> <td> <a href="https://github.com/otsmr/vokabapp-server">Quellcode vom Server</a> </td> </tr>
                </table>
            </div><br />
            <div className="content">
                <table>
                    <tr><td>
                        Speichern des Fortschritts.<br />
                        Daten über mehrere Geräte hinweg synchronisieren.
                    </td></tr>
                    <tr>
                        <td> Account </td>
                        <td style={{flex: 3}}>
                            <a data-action="createNewSession" className="btn waves-effect btn-flat">Anmelden</a>
                        </td>
                    </tr>
                    <tr> <td> <a href="https://oproj.de/privacy?inline=true">Datenschutzerklärung</a> </td> </tr>
                </table>
            </div>
            <div className="content" style={{display: "none"}}>
                <table>
                    <tr>
                        <td>
                            Letzter Sync: <b>{"lastSync"}</b>
                        </td>
                    </tr>
                    <tr>
                        <td>Sync-Auslöser</td>
                        <td style={{flex: 2}}>
                            <select data-config="sync:trigger">
                                <option value="startup" selected>App-Start</option>
                                <option value="change">Änderung</option>
                                <option value="always">Start + Änderung</option>
                                <option value="manuell">Manuell</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td> Manuell starten </td>
                        <td>
                            <a data-action="sync:start" className="waves-effect btn btn-flat"><i className="m-icon"> refresh </i></a>
                        </td>
                    </tr>
                    <tr>
                        <td> Account </td>
                        <td style="flex: 3;">
                            <a action="destroySession" className="btn waves-effect red btn-flat">Abmelden</a>
                        </td>
                    </tr>
                    <tr> <td> <a href="https://oproj.de/privacy?inline=true">Datenschutzerklärung</a> </td> </tr>
                </table>
            </div>
        </div>
        <br /><br />
        </>
    )
};