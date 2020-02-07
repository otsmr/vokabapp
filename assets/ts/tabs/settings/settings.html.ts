export default `<div>
<div class="cart">
    <p class="title">Allgemein</p>
    <div class="content">
        <table>
            <tr>
                <td>Letzte Seite merken</td>
                <td class="checkbox">
                <label>
                    <input config="general:saveOpenPage" type="checkbox" class="filled-in" checked="checked" />
                    <span></span>
                </label>
                </td>
            </tr>
            <tr>
                <td>Dark Mode</td>
                <td class="checkbox">
                <label>
                    <input config="general:darkMode" type="checkbox" class="filled-in" checked="checked" />
                    <span></span>
                </label>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="cart">
    <p class="title">Workflow</p>
    <div class="content">
        <table>
            <tr>
                <td>Richtung</td>
                <td>
                    <select config="workflow:direction">
                        <option value="a>b">A&rarr;B</option>
                        <option value="b>a">B&rarr;A</option>
                        <option value="a<>b">A&#8596;B</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Durchsatz/Tag</td>
                <td>
                    <select config="workflow:dailyThroughput" number="true">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Nicht gewusst<br> nach X-Versuchen</td>
                <td>
                    <select config="workflow:notKnownFromXAttempts" number="true">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </td>
            </tr>
        </table>
    </div>
</div>
<div class="cart">
    <p class="title">Benachrichtigung</p>
    <div class="content">
        <table>
            <tr>
                <td>1. Erinnerung</td>
                <td class="checkbox">
                <label>
                    <input onclick="updateNotificationsUI(this)" config="notification:firstEnabled" type="checkbox" class="filled-in" checked="checked" />
                    <span></span>
                </label>
                </td>
            </tr>
            <tr display="notification:firstEnabled" ><td class="timepicker-td"><input unfocus="true" config="notification:firstTime" placeholder="Zeit wählen" type="text" class="timepicker"></td></tr>
            <tr>
                <td>2. Erinnerung</td>
                <td class="checkbox">
                <label>
                    <input onclick="updateNotificationsUI(this)" config="notification:secondEnabled" type="checkbox" class="filled-in" checked="checked" />
                    <span></span>
                </label>
                </td>
            </tr>
            <tr display="notification:secondEnabled" ><td class="timepicker-td"><input unfocus="true" config="notification:secondTime" placeholder="Zeit wählen" type="text" class="timepicker"></td></tr>
        </table>
    </div>
</div>
<div class="cart">
    <p class="title">Synchronisation</p>
    <div class="content" notConnected>
        <table>
            <tr><td>
                Speichern des Fortschritts.<br>
                Daten über mehrere Geräte hinweg synchronisieren.
            </td></tr>
            <tr>
                <td> Account </td>
                <td style="flex: 3;">
                    <a action="createNewSession" class="btn waves-effect btn-flat">Anmelden</a>
                </td>
            </tr>
            <tr> <td> <a href="https://oproj.de/privacy?inline=true">Datenschutzerklärung</a> </td> </tr>
        </table>
    </div>
    <div class="content" connected style="display: none;">
        <table>
            <tr><td>
                Letzter Sync: <b lastSync></b>
            </td></tr>
            <tr>
                <td>Sync-Auslöser</td>
                <td style="flex: 2;">
                    <select config="sync:trigger">
                        <option value="startup" selected>App-Start</option>
                        <option value="change">Änderung</option>
                        <option value="always">Start + Änderung</option>
                        <option value="manuell">Manuell</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td> Manuell starten </td>
                <td>
                    <a action="sync:start" class="waves-effect btn btn-flat"><i class="m-icon"> refresh </i></a>
                </td>
            </tr>
            <tr>
                <td> Account </td>
                <td style="flex: 3;">
                    <a action="destroySession" class="btn waves-effect red btn-flat">Abmelden</a>
                </td>
            </tr>
            <tr> <td> <a href="https://oproj.de/privacy?inline=true">Datenschutzerklärung</a> </td> </tr>
        </table>
    </div>
</div>
<br><br>
</div>`