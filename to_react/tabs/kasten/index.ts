import { Tab, TabInterface } from "../tab" 
import Kasten from "./kasten"

class KastenTabs extends Tab implements TabInterface {

    createdKasten:object = {};
    aktivKasten:number = null;

    create (openTab:string[]) {
        return this.element = $("<div class='fastTabs'>");
    }

    focus (openTab:string[]) {

        if (!this.createdKasten[openTab[1]]) {
            this.createdKasten[openTab[1]] = new Kasten(openTab[1]);
            this.element.append(
                $(`<div class="fastTab" kastenID="${openTab[1]}">`).append(
                    this.createdKasten[openTab[1]].element
                )
            )
        }

        const kasten:Kasten = this.createdKasten[openTab[1]];

        kasten.focus();

        this.element.find(`.open[kastenID]`).removeClass("open");
        this.element.find(`[kastenID="${openTab[1]}"]`).addClass("open");
                
    }

    blur () {

    }

}

export default KastenTabs;