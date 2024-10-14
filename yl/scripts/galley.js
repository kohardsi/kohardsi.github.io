const slider = document.querySelector('.slider');
let autoSlideInterval;

// Function to activate the slide change based on direction
function activate(e) {
  const items = document.querySelectorAll('.item');
  if (e.target.matches('.next')) {
    slider.append(items[0]); // Move the first item to the end for 'next'
  }
  if (e.target.matches('.prev')) {
    slider.prepend(items[items.length - 1]); // Move the last item to the start for 'prev'
  }
}

// Function to auto-slide the items
function autoSlide() {
  const items = document.querySelectorAll('.item');
  slider.append(items[0]); // Automatically move the first item to the end
}

// Start the auto-slide functionality
function startAutoSlide() {
  autoSlideInterval = setInterval(autoSlide, 3000); // Change every 3 seconds
}

// Stop the auto-slide when user interacts
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Event listener for manual controls (prev/next buttons)
document.addEventListener('click', activate, false);

// Start auto-sliding when the page loads
window.addEventListener('load', startAutoSlide);

// Optional: Pause auto-slide on hover, resume when mouse leaves
slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);
