/**
 * Home Page Scripts (index.html)
 * Controls pronunciation audio feedback and newsletter interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Pronunciation micro-interaction
  const pronounceBtn = document.getElementById('pronounceBtn');
  if (pronounceBtn) {
    pronounceBtn.addEventListener('click', () => {
      pronounceBtn.classList.add('bg-primary-container', 'text-on-primary-container');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance('Cut to the chase');
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
      setTimeout(() => {
        pronounceBtn.classList.remove('bg-primary-container', 'text-on-primary-container');
      }, 1200);
    });
  }

  // Newsletter submit feedback
  const form = document.getElementById('newsletterForm');
  const feedback = document.getElementById('subscriptionFeedback');
  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      feedback.classList.remove('hidden');
      form.reset();
    });
  }
});
