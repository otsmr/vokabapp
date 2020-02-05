
$BUILDED_APK = "./platforms/android/app/build/outputs/apk/debug/app-debug.apk"
$MOVE_APK = ".\VokabApp.apk"

Write-Host 
Write-Host  "App wird erstellt und installiert" -ForegroundColor Green
Write-Host

cordova build android

Write-Host

if (Test-Path $BUILDED_APK) {
    Write-Host  ".apk wurde erstellt"  -ForegroundColor Green
    Write-Host 

    move $BUILDED_APK $MOVE_APK -Force

    adb install $MOVE_APK

} else {
    Write-Host ".apk wurde nicht gefunden"  -ForegroundColor Red 
}
