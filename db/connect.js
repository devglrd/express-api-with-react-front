import mongoose from "mongoose";
import config from '../config/index';

mongoose.Promise = global.Promise;

const connectToDb = () => {
    mongoose.connect(config.mongoUrl);
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, "connection error"));
    db.once('open', () => {
        console.log(`connected on url ${config.mongoUrl}`)
    })
}
export default connectToDb;