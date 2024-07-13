import { Router } from 'express';
import {
    addBook,
    updateBook,
    deleteBook,
    searchBooks,
    getBookById,
    getAllBooks
} from './book.controller.js';

const router = Router();

router.post('/add', addBook);
router.put('/book/:bookId', updateBook);
router.delete('/delete/:bookId', deleteBook);
router.get('/book/search', searchBooks);
router.get('/getById/:bookId', getBookById);
router.get('/getall', getAllBooks);

export default router;
