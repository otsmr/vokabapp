import { DATA_TYPE, ITable } from 'jsstore';

export const groupsTable:ITable = {
    name: 'groups',
    columns: {
        groupID: {
            primaryKey: true,
            dataType: DATA_TYPE.Number
        },
        groupName: {
            notNull: true,
            dataType: DATA_TYPE.String
        }
    }
}

export interface GroupModal {
    groupID: number
    groupName: string
}

export interface GroupsModal extends Array<GroupModal>{}



export const subGroupsTable:ITable = {
    name: 'subGroups',
    columns: {
        subGroupID: {
            primaryKey: true,
            dataType: DATA_TYPE.Number
        },
        subGroupName: {
            notNull: true,
            dataType: DATA_TYPE.String
        },
        groupID: {
            dataType: DATA_TYPE.Number
        }
    }
}

export interface SubGroupModal {
    subGroupID: number;
    subGroupName:string;
    groupID: number;
}

export interface SubGroupsModal extends Array<SubGroupsModal>{}



export const listsTable:ITable = {
    name: 'lists',
    columns: {
        listID: {
            primaryKey: true,
            dataType: DATA_TYPE.Number
        },
        listName: {
            notNull: true,
            dataType: DATA_TYPE.String
        },
        author: {
            notNull: false,
            dataType: DATA_TYPE.String
        },
        homepage: {
            notNull: false,
            dataType: DATA_TYPE.String
        },
        aTitel: {
            notNull: true,
            dataType: DATA_TYPE.String
        },
        bTitel: {
            notNull: true,
            dataType: DATA_TYPE.String
        },
        subGroupID: {
            dataType: DATA_TYPE.Number
        }
    }
}

export interface ListModal {
    listID: number;
    listName:string;
    author:string;
    homepage:string;
    aTitel:string;
    bTitel:string;
    subGroupID: number;
}

export interface ListsModal extends Array<ListModal>{}


export const itemsTable:ITable = {
    name: 'items',
    columns: {
        itemID: {
            primaryKey: true,
            dataType: DATA_TYPE.Number
        },
        listID: {
            notNull: true,
            dataType: DATA_TYPE.Number
        },
        a: {
            notNull: false,
            dataType: DATA_TYPE.String
        },
        b: {
            notNull: false,
            dataType: DATA_TYPE.String
        }
    }
}

export interface ItemModal {
    itemID: number;
    a:string;
    b:string;
    listID: number;
}

export interface ItemsModal extends Array<ItemModal>{}


export const historysTable:ITable = {
    name: 'historys',
    columns: {
        historyID: {
            primaryKey: true,
            dataType: DATA_TYPE.Number,
            autoIncrement: true
        },
        historyDBID: {
            default: -1,
            dataType: DATA_TYPE.Number
        },
        itemID: {
            notNull: true,
            dataType: DATA_TYPE.Number
        },
        box: {
            notNull: true,
            dataType: DATA_TYPE.Number
        },
        time: {
            notNull: true,
            dataType: DATA_TYPE.Number
        }
    }
}

export interface HistoryModal {
    historyID:number;
    historyDBID:number;
    itemID:string;
    box:number;
    time:number;
}

export interface HistorysModal extends Array<HistoryModal>{}