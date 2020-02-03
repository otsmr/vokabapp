const { exec } = require('child_process');
const rimraf = require("rimraf");
const ncp = require("ncp");
const fs = require("fs");

const c = {
    filesTo: "./build/www",
    filesFrom: "./public",
    uploadTo: __dirname + "/",
    appName: "VokabApp.apk",
    exportedApk: "./build/platforms/android/app/build/outputs/apk/debug/app-debug.apk"
}


console.log("Alte Dateien werden gelöscht");

rimraf.sync(c.filesTo + "/*");
console.log(c.appName);

try {
    fs.unlinkSync(c.uploadTo + c.appName);
} catch (error) { }

console.log("Dateien werden kopiert");

ncp(c.filesFrom, c.filesTo, (err) => {
    
    if (err) return console.log(err);

    console.log(".apk wird generiert");

    var int = setInterval(() => { process.stdout.write("▬"); }, 250);

    exec('cmd /c "cd /d ./build && cordova build android"', (error, stdout, stderr) => {

        clearInterval(int);
        console.log("");

        if (error) return console.log(`exec error: ${error}`);;
        console.log(".apk erstellt");

        console.log("KOPIEREN: .apk wird verschoben");
        fs.renameSync(c.exportedApk, c.uploadTo + c.appName);

    });

});