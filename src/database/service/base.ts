import React from 'react';
import initJsStore, { idbCon } from "../init";

export interface CallBack {
    (err: Boolean, data: any): void;
}

export class BaseService {

    constructor() {
        initJsStore();
    }

    get conn() {
        return idbCon;
    }

    _default (promise: Promise<any>, call: CallBack) {
        promise.then((results: any) => {
            call(false, results);
        }).catch(function(error: { message: any; }) {
            call(true, error.message);
        });
    }

}