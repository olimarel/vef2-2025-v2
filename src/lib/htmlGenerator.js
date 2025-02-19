/**
 * Generatear HTML fyrir index síðuna með viðeigandi linkun
 * @param {Array<{ title: string, file: string }>} categories
 * @returns {string}
 */
export function generateIndexHTML(categories) {
    const listItems = categories
      .filter(cat => cat.file && typeof cat.file === 'string')
      .map(cat => {
        const htmlFileName = cat.file.replace('.json', '.html');
        return `<li><a href="${htmlFileName}">${cat.title}</a></li>`;
      })
      .join('\n');
  
    return /* html */ `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Quiz Flokkar</title>
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      <h1>Quiz Flokkar</h1>
      <ul>
        ${listItems}
      </ul>
    </body>
  </html>`;
  }

  /**
   * Hjálparfall svo spurningar í html.json birtist rétt
   * @param {*} unsafe 
   * @returns 
   */
  function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') {
      return '';
    }
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  
  /**
   * Generatear HTML fyrir flokka síðu/r
   * @param {any} categoryData
   * @returns {string}
   */
  export function generateCategoryHTML(categoryData) {
    const questionsHTML = categoryData.questions.map((question) => {
      const answersHTML = question.answers.map(answer => 
        `<li><button data-correct="${answer.correct}">${escapeHtml(answer.answer)}</button></li>`
      ).join('\n');
  
      return /* html */ `<section class="question">
        <p>${escapeHtml(question.question)}</p>
        <ul>
          ${answersHTML}
        </ul>
        <div class="feedback"></div>
      </section>`;
    }).join('\n');
  
    return /* html */ `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${escapeHtml(categoryData.title)}</title>
      <link rel="stylesheet" href="styles.css">
      <script defer src="quiz.js"></script>
    </head>
    <body>
      <h1>${escapeHtml(categoryData.title)}</h1>
      ${questionsHTML}
    </body>
  </html>`;
  }