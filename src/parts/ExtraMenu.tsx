import React, { useEffect } from 'react';
import { useState } from "react";
import { initMaterialize } from '../utils/materialize';
import events from '../utils/events';


interface IMenuItem {
    title: string,
    onClick?: {(): void},
    modal?: JSX.Element
}

const registerdMenuItems: {
    pageid: string,
    menuItems: IMenuItem[]
}[] = [];

export function registerExtraMenuItem (pageid: string, menuItems: IMenuItem[]) {

    if (registerdMenuItems.find(e => e.pageid === pageid))
        return;

    registerdMenuItems.push({
        pageid,
        menuItems
    })

    events.triggers("new-extra-menu-registered");

}


export default function (props: {}) {

    let _m: IMenuItem[] = [];
    const [menuItems, setMenuItems] = useState(_m);
    const [modal, setModal] = useState(<div></div>);
    const [currentHash, setCurrentHash] = useState(location.hash);

    function getExtraMenu () {
        let pageid = location.hash.slice(location.hash.indexOf("/")+1);
        let found = registerdMenuItems.find(e => e.pageid === pageid);

        if (found)
            return found.menuItems;

        return [];

    }

    useEffect(() => {
        initMaterialize();
    }, [menuItems]);

    useEffect(() => {

        setMenuItems(getExtraMenu());
        
        events.on("new-extra-menu-registered", () => {
            setMenuItems(getExtraMenu());
        })

        window.addEventListener("hashchange", () => {
            setCurrentHash(location.hash);
            setMenuItems(getExtraMenu());
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