import pool from '../config/db.js';

export async function addQuestion(categoryId, questionText, answers) {
  // Insert question and its answers in a transaction
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows } = await client.query(
      'INSERT INTO questions (category_id, question_text) VALUES ($1, $2) RETURNING id',
      [categoryId, questionText]
    );
    const questionId = rows[0].id;

    const insertAnswerQuery =
      'INSERT INTO answers (question_id, answer_text, correct) VALUES ($1, $2, $3)';
    for (const answer of answers) {
      await client.query(insertAnswerQuery, [questionId, answer.answer, answer.correct]);
    }
    await client.query('COMMIT');
    return questionId;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
