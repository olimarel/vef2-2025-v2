import { describe, it, expect } from 'vitest';
import { cleanCategoryData } from '../src/lib/validator.js';

describe('cleanCategoryData', () => {
  it('should return null if data is not an object', () => {
    expect(cleanCategoryData(null, 'dummy.json')).toBeNull();
    expect(cleanCategoryData('string', 'dummy.json')).toBeNull();
  });

  it('should return null if title is missing', () => {
    const data = { questions: [] };
    expect(cleanCategoryData(data, 'dummy.json')).toBeNull();
  });

  it('should return null if questions is not an array', () => {
    const data = { title: 'Test', questions: 'not an array' };
    expect(cleanCategoryData(data, 'dummy.json')).toBeNull();
  });

  it('should filter out invalid questions and return valid data', () => {
    const data = {
      title: 'Test',
      questions: [
        {
          question: 'Valid question?',
          answers: [
            { answer: 'Yes', correct: true },
            { answer: 'No', correct: false },
          ],
        },
        {
          question: '',
          answers: [
            { answer: 'Maybe', correct: true },
            { answer: 'No', correct: false },
          ],
        },
        {
          question: 'No correct answer question',
          answers: [
            { answer: 'A', correct: false },
            { answer: 'B', correct: false },
          ],
        },
      ],
    };

    const cleaned = cleanCategoryData(data, 'dummy.json');
    expect(cleaned).not.toBeNull();
    expect(cleaned.questions.length).toBe(1);
    expect(cleaned.questions[0].question).toBe('Valid question?');
  });

  it('should return null if no valid questions remain', () => {
    const data = {
      title: 'Test',
      questions: [
        {
          question: '',
          answers: [{ answer: 'Yes', correct: true }],
        },
        {
          question: 'Invalid question',
          answers: 'not an array',
        },
      ],
    };
    expect(cleanCategoryData(data, 'dummy.json')).toBeNull();
  });
});
