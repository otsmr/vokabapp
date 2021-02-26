import React, { useEffect } from 'react';

// import dbHistory from "../../database/service/history"


function Loader () {

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

export default function (props: {}) {


    useEffect(() => {

        // dbHistory.getCountItemsinHistoryByBox((err, counts)=>{

        //     this.element.html(`
        //     <div className="cart">
        //         <p className="title">Im Kasten</p>
        //         <div className="content">
        //             ${this.renderStatistics(counts)}
        //         </div>
        //     </div>
        //     `)

        // })

    }, [])


    return (

        // <Loader />
        <p>Coming Soon</p>

    )


} 