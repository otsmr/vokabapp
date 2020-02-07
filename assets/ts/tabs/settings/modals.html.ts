export default `<div>
<div class="modal" aboutPage>
    <div class="modal-content">
        <h4>VokabApp</h4>
        <p style="margin: -10px 3px 0;">by TSMR.eu</p>
        <p>
            <b>Version:\t\t#VERSION#</b><br>
            Diese App ist Open-Source. Den Quellcode gibt es auf <a href="https://github.com/otsmr/vokabapp">Github</a>.<br><br>
            <b>Credits</b><br>
            <a href="https://github.com/rikschennink/fitty">Fitty</a>, <a href="https://jsstore.net/">JsStore</a>, <a href="https://materializecss.com/">Materialize</a>, <a href="https://jquery.com/">JQuery</a>, <a href="https://material.io/resources/icons/?style=round">Material Icons</a>, <a href="https://fontawesome.com/icons">Font Awesome</a>, <a href="https://fonts.google.com/specimen/Roboto">Roboto</a><br>
            <p>Vielen Dank auch an die Entwickler von Mozilla Firefox, phpmyadmin, PHP, mysql, Linux, VSCode, Gulp, TypeScript, Sass, NodeJS und vielen mehr, die ihre Software kostenlos zur Verfügung stellen.</p>
        </p>
    </div>
    <div class="modal-footer">
        <a class="modal-close waves-effect waves-dark btn-flat">Ok</a>
    </div>
</div>

<div class="modal" resetSettings>
    <div class="modal-content">
        <h4>Einstellungen zurücksetzen?</h4>
    </div>
    <div class="modal-footer">
        <a class="modal-close waves-effect waves-dark btn-flat" reset>Ok</a>
        <a class="modal-close waves-effect waves-dark btn-flat">Abbrechen</a>
    </div>
</div>

<div class="modal" destroySession>
    <div class="modal-content">
        <h4>Wirklich Abmelden?</h4>
    </div>
    <div class="modal-footer">
        <a class="modal-close waves-effect waves-dark btn-flat" ok>Ok</a>
        <a class="modal-close waves-effect waves-dark btn-flat">Abbrechen</a>
    </div>
</div>

<div class="modal" createNewSession>
    <div class="modal-content">
        <h4>Mit Odmin anmelden</h4>
        <div class="preloader-wrapper small active" style='display: block; margin: 50px auto;'>
            <div class="spinner-layer spinner-primary-only">
                <div class="circle-clipper left"> <div class="circle"></div>
                </div><div class="gap-patch"> <div class="circle"></div>
                </div><div class="circle-clipper right"> <div class="circle"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <a class="modal-close waves-effect waves-dark btn-flat">Ok</a>
    </div>
</div></div>`