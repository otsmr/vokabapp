import {shuffleArray} from "../../../utils/array"
import {KastenInterface} from "../manage.interface"

import template from "./template";

import Swipper from "./swiper";

export default class Manage implements KastenInterface {

    swipper: Swipper;
    element: JQuery;
    callBack: Function;
    aktivVokab: any;
    items: any[];
    typeNames: string[];
    rounds: number;
    isReady: Boolean = false;

    constructor (obj: {
        parentElement: JQuery,
        items: object[],
        typeNames: string[],
        rounds: number,
        callBack: Function
    }) {

        this.rounds = obj.rounds;
        this.typeNames = obj.typeNames;

        this.callBack = obj.callBack;

        this.element = $(template);
        obj.parentElement.append(this.element);

        this.items = obj.items.map(e => {
            return {
                ...e,
                round: 0,
                known: false,
                trials: 0
            }
        });

        this.swipper = new Swipper(this.element, this.rounds, (known) => {

            if (this.isReady) {
                this.swipper.stillOpenTrials = 0;
                return;
            }

            if (known) {
                this.aktivVokab.round++;
            } else {
                this.aktivVokab.round = 0;
                this.aktivVokab.trials++;
            }
            
            this.nextVokab();

        });

        this.nextVokab();

    }

    nextVokab () {

        this.items = shuffleArray(this.items);
        let stillOpenTrials: number = 0;
        const balken = Array.from({length: this.rounds}, _ => 0);
        const vokabLen = this.items.length;

        let newAktivVokab = null;
        for (const vokab of this.items) {

            if (vokab.round < this.rounds - 1) {
                if (!newAktivVokab) {
                    newAktivVokab = vokab;
                }
                if (this.aktivVokab !== vokab) {
                    newAktivVokab = vokab;
                }
            }
            
            balken[vokab.round]++;
            stillOpenTrials += this.rounds - 1 - vokab.round;
        }

        for (const i in balken) balken[i] = balken[i] / vokabLen * 100;
        this.swipper.updateBalken(balken);

        if (!newAktivVokab) {
            this.isReady = true;
            this.swipper.aHtml = "";
            this.swipper.bHtml = "";
            this.callBack(this.items.map(e => {
                return {
                    ...e,
                    known: (e.trials <= globalThis.config.get("workflow:notKnownFromXAttempts")) ? true : false 
                }
            }));
            return;
        }

        this.aktivVokab = newAktivVokab;
        this.swipper.stillOpenTrials = stillOpenTrials;

        const direction:string = globalThis.config.get("workflow:direction");

        let typeName:string[] = this.typeNames.slice(0);
        let htmlContent:string[] = [this.aktivVokab.a, this.aktivVokab.b];

        if (direction === "b>a") {
            typeName.reverse();
            htmlContent.reverse();
        } else if (direction === "a<>b") {
            typeName = shuffleArray(typeName);
            htmlContent = shuffleArray(htmlContent);
        }

        this.swipper.typeName = typeName;
        this.swipper.aHtml = htmlContent[0];
        this.swipper.bHtml = htmlContent[1];

    }

}