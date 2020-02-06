import * as M from "materialize-css";

export const initMaterialize = () => {

    M.AutoInit(document.body);

    setTimeout(() => {
        
        const elems:any = document.querySelectorAll('.timepicker');
        for (const el of elems) {
            const instances = M.Timepicker.getInstance(el);
            instances.destroy();
        }

        $('.timepicker').timepicker({
            twelveHour: false,
            autoClose: true,
            i18n: {
                cancel: "Abbrechen",
                done: "Ok"
            },
            vibrate: true
        });
        $(".timepicker-modal").appendTo("body");

    }, 150);

}

export const registerEventsMaterialize = () => {

    globalThis.events.on("afterPageChange", () => {
        console.log("OK");
        initMaterialize();
    })

}