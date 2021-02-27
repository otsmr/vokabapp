import events from "./events";

export interface ICWorkflow {
    direction: string,
    dailyThroughput: number,
    notKnownFromXAttempts: number
}

export interface ICGeneral {
    openPage: string[],
    saveOpenPage: boolean,
    darkMode: boolean,
    displayIntroduction: boolean
}
export interface ICNotification {
    firstEnabled: boolean,
    firstTime: number,
    secondEnabled: boolean,
    secondTime: number
}

export interface IDefaultConfig {
    workflow: ICWorkflow,
    boxTimes: any,
    general: ICGeneral,
    notification: ICNotification,
    api: {
        base: string,
        loggenIn: boolean,
        sessionID: string,
        lastSync: number
    },
    sync: {
        trigger: string
    },
    list: {
        info: any[] 
    }
}

const defaultConfig: {

} = {
    workflow: {
        direction: "a>b", // a<>b, a>b und b>a
        dailyThroughput: 10,
        notKnownFromXAttempts: 4
    },
    boxTimes: {
        2: 0, 
        3: 86400, 
        4: 86400 * 7, 
        5: 86400 * 30, 
        6: 86400 * 60
    },
    general: {
        openPage: ["kasten", "1"],
        saveOpenPage: true,
        darkMode: true,
        displayIntroduction: true
    },
    notification: {
        firstEnabled: false,
        firstTime: 0,
        secondEnabled: false,
        secondTime: 0
    },
    api: {
        base: "https://vokabapp.oproj.de/api/",
        loggenIn: false,
        sessionID: "",
        lastSync: 0
    },
    sync: {
        trigger: "always"
    },
    list: {
        info: [] 
    }
}

const doNotSyncThem = [
    "general:openPage",
    "api:base",
    "api:loggenIn",
    "lastUpdate",
    "api:lastSync",
    "api:sessionID"
]


class Config {

    constructor () {
        this.setDefaultConfig();
    }

    exportConfig () {

        const data: any = {
            config: {},
            time: this.get("lastUpdate")
        };
        for (const key of Object.keys(localStorage)) {
            if (doNotSyncThem.indexOf(key) > -1)
                continue;
            data.config[key] = this.get(key);
        }

        return data;

    }

    importConfig (data: any) {

        for (const key of Object.keys(data.config)) {
            if (doNotSyncThem.indexOf(key) > -1)
                continue;

            localStorage.setItem(key, JSON.stringify(data.config[key]));
        }

        localStorage.setItem("lastUpdate", JSON.stringify(data.time));

    }

    reset () {

        const sessionID = this.get("api:sessionID");
        localStorage.clear();
        this.set("api:sessionID", sessionID);

    }

    setDefaultConfig () {

        const dc: any = defaultConfig;
        
        for (const i in dc) {

            for (const ii in dc[i]) {
    
                const id = `${i}:${ii}`;
                if (this.get(id) === null)
                    localStorage.setItem(id, JSON.stringify(dc[i][ii]));
    
            }
    
        }

    }

    get (param:string): any {

        if (param.indexOf(":") === -1) {

            let option: any = {};
            const keys = Object.keys(localStorage);
            let i = keys.length;
        
            while ( i-- ) {
                if (keys[i].startsWith(param + ":")) {
                    let data = localStorage.getItem(keys[i]);

                    if (data)
                        option[keys[i].replace(param + ":", "")] = JSON.parse(data);

                }
            }
            
            return option;

        }

        let data = localStorage.getItem(param);
        if (!data) return null;
        let conf = JSON.parse(data);
        if (conf === "false") conf = false;
        if (conf === "true") conf = true;
        return conf;

    }

    set (param:string, value: any) {

        localStorage.setItem(param, JSON.stringify(value));
        if (doNotSyncThem.indexOf(param) > -1) return;
        localStorage.setItem("lastUpdate", JSON.stringify(parseInt("" + new Date().getTime() / 1000)));
        events.configChange(param);

    }

}

export default new Config();