// programs.js
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('eventSearch');
  const eventsContainer = document.getElementById('events');
  const eventCards = eventsContainer.querySelectorAll('.event-card');

  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    eventCards.forEach(card => {
      const title = card.querySelector('.event-title')?.textContent.toLowerCase() || '';
      const description = card.querySelector('.event-description')?.textContent.toLowerCase() || '';

      if (title.includes(query) || description.includes(query)) {
        card.style.display = ''; // show
      } else {
        card.style.display = 'none'; // hide
      }
    });
  });
});
