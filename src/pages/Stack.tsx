import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Overview from "./Stack/Overview"
import Swiper from './Stack/Swiper';

export default function (props: {}) {


    return (
        <Switch>

            <Route path="/stack/overview" >
                <Overview />
            </Route>

            <Route path="/stack/list/:listid" >
                <Swiper />
            </Route>

            <Route path="*">
                <Redirect to="/stack/overview"/>
            </Route>

        </Switch>
    )

}