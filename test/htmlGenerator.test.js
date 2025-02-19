import { describe, it, expect } from 'vitest';
import { generateIndexHTML, generateCategoryHTML } from '../src/lib/htmlGenerator.js';

describe('generateIndexHTML', () => {
  it('should generate index HTML with correct links', () => {
    const categories = [
      { title: 'HTML', file: 'html.json' },
      { title: 'CSS', file: 'css.json' },
      { title: 'JavaScript', file: 'js.json' },
    ];
    const html = generateIndexHTML(categories);
    expect(html).toContain('<li><a href="html.html">HTML</a></li>');
    expect(html).toContain('<li><a href="css.html">CSS</a></li>');
    expect(html).toContain('<li><a href="js.html">JavaScript</a></li>');
  });
});

describe('generateCategoryHTML', () => {
  it('should generate category HTML containing the title, questions and answers', () => {
    const categoryData = {
      title: 'HTML',
      questions: [
        {
          question: 'What is HTML?',
          answers: [
            { answer: 'Markup Language', correct: true },
            { answer: 'Programming Language', correct: false },
          ],
        },
      ],
    };

    const html = generateCategoryHTML(categoryData);
    expect(html).toContain('<h1>HTML</h1>');
    expect(html).toContain('What is HTML?');
    expect(html).toContain('<button data-correct="true">Markup Language</button>');
    expect(html).toContain('<button data-correct="false">Programming Language</button>');
    expect(html).toContain('quiz.js');
  });
});
