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


function uploadEvent() {
  // Get form data
  const eventTitle = document.getElementById('eventTitle').value;
  const conductedOn = document.getElementById('conductedOn').value;
  const conductedAt = document.getElementById('ConductedAt').value;
  const totalCost = document.getElementById('totalCost').value;
  const totalBeneficiaries = document.getElementById('totalBeneficiaries').value;

  // Validate form fields
  if (!eventTitle || !conductedOn || !conductedAt || !totalCost || !totalBeneficiaries) {
    alert('Please fill in all required fields.');
    return;
  }

  // Get event image files
  const eventImage1 = document.getElementById('eventImage1').files[0];
  const eventImage2 = document.getElementById('eventImage2').files[0];
  const eventImage3 = document.getElementById('eventImage3').files[0];
  const eventImage4 = document.getElementById('eventImage4').files[0];
  const eventImage5 = document.getElementById('eventImage5').files[0];

  // Check if at least one image is uploaded
  if (!eventImage1 && !eventImage2 && !eventImage3 && !eventImage4 && !eventImage5) {
    alert('Please upload at least one image.');
    return;
  }

  // Check image file size
  if (eventImage1 && eventImage1.size > 200000) {
    alert('Image file size exceeds the limit of 130 KB.');
    return;
  }
  if (eventImage2 && eventImage2.size > 200000) {
    alert('Image file size exceeds the limit of 130 KB.');
    return;
  }
  if (eventImage3 && eventImage3.size > 200000) {
    alert('Image file size exceeds the limit of 130 KB.');
    return;
  }
  if (eventImage4 && eventImage4.size > 200000) {
    alert('Image file size exceeds the limit of 130 KB.');
    return;
  }
  if (eventImage5 && eventImage5.size > 200000) {
    alert('Image file size exceeds the limit of 130 KB.');
    return;
  }
  // Create FormData object
  const formData = new FormData();
  formData.append('eventTitle', eventTitle);
  formData.append('conductedOn', conductedOn);
  formData.append('conductedAt', conductedAt);
  formData.append('totalCost', totalCost);
  formData.append('totalBeneficiaries', totalBeneficiaries);

  // Append event image files to FormData
  if (eventImage1) formData.append('eventImage', eventImage1);
  if (eventImage2) formData.append('eventImage', eventImage2);
  if (eventImage3) formData.append('eventImage', eventImage3);
  if (eventImage4) formData.append('eventImage', eventImage4);
  if (eventImage5) formData.append('eventImage', eventImage5);

  // Send POST request to server
  fetch('/uploadEvent', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (response.ok) {
        // Reset the form
        document.getElementById('eventForm').reset();
        // Show success message
        alert('Event uploaded successfully!');
      } else {
        // Show error message
        throw new Error('Failed to upload event');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Show error message
      alert('Failed to upload event');
    });
}



// function uploadCarouselImage() {
//   // Get carousel image files
//   const carouselImage1 = document.getElementById('carouselImage1').files[0];
//   const carouselImage2 = document.getElementById('carouselImage2').files[0];
//   const carouselImage3 = document.getElementById('carouselImage3').files[0];
//   const carouselImage4 = document.getElementById('carouselImage4').files[0];
//   const carouselImage5 = document.getElementById('carouselImage5').files[0];

//   // Check if at least one image is selected
//   if (!carouselImage1 && !carouselImage2 && !carouselImage3) {
//     alert('Please select at least one image.');
//     return;
//   }

//   // Check image file size
//   if (carouselImage1 && carouselImage1.size > 200000) {
//     alert('Image file size exceeds the limit of 200 KB.');
//     return;
//   }
//   if (carouselImage2 && carouselImage2.size > 200000) {
//     alert('Image file size exceeds the limit of 200 KB.');
//     return;
//   }
//   if (carouselImage3 && carouselImage3.size > 200000) {
//     alert('Image file size exceeds the limit of 200 KB.');
//     return;
//   }
//   if (carouselImage4 && carouselImage4.size > 200000) {
//     alert('Image file size exceeds the limit of 200 KB.');
//     return;
//   }
//   if (carouselImage5 && carouselImage5.size > 200000) {
//     alert('Image file size exceeds the limit of 200 KB.');
//     return;
//   }

//   // Create FormData object
//   const formData = new FormData();

//   // Append carousel image files to FormData
//   if (carouselImage1) formData.append('carouselImage', carouselImage1);
//   if (carouselImage2) formData.append('carouselImage', carouselImage2);
//   if (carouselImage3) formData.append('carouselImage', carouselImage3);
//   if (carouselImage4) formData.append('carouselImage', carouselImage4);
//   if (carouselImage5) formData.append('carouselImage', carouselImage5);

//   // Send POST request to server
//   fetch('/uploadCarouselImage', {
//     method: 'POST',
//     body: formData
//   })
//     .then(response => {
//       if (response.ok) {
//         // Reset the form
//         document.getElementById('carouselForm').reset();
//         // Show success message
//         alert('Carousel images uploaded successfully!');
//       } else {
//         // Show error message
//         throw new Error('Failed to upload carousel images');
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       // Show error message
//       alert('Failed to upload carousel images');
//     });
// }
