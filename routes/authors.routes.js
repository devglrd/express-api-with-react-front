import { Router } from 'express';
import AuthorController from '../controllers/author.controller';
import Post from "../db/models/post";
import Author from '../db/models/author';
import cuid from "cuid";
import slug from "limax";
import sanitizeHtml from "sanitize-html";


const router = new Router();

router.get('/', (req, res) => {
    AuthorController.getAll(req, res);
});
router.get('/:cuid', (req, res) => {
    AuthorController.getOne(req, res);
});

router.post('/', (req, res) => {
    AuthorController.addAuthor(req, res);
});

router.post('/:cuid/post', (req, res) => {
    AuthorController.addPostAuthor(req, res);
});

export default router;