import { Router } from 'express';
import {
    addArticle,
    updateArticle,
    deleteArticle,
    searchArticles,
    getArticleById,
    getAllArticles
} from './article.controller.js';

const router = Router();

router.post('/article', addArticle);
router.put('/article/:articleId', updateArticle);
router.delete('/article/:articleId', deleteArticle);
router.get('/article/search', searchArticles);
router.get('/getById/:articleId', getArticleById);
router.get('/getAllArticles', getAllArticles);

export default router;
