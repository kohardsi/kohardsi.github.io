// Select all the elements with the class 'animatable'
const animatedDivs = document.querySelectorAll('.animatable');

function checkVisibility() {
  animatedDivs.forEach(div => {
    // Get the position of the element relative to the viewport
    const rect = div.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Check if the element is within the viewport
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      // Add the 'animated' class to make it visible and apply the animation
      div.classList.add('animated');

      // Get the animation type from the data attribute and add it
      const animationType = div.getAttribute('data-animation');
      if (animationType) {
        div.classList.add(animationType);
      }
    } else {
      // Optionally remove the 'animated' class when the element is out of the viewport
      div.classList.remove('animated');

      // Remove the animation type if needed
      const animationType = div.getAttribute('data-animation');
      if (animationType) {
        div.classList.remove(animationType);
      }
    }
  });
}

// Add scroll and load event listeners to check visibility
window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);
