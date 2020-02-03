import toggleNav from "./../layout/navigation"
import { TabInterface } from "./tab/tab";

import KastenTabs from "./tab/kasten/"
import SettingsTabs from "./tab/settings/settings"
import Lists from "./tab/lists/lists.tab"
import StatisticsTab from "./tab/statistics/statistics.tab"


class Tabs {

    openTabs:object = {};
    focusedTab:TabInterface = null;
    blockChangeTab:boolean = false;
    rootElement:JQuery = $("main");

    constructor () {
        
    }

    init () {

        $("[openTab]").click((event):void => {
            
            const openTab:string[] = $(event.currentTarget).attr("openTab").split(":");
            this.changeTab(openTab);

        });

        $(window).on('hashchange', () => {
            this.changeTab(location.hash.slice(1).split(":"));
        });

        return this;
    }

    changeTab (openTab:string[]) {

        if (this.blockChangeTab) return;
        this.blockChangeTab = true;

        let tabID:string = openTab[0];
        const tabIDComplete: string = openTab.join(":");

        let isSubPage = false;
        
        if (openTab.length > 1) {

            isSubPage = true;

            if (!this.openTabs[tabIDComplete]) {
                
                switch (tabIDComplete) {
                    // case "lists:findMore": this.openTabs[tabIDComplete] = new listTabs.FindMoreTab(); break;
                    default: isSubPage = false; break;
                }

                if (isSubPage) this.rootElement.append(
                    $(`<div class="tab" tabid="${tabIDComplete}">`).append(
                        this.openTabs[tabIDComplete].create()
                    )
                );

            }

        }
        
        if (!isSubPage && !this.openTabs[tabID]) {

            switch (tabID) {
                case "kasten": this.openTabs[tabID] = new KastenTabs(); break;
                case "settings": this.openTabs[tabID] = new SettingsTabs(); break;
                case "lists": this.openTabs[tabID] = new Lists(); break;
                case "statistics": this.openTabs[tabID] = new StatisticsTab(); break;
                default: return;
            }

            this.rootElement.append(
                $(`<div class="tab" tabid="${tabID}">`).append(
                    this.openTabs[tabID].create()
                )
            );
            
        }

        globalThis.config.set("general:openPage", openTab);

        globalThis.events.pageChange(tabIDComplete);
        
        const openTabID = (isSubPage) ? tabIDComplete : tabID;

        if (this.focusedTab) {
            // if (this.focusedTab === this.openTabs[openTabID]) return;
            this.rootElement.find(`.open[tabid]`).removeClass("open");
            this.focusedTab.blur();
        }

        this.focusedTab = this.openTabs[openTabID];
        location.hash = tabIDComplete;
        this.openTabs[openTabID].focus(openTab);
        setTimeout(() => {
            // Wenn nicht Async wird die Animation nach dem ersten Erstellen nicht ausgeführt
            this.rootElement.find(`[tabid="${openTabID}"]`).addClass("open");
            this.blockChangeTab = false;
        }, 10);

        toggleNav(false);

        globalThis.events.afterPageChange(tabIDComplete);

    }

    setTitle (title:string):void {
        $("#menutitle").text(title);
    }

}

export default ():object => {
    return new Tabs().init();
}