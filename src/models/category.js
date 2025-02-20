import pool from '../config/db.js';

export async function getCategories() {
  const result = await pool.query('SELECT id, name FROM categories ORDER BY name');
  return result.rows;
}

export async function getCategoryById(id) {
  // Get the category
  const result = await pool.query('SELECT id, name FROM categories WHERE id = $1', [id]);
  if (result.rows.length === 0) return null;
  const category = result.rows[0];

  // Get questions for the category
  const questionsResult = await pool.query(
    'SELECT id, question_text FROM questions WHERE category_id = $1',
    [id]
  );

  // For each question, fetch the answers and attach them
  const questions = await Promise.all(questionsResult.rows.map(async (question) => {
    const answersResult = await pool.query(
      'SELECT id, answer_text, correct FROM answers WHERE question_id = $1',
      [question.id]
    );
    question.answers = answersResult.rows;
    return question;
  }));

  category.questions = questions;
  return category;
}

