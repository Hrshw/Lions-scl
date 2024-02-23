$(document).ready(function () {
    // Activate the carousel
    $('#carouselExampleFade').carousel();

    // Set interval for auto sliding (5 seconds)
    setInterval(function () {
        $('#carouselExampleFade').carousel('next');
    }, 5000); // 5000 milliseconds = 5 seconds
});



  function toggleDescription(link) {
    const cardBody = link.closest('.card');
    const description = cardBody.querySelector('.description');
    const fullDescription = cardBody.querySelector('.full-description');
    const readMoreButton = cardBody.querySelector('.read-more');
    const readLessButton = cardBody.querySelector('.read-less');

    if (cardBody.classList.contains('expanded')) {
      // If description is expanded, show only three lines and reset styling
      cardBody.classList.remove('expanded');
      description.classList.remove('expanded');
      fullDescription.style.display = 'none';
      cardBody.style.maxHeight = '';
      cardBody.style.overflow = 'hidden';
      readMoreButton.style.display = 'block';
      readLessButton.style.display = 'none';

      // Show other project cards
      const allCards = document.querySelectorAll('.card');
      allCards.forEach(otherCard => {
        otherCard.style.display = 'block';
      });
    } else {
      // If description is not expanded, show full description, adjust styling
      cardBody.classList.add('expanded');
      description.classList.add('expanded');
      fullDescription.style.display = 'block';
      cardBody.style.maxHeight = 'none';
      cardBody.style.overflow = 'visible';
      readMoreButton.style.display = 'none';
      readLessButton.style.display = 'block';

      // Hide other project cards
      const allCards = document.querySelectorAll('.card');
      allCards.forEach(otherCard => {
        if (otherCard !== cardBody) {
          otherCard.style.display = 'none';
        }
      });

      // Scroll to the centered card
      cardBody.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function toggleDescriptionBack(link) {
    const cardBody = link.closest('.card');
    const description = cardBody.querySelector('.description');
    const fullDescription = cardBody.querySelector('.full-description');
    const readMoreButton = cardBody.querySelector('.read-more');
    const readLessButton = cardBody.querySelector('.read-less');

    // Show only three lines and reset styling
    cardBody.classList.remove('expanded');
    description.classList.remove('expanded');
    fullDescription.style.display = 'none';
    cardBody.style.maxHeight = '';
    cardBody.style.overflow = 'hidden';
    readMoreButton.style.display = 'block';
    readLessButton.style.display = 'none';

    // Show other project cards
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(otherCard => {
      otherCard.style.display = 'block';
    });
  }
