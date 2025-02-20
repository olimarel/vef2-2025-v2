import express from 'express';
import { getCategoryById } from '../models/category.js';

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).render('404');
    }
    res.render('category', { category });
  } catch (error) {
    next(error);
  }
});

export default router;
