export const modalSaveChanges = `
<div>
<div class="modal" saveChanges>
    <div class="modal-content">
        <h4>Bitte warten</h4>
        <p>Die Datenbank wird aktualisiert.</p>
        <div class="preloader-wrapper small active" style='display: block; margin: 36px auto;'>
            <div class="spinner-layer spinner-primary-only">
                <div class="circle-clipper left"> <div class="circle"></div>
                </div><div class="gap-patch"> <div class="circle"></div>
                </div><div class="circle-clipper right"> <div class="circle"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>`;

export const statusDisplay = `
<div class="status-anzeige">
    <div>
        <span class="green-text"><span down>0</span> Herunterladen</span><br>
        <span class="red-text"><span del>0</span> Löschen</span>
    </div>
    <div> <a saveChanges class="btn btn-flat waves-effect"><i class="m-icon">save</i></a> </div>
</div>`;


export const loader = `
<div class="preloader-wrapper small active" style='display: block; margin: 50px auto;'>
    <div class="spinner-layer spinner-primary-only">
        <div class="circle-clipper left"> <div class="circle"></div>
        </div><div class="gap-patch"> <div class="circle"></div>
        </div><div class="circle-clipper right"> <div class="circle"></div>
        </div>
    </div>
</div>`;