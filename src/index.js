// // index.js
const baseUrl = 'http://localhost:3000/ramens';

// Callbacks
const handleClick = (ramen) => {
  const detailImage = document.querySelector('.detail-image');
  const detailName = document.querySelector('.name');
  const detailRestaurant = document.querySelector('.restaurant');
  const detailRating = document.getElementById('rating-display');
  const detailComment = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;
};

// Display Ramens
const displayRamens = () => {
  fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
      const ramenMenu = document.getElementById('ramen-menu');
      data.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });

      // Display first ramen details on load
      if (data.length > 0) {
        handleClick(data[0]);
      }
    });
};

// Form submit event listener
const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Create new ramen from form values
    const newRamen = {
      name: document.getElementById('new-name').value,
      restaurant: document.getElementById('new-restaurant').value,
      image: document.getElementById('new-image').value,
      rating: document.getElementById('new-rating').value,
      comment: document.getElementById('new-comment').value,
    };

    // Append new ramen image to #ramen-menu
    const ramenMenu = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.addEventListener('click', () => handleClick(newRamen));
    ramenMenu.appendChild(img);

    // Optionally reset form
    form.reset();
  });
};

// Main function
const main = () => {
  displayRamens();        // Load and display all ramen images
  addSubmitListener();    // Add event listener to the form
};

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', main);

export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
