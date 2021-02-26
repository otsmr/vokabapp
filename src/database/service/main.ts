import React from 'react';
// import { BaseService } from './base';

// import { 
//     GroupsModal,
//     SubGroupsModal,
//     ListsModal
// } from '../tables';

// export interface CallBack {
//     (err: Boolean, data: any);
// }

// export class DBService extends BaseService {

//     async importMetadata ({groups, subGroups, lists}: {
//         groups: GroupsModal,
//         subGroups: SubGroupsModal,
//         lists: ListsModal
//     }) {

//         groups = groups.map((e:any) => {
//             return { ...e,
//                 groupID: parseInt(e.groupID)
//             }
//         })
//         subGroups = subGroups.map((e:any) => {
//             return { ...e,
//                 groupID: parseInt(e.groupID),
//                 subGroupID: parseInt(e.subGroupID)
//             }
//         })
//         lists = lists.map((e:any) => {
//             return { ...e,
//                 listID: parseInt(e.listID),
//                 subGroupID: parseInt(e.subGroupID)
//             }
//         })

//         await this.conn.insert({ into: "groups", upsert: true, values: groups });
//         await this.conn.insert({ into: "subGroups", upsert: true, values: subGroups });
//         await this.conn.insert({ into: "lists", upsert: true, values: lists });

//     }

//     importItems (items: any[], call: CallBack) {

//         items = items.map((e:any) => {
//             return { ...e,
//                 listID: parseInt(e.listID),
//                 itemID: parseInt(e.itemID)
//             }
//         })

//         this._default(this.conn.insert({
//             into: "items",
//             upsert: true,
//             values: items
//         }), call);

//     }

//     getDownloadedListIDs (call: CallBack) {

//         this.conn.select({
//             from: "items",
//             groupBy: "listID",        
//         }).then((results:any) => {
//             // results -> groupID
//             call(false, results.map(e => e.listID));
//         }).catch(function(error) {
//             call(true, error.message);
//         });

//     }

//     removeLists (listIDs: number[], call: CallBack) {

//         const sqlQuery = {
//             from: "items",
//             where: []
//         }

//         for (const listID of listIDs) {
//             sqlQuery.where.push({
//                 or: {
//                     listID: listID
//                 }
//             })
//         }
        
//         if (sqlQuery.where.length === 0) return call(false, []);

//         this._default(this.conn.remove(sqlQuery), call);

//     }

//     getListsByGroups (call: CallBack) {

//         this.conn.select({
//             from: 'groups',
//             join:[{
//                 with: "subGroups",
//                 on: "groups.groupID=subGroups.groupID"
//             },{
//                 with: "lists",
//                 on: "lists.subGroupID=subGroups.subGroupID"
//             }]
//         }).then((lists:any) => {

//             this.getDownloadedListIDs((err, listIDs)=>{
//                 lists = lists.map(lists => {
//                     lists.offline = false;
//                     if (listIDs.indexOf(lists.listID) > -1) {
//                         lists.offline = true;
//                     }
//                     return lists;
//                 })
//                 call(false, lists);
//             })

//         }).catch(error => call(false, error.message));
//     }

    
// }

// export const dbService = new DBService();