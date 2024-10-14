document.addEventListener("DOMContentLoaded", () => {
    const slideContainer = document.getElementById("carousel-slide");
    const totalSlides = document.querySelectorAll(".carousel-item").length;
    let currentIndex = 0;

    function slideCarousel() {
        // Update transform property to slide to the next image
        currentIndex = (currentIndex + 1) % totalSlides;
        slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Schedule the next slide
        setTimeout(slideCarousel, 7000); // Slide every 4 seconds
    }

    setTimeout(slideCarousel, 4000); // Start the carousel after initial delay
});
