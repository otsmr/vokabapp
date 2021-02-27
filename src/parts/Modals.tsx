import React, { useEffect } from 'react';
import { createPortal } from "react-dom";


function Portal(props: {
    id: string,
    children: any
}) {

    const rootElement = document.querySelector(`#${props.id}`) || document.createElement("div");
    return createPortal(props.children, rootElement);

}


export default function (props: {
    children: JSX.Element,
    closeModal?: {(): void}
}) {

    useEffect(()=>{

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {
            inDuration: 100,
            outDuration: 100
        });
        for (const instance of instances) {
            instance.open();
        }

    }, [])

    return (

        <Portal id="portal">
            {props.children}
        </Portal>

    )

}