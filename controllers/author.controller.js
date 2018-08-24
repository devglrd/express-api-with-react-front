import Author from '../db/models/author';
import Post from '../db/models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

const AuthorController = {};


AuthorController.getAll = async (req, res) => {
    try{
        await Author.find().populate('posts').exec((err, author) => {
            if (err) res.status(500).send(err);
            console.log(author);
            res.status(200).json({author})
        })
    }catch (e) {
        console.log(e);
    }
}

AuthorController.getOne = async (req, res) => {
    try{
        const { cuid } = req.params;
        const author = await Author.find({cuid : cuid});
        //get the post of author
        const posts = await Post.find({author: author}).sort('-dateAdded');
        res.status(200).json({author, posts});
    }catch (e) {
        console.log(e)
    }
}

AuthorController.addAuthor = async (req, res) => {
    try{
        if (!req.body.author.name || !req.body.author.age ){
            res.status(403).end()
        }
        const newAuthor = new Author(req.body.author);
        newAuthor.cuid = cuid();
        newAuthor.posts = [];
        const author = await newAuthor.save();
        res.status(200).json(author);
    }catch (e) {
        console.log(e)
    }
}

AuthorController.addPostAuthor = async (req, res) => {
    try {
        //add post to author
        if (!req.body.post.title || !req.body.post.content){
            res.status(403).end()
        }
        const newPost = new Post(req.body.post);
        const author = await Author.find({cuid: req.params.cuid});
        newPost.author = author;
        newPost.cuid = cuid();
        newPost.slug = slug(req.body.post.title.toLowerCase(), { lowercase: true});
        await newPost.save();
        res.status(201).json({newPost})
    }catch (e) {
        console.log(e)
    }
}

export default AuthorController;