export interface threePointMenuInterface {
    title:string;
    click:(event:any) => void;
    display?:() => boolean;
}

export interface threePointMenuInterfaces extends Array<threePointMenuInterface>{}