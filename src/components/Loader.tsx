import React from 'react';

export default function () {

    return (
        <div className="loader" style={{marginTop: "50px"}}>
            <div className="preloader-wrapper small active" style={{display: "block", margin: "0 auto"}}>
                <div className="spinner-layer spinner-primary-only">
                    <div className="circle-clipper left"> <div className="circle"></div> </div>
                    <div className="gap-patch"> <div className="circle"></div> </div>
                    <div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    )

}