import mongoose from 'mongoose';


const Schema = mongoose.Schema;


const commentSchema = new Schema({
    content : {type: "String", required : true},
    author :  {type: Schema.Types.ObjectId, ref: "Author"}
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment