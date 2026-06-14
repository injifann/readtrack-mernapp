import express, { Router } from 'express';
import { getAllBook,createBook,updateBook,deleteBook, getById} from '../controllers/bookControllers.js';

const router = express.Router();

router.get("/",getAllBook);
router.post("/",createBook);
router.put("/:id",updateBook);
router.delete("/:id",deleteBook);
router.get("/:id",getById)

export default router;