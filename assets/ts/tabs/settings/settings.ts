import * as moment from 'moment';
import 'moment/locale/de';
moment.locale('de');

import { threePointMenuInterfaces } from "../../layout/threePointMenu.int";
import { initMaterialize } from "../../layout/materialize"
import { Tab, TabInterface } from "../tab" 

import apiClient from "../../api/client"

import settingsHtml from "./settings.html";
import modalsHtml from "./modals.html"


globalThis.updateNotificationsUI = (el) => { 
    const $e = $(el);
    console.log($e.is(":checked"));
    $(`[display="${$e.attr("config")}"]`).css("display", ($e.is(":checked")) ? "flex" : "none")
};

class SettingsTabs extends Tab implements TabInterface {

    constructor () {
        super();
        this.initThreePointMenu();
    }

    create () {

        globalThis.events.on("afterConfigSync", (changes) => {
            if (changes) this.updateConfigs();
            else this.setLastSync();
        })

        this.element = $(settingsHtml);
        this.modals = $(modalsHtml.replace("#VERSION#", globalThis.VERSION)).appendTo("main");

        this.element.find("[config]").on("change", ((event)=>{
            const element:any = $(event.currentTarget);
            let val = element.val();
            if (element[0].type === "checkbox") {
                val = element.is(":checked");
            }
            if (element.attr("number")) {
                val = parseFloat(val);
            }
            if (element.attr("unfocus")) {
                setTimeout(() => {
                    element.blur();
                }, 50);
            }
            globalThis.config.set(element.attr("config"), val);
        }));

        this.element.find("[action]").click((event)=>{
            const element:JQuery = $(event.currentTarget);
            const action:string = element.attr("action");

            if (action === "createNewSession") {
                this.createNewSession(element);
            }
            if (action === "destroySession") {
                this.modals.find("[destroySession] [ok]").off("click").click(()=>{
                    apiClient.destroySession(()=>{
                        this.closeModal("destroySession");
                        this.updateConfigs();
                    })
                });
                this.openModal("destroySession");
            }
            if (action === "sync:start") {
                this.syncStart();
            }

        });
        
        this.updateConfigs();
        return this.element;

    }

    syncStart () {
        const el:JQuery = this.element.find('[action="sync:start"]');
        el.attr("disabled", "true");
        el.children("i").addClass("fa-spin");
        globalThis.sync.init(()=>{
            setTimeout(() => {
                el.removeAttr("disabled");
                el.children("i").removeClass("fa-spin");
            }, 1000);
        })
    }

    updateConfigs () {

        const sessionID:string = globalThis.config.get("api:sessionID");
        if (sessionID) {
            this.element.find('[notConnected]').fadeOut(0);
            this.element.find('[connected]').fadeIn(0);
        } else {
            this.element.find('[notConnected]').fadeIn(0);
            this.element.find('[connected]').fadeOut(0);
        }

        this.element.find("[config]").each((i, el)=>{
            const element:any = $(el);
            const conf:any = globalThis.config.get(element.attr("config"));
            if(element[0].tagName === "SELECT") {
                const instance = globalThis.M.FormSelect.getInstance(element[0]);
                if (instance) instance.destroy();
            }
            element.val(conf);

            if (element[0].type === "checkbox") {
                element.prop('checked', conf);
            }

        });

        
        initMaterialize();

        setTimeout(() => {
            globalThis.updateNotificationsUI($(`[config="notification:firstEnabled"]`));
            globalThis.updateNotificationsUI($(`[config="notification:secondEnabled"]`));
        }, 50);

        this.setLastSync();
        
    }
    
    setLastSync () {
        let lastSync = globalThis.config.get("api:lastSync");
        if (!lastSync) lastSync = "Noch nie";
        else lastSync = moment(new Date(lastSync)).fromNow();
        this.element.find("[lastSync]").text(lastSync);
    }

    createNewSession (element: JQuery) {

        element.attr('disabled', "true");
                
        this.openModal("createNewSession");
        
        apiClient.createNewSession((err, json)=>{
            if (err) {
                this.closeModal("createNewSession");
                element.removeAttr('disabled');
                alert("Die Verbindung ist fehlgeschlagen.");
                return;
            }
            const {siginPath, sessionID} = json;
            globalThis.config.set("api:sessionID", sessionID);
            localStorage.setItem("lastUpdate", null);

            window.open(siginPath);

            const int = setInterval(() => {
                apiClient.checkSessionID((err: Boolean, valid: Boolean)=>{
                    if (err || !valid) return;
                    clearInterval(int);
                    this.openModal("createNewSession");
                    this.modals.find("[createNewSession] .preloader-wrapper").remove();
                    this.modals.find("[createNewSession] h4").after(`<p>Erfolgreich verbunden.</p>`);
                    this.updateConfigs();
                    this.syncStart();
                    element.removeAttr('disabled');
                })
            }, 5000);

        })
    }

    initThreePointMenu () {

        const items:threePointMenuInterfaces = [
            {
                title: "Zurücksetzen",
                click: () => {
                    this.modals.find("[resetSettings] [reset]").off("click").click(()=>{
                        globalThis.config.reset();
                        const oldElement = this.element;
                        oldElement.replaceWith(this.create());
                        initMaterialize();
                        this.updateConfigs();
                    });
                    this.openModal("resetSettings");
                }
            },
            {
                title: "Über die App",
                click: () => {
                    this.openModal("aboutPage");
                }
            }
        ]

        globalThis.threePointMenu.register(`settings`, items);

    }

    focus () {

        globalThis.tabs.setTitle("Einstellungen");

        this.updateConfigs();

    }

    blur () {

    }

}

export default SettingsTabs;