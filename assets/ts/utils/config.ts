
const defaultConfig = {
    workflow: {
        direction:<string> "a>b", // a<>b, a>b und b>a
        dailyThroughput:<number> 10,
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
        saveOpenPage:<Boolean> true,
        darkMode:<Boolean> null,
        displayIntroduction: <Boolean> true
    },
    notification: {
        firstEnabled:<Boolean> false,
        firstTime:<number> null,
        secondEnabled:<Boolean> false,
        secondTime:<number> null
    },
    api: {
        base:<string> "https://vokabapp.oproj.de/api/",
        loggenIn:<Boolean> false,
        sessionID:<string> null,
        lastSync: <number> null
    },
    sync: {
        trigger: <string> "always"
    },
    list: {
        info:<any[]> [] 
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

const setDefaultConfig = () => {
        
    for (const i in defaultConfig) {

        for (const ii in defaultConfig[i]) {

            const id = `${i}:${ii}`;
            if (globalThis.config.get(id) === null) localStorage.setItem(id, JSON.stringify(defaultConfig[i][ii]));

        }

    }

}



class Config {

    exportConfig () {

        const data = {
            config: {},
            time: this.get("lastUpdate")
        };
        for (const key of Object.keys(localStorage)) {
            if (doNotSyncThem.indexOf(key) > -1) continue;
            data.config[key] = this.get(key);
        }
        return data;

    }

    importConfig (data: any) {

        for (const key of Object.keys(data.config)) {
            if (doNotSyncThem.indexOf(key) > -1) continue;
            localStorage.setItem(key, JSON.stringify(data.config[key]));
        }
        localStorage.setItem("lastUpdate", JSON.stringify(data.time));

    }

    reset () {

        const sessionID = this.get("api:sessionID");
        localStorage.clear();
        this.set("api:sessionID", sessionID);
        setDefaultConfig();

    }

    get (param:string) {

        let conf = JSON.parse(localStorage.getItem(param));
        if (conf === "false") conf = false;
        if (conf === "true") conf = true;
        return conf;

    }

    set (param:string, value: any) {

        localStorage.setItem(param, JSON.stringify(value));
        if (doNotSyncThem.indexOf(param) > -1) return;
        localStorage.setItem("lastUpdate", JSON.stringify(parseInt("" + new Date().getTime() / 1000)));
        globalThis.events.configChange(param);

    }

}

globalThis.config = new Config();
setDefaultConfig();