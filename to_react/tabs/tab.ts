

export class Tab {

    modals: JQuery;
    element: JQuery;

    openModal (id:string, option: object = null) {
        const instance = globalThis.M.Modal.getInstance(this.modals.find("["+id+"]")[0])
        if (option) {
            for (const i in option) {
                instance.options[i] = option[i];
            }
        }
        instance.open();
    }
    closeModal (id:string) {
        globalThis.M.Modal.getInstance(this.modals.find("["+id+"]")[0]).close();
    }

}



export interface TabInterface {
    /**
     * Function create
     * 
     * @desc Wird beim ersten Öffnen des Tabs einmal aufgerufen
     * 
     * @param openTab<Array>
     * 
     * @returns JQuery
     * Das JQuery Element wir ein das Dom eingefügt
     */
    create:(openTab:string[]) => JQuery;

    /**
     * 
     * Function focus
     * 
     * @desc Wird jedes mal aufgerufen, wenn der Tab geöffnet wird
     * 
     * @param openTab<Array>
     * 
     */
    focus:(openTab:string[]) => void;

    /**
     * 
     * Function blur
     * 
     * @desc Wird jedes mal aufgerufen, wenn ein anderer Tab geöffnet wird
     * 
     * @param openTab<Array>
     * 
     */
    blur:() => void;
}