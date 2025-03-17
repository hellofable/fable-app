import { PUBLIC_PB } from '$lib/env.js'

// @ts-nocheck
import PocketBase from 'pocketbase';
import { _user, _app } from '$lib';
import { auth } from './auth';
import { db } from './db/db';


export const pb = new PocketBase(PUBLIC_PB);




pb.auth = auth;
pb.db = db;

window.pb = pb;
