class Config {

    ignore: string[];

    constructor () {

        this.ignore = [
            "general:openPage",
            "api:base",
            "api:loggenIn",
            "lastUpdate",
            "api:lastSync",
            "api:sessionID"
        ]

        this.init();

    }

    init () {

        const defaultConf = {
            workflow: {
                direction:<string> "a>b", // a<>b, a>b und b>a
                dailyThroughput:<number> 10,
                notKnownFromXAttempts: 4
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

        for (const i in defaultConf) {
            for (const ii in defaultConf[i]) {
                const id = `${i}:${ii}`;
                if (this.get(id) === null) localStorage.setItem(id, JSON.stringify(defaultConf[i][ii]));
            }
        }

    }

    exportConfig () {
        const data = {
            config: {},
            time: this.get("lastUpdate")
        };
        for (const key of Object.keys(localStorage)) {
            if (this.ignore.indexOf(key) > -1) continue;
            data.config[key] = this.get(key);
        }
        return data;
    }

    importConfig (data: any) {
        for (const key of Object.keys(data.config)) {
            if (this.ignore.indexOf(key) > -1) continue;
            localStorage.setItem(key, JSON.stringify(data.config[key]));
        }
        localStorage.setItem("lastUpdate", JSON.stringify(data.time));
    }

    reset () {
        const sessionID = this.get("api:sessionID");
        localStorage.clear();
        this.set("api:sessionID", sessionID);
        this.init();
    }

    get (param:string) {
        let conf = JSON.parse(localStorage.getItem(param));
        if (conf === "false") conf = false;
        if (conf === "true") conf = true;
        return conf;
    }

    set (param:string, value: any) {
        localStorage.setItem(param, JSON.stringify(value));
        if (this.ignore.indexOf(param) > -1) return;
        localStorage.setItem("lastUpdate", JSON.stringify(parseInt("" + new Date().getTime() / 1000)));
        globalThis.events.configChange(param);
    }

}

export default new Config();