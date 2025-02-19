// public/quiz.js
document.addEventListener('DOMContentLoaded', () => {
  // Select answer buttons for every question
  const buttons = document.querySelectorAll('button[data-correct]');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const isCorrect = button.getAttribute('data-correct') === 'true';
      const questionSection = button.closest('.question');
      const feedbackDiv = questionSection.querySelector('.feedback');
      feedbackDiv.textContent = isCorrect ? 'Correct!' : 'Incorrect, try again.';
      feedbackDiv.style.color = isCorrect ? 'green' : 'red';

      // Optionally disable buttons after an answer is chosen
      questionSection.querySelectorAll('button[data-correct]').forEach(btn => btn.disabled = true);
    });
  });
});
