import Post from '../db/models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import Author from "../db/models/author";

const PostController = {};


PostController.getAll = async (req, res) => {
    try{


        const posts = await Post.find().sort('-dateAdded').populate('author');
        res.json({"posts" : posts});

    }catch (e) {
        res.send(e)
    }
}

PostController.getPost = async (req, res) => {
    try{
        const { cuid } = req.params;

        const post = Post.find({cuid : cuid}).populate('author');
        post.exec((err, el) => {
            res.status(200).json({"posts" : el[0], "author" : el[0].author})
        })

    }
    catch(err){

    }
}


PostController.addPost = async (req, res) => {
    try {
        if (!req.body.post.title || !req.body.post.content){
            res.status(403).end()
        }
        const newPost = new Post(req.body.post);
        //sanitiz inputs
        newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true});
        newPost.cuid = cuid();
        // newPost.author = req.body.post.author._id;
        newPost.save((err, saved) => {
            if(err){
                res.status(500).send(err)
            }
            res.json({post: saved});
        })

    }catch(err){
        console.log(err)
    }
}

PostController.updatePost = async (req, res) => {
    try {
        if (!req.body.post.title || !req.body.post.content){
            res.status(403).end()
        }
        Post.findByIdAndUpdate(req.params._id, { $set: { title: req.body.post.title, content : req.body.post.content, author : req.body.post.author._id, slug : slug(req.body.post.title.toLowerCase(), { lowercase: true})}},  (err, updated) => {
            if (err) { res.status(500).send(err)}
            res.send(updated);
        });
    }catch (e) {
        console.log(e)
    }
}

PostController.deletePost = async (req, res) => {
    try {
        Post.deleteOne({ cuid: req.params.cuid }, function (err) {
            if (err) {res.status(500).send(err)}
            // deleted at most one tank document
            res.status(200).send("Post deleted");
        });

    }
    catch (err) {
        console.log(err);
    }
}

export default PostController;