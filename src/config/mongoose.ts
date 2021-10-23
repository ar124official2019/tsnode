import path from 'path';
import root from '../root';
import * as dotenv from 'dotenv';
dotenv.config({
    path: path.join(root, '.env')
});

import mongoose from 'mongoose';
const env = process.env;

const URI = `mongodb://${env.DB_USER}:${env.DB_PWD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_DB}`;

export default mongoose.connect(URI);