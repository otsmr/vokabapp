import React from 'react';
// import { idbCon, initJsStore } from "../index";

// export interface CallBack {
//     (err: Boolean, data: any);
// }

// export class BaseService {

//     constructor() {
//         initJsStore();
//     }

//     get conn() {
//         return idbCon;
//     }

//     _default (promise, call: CallBack) {
//         promise.then((results) => {
//             call(false, results);
//         }).catch(function(error) {
//             call(true, error.message);
//         });
//     }

// }