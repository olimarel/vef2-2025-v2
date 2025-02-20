import pool from '../config/db.js';

export async function getCategories() {
  const result = await pool.query('SELECT id, name FROM categories ORDER BY name');
  return result.rows;
}

export async function getCategoryById(id) {
  const result = await pool.query('SELECT id, name FROM categories WHERE id = $1', [id]);
  if (result.rows.length === 0) return null;

  // Fetch questions for the category
  const questionsResult = await pool.query(
    'SELECT id, question_text FROM questions WHERE category_id = $1',
    [id]
  );
  const category = result.rows[0];
  category.questions = questionsResult.rows;
  return category;
}
