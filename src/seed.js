// src/seed.js
import path from 'node:path';
import { readJson } from './lib/dataReader.js';
import { cleanCategoryData } from './lib/validator.js';
import pool from './config/db.js';

async function seedDatabase() {
  try {
    // Load index.json to get a list of categories
    const indexPath = path.join('data', 'index.json');
    const indexData = await readJson(indexPath);
    if (!indexData || !Array.isArray(indexData)) {
      console.error('Invalid index.json; expected an array.');
      return;
    }

    // For each entry in index.json, load, validate, and insert data
    for (const entry of indexData) {
      if (!entry.file || typeof entry.file !== 'string') {
        console.error('Skipping entry with invalid file property:', entry);
        continue;
      }
      const categoryFilePath = path.join('data', entry.file);
      const rawCategoryData = await readJson(categoryFilePath);
      if (!rawCategoryData) {
        console.error(`Unable to read file ${entry.file}, skipping ${entry.title}.`);
        continue;
      }
      const categoryData = cleanCategoryData(rawCategoryData, entry.file);
      if (!categoryData) {
        console.error(`Skipping category ${entry.title}: no valid questions.`);
        continue;
      }

      // Insert the category into the database
      const { rows: [catRow] } = await pool.query(
        'INSERT INTO categories (name) VALUES ($1) RETURNING id',
        [categoryData.title]
      );
      const categoryId = catRow.id;
      console.log(`Inserted category '${categoryData.title}' with id ${categoryId}`);

      // Insert each question into the database
      for (const question of categoryData.questions) {
        const { question: questionText, answers } = question;
        const { rows: [quesRow] } = await pool.query(
          'INSERT INTO questions (category_id, question_text) VALUES ($1, $2) RETURNING id',
          [categoryId, questionText]
        );
        const questionId = quesRow.id;
        console.log(`  Inserted question with id ${questionId}`);

        // Insert each answer
        for (const answer of answers) {
          await pool.query(
            'INSERT INTO answers (question_id, answer_text, correct) VALUES ($1, $2, $3)',
            [questionId, answer.answer, answer.correct]
          );
        }
      }
    }
    console.log('Database seeding completed.');
  } catch (error) {
    console.error('Error during seeding:', error.message);
  } finally {
    pool.end();
  }
}

seedDatabase();
