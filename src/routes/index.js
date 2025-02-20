import express from 'express';
import { getCategories } from '../models/category.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await getCategories();
    res.render('index', { categories });
  } catch (error) {
    next(error);
  }
});

export default router;
