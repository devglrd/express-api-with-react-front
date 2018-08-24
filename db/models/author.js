import mongoose from 'mongoose';

//define schema
const Schema = mongoose.Schema;

//Make my table
const authorSchema = new Schema({
    name : { type : "String", required : true},
    age : {type : "Number", required: true},
    stars : {type : "Number"},
    cuid : { type : 'String', required: true},
    posts : [{type: Schema.Types.ObjectId, ref: "Post"}]
});

let Author = mongoose.model("Author", authorSchema);

export default Author;