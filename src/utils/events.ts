import { randomInt } from "./utils";

const trigger:any = {};
const events:any = {}

events.on = (name:string, call:Function, eventID:number = -1): number => {

    if (!trigger[name]) trigger[name] = [];
    if (eventID === -1) eventID = randomInt(6);

    trigger[name].push({ eventID, call });
    return eventID;

}

events.off = (eventID:number) => {

    for (const i in trigger) {
        const items:any = trigger[i];

        for (let ii in items) {
            if (items[ii].eventID === eventID) {
                items.splice(items.indexOf(items[ii]), 1);
            }
        }
    }

}

const triggers = (name:string, a:any = null, b:any = null, c:any = null, d:any = null) => {
    const triggerItems = trigger[name];
    if (triggerItems) 
        for (const i in triggerItems) triggerItems[i].call(a, b, c, d);
}


events.pageChange = (pageID:string) => {
    triggers("pageChange", pageID);
}
events.afterPageChange = (pageID:string) => {
    triggers("afterPageChange", pageID);
}
events.configChange = (changedConfigID:string) => {
    triggers("configChange", changedConfigID);
}
events.afterConfigSync = (changes: Boolean) => {
    triggers("afterConfigSync", changes);
}
events.listChanged = () => {
    triggers("listChanged");
}
events.historyChange = () => {
    triggers("historyChange");
}
events.startApp = () => {
    triggers("startApp");
}
events.error = (type: string, err: any) => {
    triggers("error", type, err);
}

export default events;