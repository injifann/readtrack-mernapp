import express from 'express';
import { getAllBook,createBook,updateBook,deleteBook } from '../controllers/bookControllers.js';

const router = express.Router();

router.get("/",getAllBook);
router.post("/",createBook);
router.put("/:id",updateBook);
router.delete("/:id",deleteBook);

export default router;