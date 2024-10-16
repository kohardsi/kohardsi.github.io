//Modal Onload
window.onload = function() {
    // Check if the screen width is less than 768px
    if (window.innerWidth < 768) {
        $('#myModal').modal('show');
    }
};


//Smooth scroll
    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function smoothScroll(target, duration) {
      let targetPosition = target.getBoundingClientRect().top + window.pageYOffset; // Update to use pageYOffset
      let startPosition = window.pageYOffset;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let run = easeInOutQuad(timeElapsed / duration) * (targetPosition - startPosition) + startPosition; // Update to use targetPosition

        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      requestAnimationFrame(animation);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        let target = document.querySelector(this.getAttribute('href'));
        smoothScroll(target, 1000);
      });
    });

// Sticky Div
// Get the sticky div and section 2
    var stickyDiv = document.getElementById("stickyDiv");
    var section2 = document.querySelector(".sec-date");

    // Detect scroll event
    window.addEventListener("scroll", function() {
      var section2Top = section2.getBoundingClientRect().top;

      // Show stickyDiv only when we reach Section 2 or beyond
      if (section2Top <= 300) {
        stickyDiv.style.display = "block";
      } else {
        stickyDiv.style.display = "none";
      }
    });