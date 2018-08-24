import { Router } from 'express';
import PostController from '../controllers/post.controller'
import Post from "../db/models/post";
import cuid from "cuid";
import slug from "limax";
import sanitizeHtml from "sanitize-html";
const router = new Router();

router.get('/', (req, res) => {
    PostController.getAll(req, res);
});

router.get('/:cuid', (req, res) => {
    PostController.getPost(req, res);
});

router.post('/', (req, res) => {
    PostController.addPost(req, res);
});

router.put('/:_id', (req, res) => {
    PostController.updatePost(req, res);
});

router.post('/delete/:cuid', (req, res) => {
    PostController.deletePost(req, res);
});

export default router;