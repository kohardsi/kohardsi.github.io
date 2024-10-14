    const parallax = document.getElementById('parallax');
    const images = [
        'https://images.pexels.com/photos/28831203/pexels-photo-28831203/free-photo-of-elegant-couple-in-wedding-attire-relaxing-indoors.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        'https://images.pexels.com/photos/28831202/pexels-photo-28831202/free-photo-of-elegant-bride-in-white-gown-sitting-indoors.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        'https://images.pexels.com/photos/28322760/pexels-photo-28322760/free-photo-of-a-bride-and-groom-pose-on-the-stairs-of-an-old-building.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        'https://images.pexels.com/photos/28831201/pexels-photo-28831201/free-photo-of-elegant-bride-in-arched-architecture-setting.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
    ];

    let currentIndex = 0;

    function changeBackground() {
        parallax.style.backgroundImage = `url(${images[currentIndex]})`;
        parallax.style.transform = 'scale(1.1)'; // Zoom in

        setTimeout(() => {
            parallax.style.transform = 'scale(1)'; // Zoom out
        }, 1000); // Match this timing to the transition duration

        currentIndex = (currentIndex + 1) % images.length; // Move to the next image
    }

    changeBackground(); // Set initial background
    setInterval(changeBackground, 4000); // Change background every 4 seconds