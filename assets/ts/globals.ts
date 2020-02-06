
const g = globalThis;

g.VERSION = "1.0.0";

import { initMaterialize } from "./layout/materialize";
g.initMaterialize = initMaterialize;

import config from "./utils/config";
g.config = config;

import { Events } from "./utils/events";
g.events = new Events();

import Sync from "./api/sync";
g.sync = new Sync();

export default g;