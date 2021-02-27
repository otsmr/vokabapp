import React, { useEffect } from 'react';
import { useState } from "react";
import { ExtraMenuSettingItems } from '../pages/Settings';

export default function (props: {}) {

    let _m: {
        title: string,
        modal?: JSX.Element
    }[] = [];

    const [menuItems, setMenuItems] = useState(_m);
    const [modal, setModal] = useState(<div></div>);
    const [currentHash, setCurrentHash] = useState(location.hash);

    useEffect(() => {

        setMenuItems(ExtraMenuSettingItems);

        window.addEventListener("hashchange", () => {
            setCurrentHash(location.hash);
        });

        // TODO: realy bad workaround
        setInterval(() => {
            
            const el = document.querySelector(".modal");
            if (!el)
                return;

            if (window.getComputedStyle(el).display === "none") {
                setModal(<div></div>);
            }
            
        }, 100);
        

    }, [])


    if (menuItems.length === 0)
        return null;

    return (
        <div className="more">
            {modal}
            <a className='dropdown-trigger' href={currentHash} data-target='threePointMenu'>
                <span className="m-icon">more_vert</span>
            </a>
            <ul id='threePointMenu' className='dropdown-content'>
                {menuItems.map((menuItem, key) => (
                    <li key={key} onClick={_ => {
                        if (menuItem.modal) 
                            setModal(menuItem.modal);
                    }}>
                        <a>
                            {menuItem.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )

}