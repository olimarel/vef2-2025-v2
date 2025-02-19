/**
 * Athugar hvort einstaka spurning sé lögleg
 *
 * @param {any} question 
 * @param {string} filePath 
 * @returns {boolean} - true ef spurning er lögleg
 */
function isValidQuestion(question, filePath) {
    // Fyrir spurningatexta
    if (typeof question.question !== 'string' || question.question.trim() === '') {
      console.error(`Invalid question text in ${filePath}:`, question);
      return false;
    }
    // Fyrir svörin
    if (!Array.isArray(question.answers)) {
      console.error(`Invalid answers (not an array) in ${filePath}:`, question);
      return false;
    }
    // Sía út svarhluti sem eru ekki löglegir
    const validAnswers = question.answers.filter(ans =>
      typeof ans.answer === 'string' && ans.answer.trim() !== '' &&
      typeof ans.correct === 'boolean'
    );
    if (validAnswers.length !== question.answers.length) {
      console.error(`Some answers in ${filePath} are invalid and will be filtered out.`, question);
    }
    // Tryggja að það sé aðeins eitt rétt svar
    if (validAnswers.length === 0) {
      console.error(`No valid answers found in ${filePath} for question:`, question);
      return false;
    }
    const correctCount = validAnswers.filter(ans => ans.correct === true).length;
    if (correctCount !== 1) {
      console.error(`Invalid answers in ${filePath}: Question must have exactly one correct answer.`, question);
      return false;
    }
    question.answers = validAnswers;
    return true;
  }
  
  /**
   * Síar gögn í flokkunum
   * @param {any} data - The raw category data read from a JSON file.
   * @param {string} filePath - The name of the file (for logging).
   * @returns {any|null} - A new object with valid questions only, or null if invalid.
   */
  export function cleanCategoryData(data, filePath) {
    if (typeof data !== 'object' || data === null) {
      console.error(`Invalid data in ${filePath}: Data is not an object.`);
      return null;
    }
    if (!data.title || typeof data.title !== 'string') {
      console.error(`Invalid or missing title in ${filePath}.`);
      return null;
    }
    if (!Array.isArray(data.questions)) {
      console.error(`Invalid or missing questions array in ${filePath}.`);
      return null;
    }
  
    const validQuestions = data.questions.filter(q => isValidQuestion(q, filePath));
  
    if (validQuestions.length === 0) {
      console.error(`No valid questions found in ${filePath}.`);
      return null;
    }
  
    return {
      title: data.title,
      questions: validQuestions,
    };
  }
  