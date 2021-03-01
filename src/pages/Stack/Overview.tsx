import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader';

import { getListOverviewForStack, IStackOverviewItems } from "./../../database/service/kasten"
import { registerExtraMenuItem } from '../../parts/ExtraMenu';
import { Link } from 'react-router-dom';


export default function (props: {}) {

    let _a: IStackOverviewItems[] = [];
    const [stackItems, setStackItems] = useState(_a);

    useEffect(() => {

        // registerExtraMenuItem("stack/overview") -> Übung abbrechen...

        getListOverviewForStack((err, data) => {
            if (err || !data) return;
            setStackItems(data);
            console.log(data);
        });

    }, [])

    return (
        <div className="selectexercise">
            {/* <Loader /> */}

            {/* <br /> */}

            {(stackItems.length > 0) ? (
                <p className="title">öffentliche Stapel</p> 
            ) : (
                <div className="empty">
                    <i className="fas fa-inbox"></i>  
                    <div className="openItems">0</div>
                    <p>Du hast noch keine Stapel</p>    
                </div>
            )}

            {stackItems.map((stackItem, key) => (
                <Link to={"/stack/list/" + stackItem.listID}>
                    <div className="cart" key={key}>
                        <div className="content">
                            <p className="header">{stackItem.groupName} → {stackItem.subGroupName}</p>
                            <b>{stackItem.listName}</b><br />
                            <p className="schema">
                                {stackItem.aTitel} &lt;-&gt; {stackItem.bTitel}
                            </p>
                            {/* <div className="count">{stackItem.length}</div> */}
                        </div>
                    </div>
                </Link>
            ))}

            {/* <p className="title">Geteilte Stapel</p>  */}
            
        </div>

    )


}