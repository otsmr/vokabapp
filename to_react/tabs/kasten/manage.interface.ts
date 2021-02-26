
interface KastenInterfaceConstructor {
    new(parentElement:JQuery, callBack: Function): KastenInterface;
}

let KastenInterface: KastenInterfaceConstructor;

export interface KastenInterface {

    element: JQuery;

}
