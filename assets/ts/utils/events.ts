"use strict";

class Event {

    trigger:object = {};

    getRandomNumber() {
        var pow = Math.pow(8, 10);
        return Math.floor(Math.random() * (9 * pow)) + pow;
    }

    on(name:string, call:Function, eventID:number = -1) {

        if (!this.trigger[name]) this.trigger[name] = [];
        if (eventID === -1) eventID = this.getRandomNumber();

        this.trigger[name].push({ eventID, call });
        return eventID;

    }

    off(eventID:number) {

        for (const i in this.trigger) {
            const items:any = this.trigger[i];

            for (let ii in items) {
                if (items[ii].eventID === eventID) {
                    items.splice(items.indexOf(items[ii]), 1);
                }
            }
        }

    }

    triggers (name:string, a:any = null, b:any = null, c:any = null, d:any = null) {
        const trigger = this.trigger[name];
        if (trigger) for (const i in trigger) trigger[i].call(a, b, c, d);
    }

}

export class Events extends Event {

    constructor() {
        super();
    }

    pageChange(pageID:string) {
        this.triggers("pageChange", pageID);
    }
    afterPageChange(pageID:string) {
        this.triggers("afterPageChange", pageID);
    }
    configChange(changedConfigID:string) {
        this.triggers("configChange", changedConfigID);
    }
    afterConfigSync(changes: Boolean) {
        this.triggers("afterConfigSync", changes);
    }
    listChanged() {
        this.triggers("listChanged");
    }
    historyChange() {
        this.triggers("historyChange");
    }
    error(type, err) {
        this.triggers("error", type, err);
    }

}