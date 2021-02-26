import React from 'react';
import { useEffect, useState, useRef } from 'react'
import { Link } from "react-router-dom"
import { isMobile, getClientX } from '../utils/utils';


export default function Navigation (props: {
    title: string
}) {

    const menuRef: React.MutableRefObject<any> = useRef(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    let openNav = false;
    let closeNav = false;
    let openNavSekond = false;
    let closeMoveX = 0;

    useEffect(() => {

        window.addEventListener("hashchange", () => {
            setIsMenuOpen(false);
        })

        window.addEventListener((isMobile()) ? 'touchend' : 'mouseup', (()=>{

            if (openNav) setIsMenuOpen(true);
            if (closeNav) setIsMenuOpen(false);
            
            openNav = false;
            closeNav = false;
            openNavSekond = false;
        
        }));
        
        window.addEventListener((isMobile()) ? 'touchmove' : 'mousemove', ((event:any) => {
            const clientX = getClientX(event);
        
            if (openNavSekond && clientX > 20) openNav = true;
            else openNav = false;
        
            if (closeMoveX - clientX > 30) closeNav = true;
        
        }));
        
        window.addEventListener((isMobile()) ? 'touchstart' : 'mousedown', ((event:any) => {
            const clientX = getClientX(event);
            
            if (clientX <= 10) openNavSekond = true;
            closeMoveX = clientX;
        
        }));

    }, []);

    useEffect(() => {

        menuRef.current.classList.add("play");
        
        setTimeout(() => {
            menuRef.current.classList.remove("play");
            menuRef.current.classList.toggle("menu-1");
            menuRef.current.classList.toggle("menu-2");
        }, 300);

    }, [isMenuOpen]);

    return (

        <nav>
            <header>

                <div ref={menuRef} onClick={_ => setIsMenuOpen(!isMenuOpen)} className="morph-icon menu-1"></div>
                <p id="menutitle">{props.title}</p>
                
                <div className="more">
                    <a className='dropdown-trigger' href='#' data-target='threePointMenu'>
                        <span className="m-icon">more_vert</span>
                    </a>
                    <ul id='threePointMenu' className='dropdown-content'></ul>
                </div>

            </header>

            <div className={"menu " + ((isMenuOpen) ? "open" : "")}>
                <div style={{height: "50px"}}>
                </div>
                <ul>
                    <li><Link to="stack"> <span className="m-icon">horizontal_split</span> Stapel</Link></li>
                    <li><Link to="overview"> <span className="m-icon">how_to_vote</span> Kartenübersicht</Link></li>
                    <li><Link to="statistics"> <span className="m-icon">trending_up</span> Statistik</Link></li>
                </ul>
                <hr />
                <ul>
                    <li><Link to="settings"> <span className="m-icon">settings_applications</span>Einstellungen</Link></li>
                    <li><Link to="help"> <span className="m-icon">help</span> Hilfe</Link></li>
                </ul>
            </div>
        </nav>

    )

}