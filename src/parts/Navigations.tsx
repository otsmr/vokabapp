import React from 'react';
import { useEffect, useState } from 'react'
// import { morph } from "../../public/to_react/utils/utils"

// function getClientX (event) {
//     return event.originalEvent.touches ?  event.originalEvent.touches[0].pageX : event.clientX;
// }

export default function Navigation (props: {}) {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // let openNav = false;
    // let closeNav = false;
    // let openNavSekond = false;
    // let closeMoveX = 0;


    useEffect(() => {

        // $(document).bind('mouseup touchend', (()=>{

        //     if (openNav) toggleNav(true);
        //     if (closeNav) toggleNav(false);
            
        //     openNav = false;
        //     closeNav = false;
        //     openNavSekond = false;
        
        // }));
        
        // $(document).bind('touchmove mousemove', ((event:any) => {
        //     const clientX = getClientX(event);
        
        //     if (openNavSekond && clientX > 20) openNav = true;
        //     else openNav = false;
        
        //     if (closeMoveX - clientX > 30) closeNav = true;
        
        // }));
        
        // $(document).bind('touchstart mousedown', ((event:any) => {
        //     const clientX = getClientX(event);
            
        //     if (clientX <= 10) openNavSekond = true;
        //     closeMoveX = clientX;
        
        // }));

    }, []);

    useEffect(() => {

        // morph("nav header .morph-icon");

    }, [isMenuOpen]);

    return (

        <nav>
            <header>

                <div onClick={_ => setIsMenuOpen(!isMenuOpen)} className="morph-icon menu-1"></div>
                <p id="menutitle">App wird geladen</p>
                
                <div className="more">
                    <a className='dropdown-trigger' href='#' data-target='threePointMenu'><span className="m-icon">more_vert</span></a>
                    <ul id='threePointMenu' className='dropdown-content'></ul>
                </div>

            </header>

            <div className="menu">
                <p>Kasten</p>
                <ul>
                    <li data-opentab="kasten:0">Training <span className="m-icon">library_books</span> </li>
                    <li data-opentab="kasten:1">Neu <span className="m-icon">playlist_add</span> </li>
                    <li data-opentab="kasten:2">1. Wdh <span className="m-icon">low_priority</span> </li>
                    <li data-opentab="kasten:3">2. Wdh <span className="m-icon">wrap_text</span> </li>
                    <li data-opentab="kasten:4">3. Wdh <span className="m-icon">wrap_text</span> </li>
                    <li data-opentab="kasten:5">Aussortierung <span className="m-icon">call_split</span> </li>
                    <li data-opentab="kasten:6">Fertig <span className="m-icon">playlist_add_check</span> </li>
                </ul>
                <p>Verwaltung</p>
                <ul>
                    <li data-opentab="lists"> Listen <span className="m-icon">how_to_vote</span> </li>
                    <li data-opentab="statistics"> Statistik <span className="m-icon">trending_up</span> </li>
                    <li data-opentab="settings"> Einstellungen <span className="m-icon">settings_applications</span> </li>
                </ul>
            </div>
        </nav>

    )

}