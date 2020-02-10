
export interface threePointMenuInterface {
    title:string;
    click:(event:any) => void;
    display?:() => boolean;
}

export interface threePointMenuInterfaces extends Array<threePointMenuInterface>{}


class ThreePointMenu {

    element:JQuery;
    currentPageID:string;
    threePointMenus:object = [];

    constructor () {

        globalThis.events.on("afterPageChange", (pageID: string) => {
            this.change(pageID);
        });

        this.element = $("#threePointMenu").fadeOut(0);
        this.threePointMenus = [];

    }

    register (name:string, items:threePointMenuInterfaces) {
        this.threePointMenus[name] = items;
    }

    set (items:threePointMenuInterfaces):boolean {

        this.element.empty();
        let count = 0;

        for (const i in items) {
            const item:threePointMenuInterface = items[i];
            if (typeof item.display === "undefined"  || (item.display && item.display())) {
                this.element
                    .append($(`<li><a>${item.title} </a></li>`)
                    .click(item.click));
                count++;
            }
        }

        return count > 0;

    }

    update () {
        this.change(this.currentPageID);
    }

    change (pageID:string) {

        this.currentPageID = pageID;

        const target: JQuery = $(`[data-target="threePointMenu"]`);
        if (this.threePointMenus[pageID] && this.threePointMenus[pageID].length > 0) {
            if (this.set(this.threePointMenus[pageID])) {
                return target.fadeIn(0);
            }
        }

        target.fadeOut(0);

    }

}

globalThis.threePointMenu = new ThreePointMenu()