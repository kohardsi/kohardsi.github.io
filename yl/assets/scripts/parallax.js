document.addEventListener("DOMContentLoaded", function() {
    const parallaxElement = document.getElementById('parallax');
    const listItems = document.querySelectorAll('#image-list li'); // Ambil semua li
    const images = Array.from(listItems).map(item => item.getAttribute('data-image')); // Ambil semua URL gambar dari data-image
    let currentIndex = 0; // Indeks untuk gambar saat ini

    // Fungsi untuk mengubah background dengan efek zoom dan fade
    function changeBackground() {
        console.log("Changing background to:", images[currentIndex]); // Log URL gambar yang akan diubah

        // Hapus kelas fade-in agar opacity kembali ke 0 sebelum mengganti gambar
        parallaxElement.classList.remove('fade-in');

        // Tunggu sebentar sebelum mengganti gambar
        setTimeout(() => {
            // Ganti background image dan tambahkan efek zoom
            parallaxElement.style.backgroundImage = `url('${images[currentIndex]}')`;
            parallaxElement.style.transform = 'scale(1.1)'; // Zoom in

            // Setelah mengganti gambar, tambahkan kelas fade-in untuk membuatnya perlahan muncul
            setTimeout(() => {
                parallaxElement.classList.add('fade-in');
                parallaxElement.style.transform = 'scale(1)'; // Zoom out
            }, 100); // Tunggu sebentar sebelum melakukan fade-in
        }, 500); // Durasi untuk menunggu sebelum gambar diganti (setengah detik)

        // Update indeks untuk gambar berikutnya
        currentIndex = (currentIndex + 1) % images.length; // Move to the next image
    }

    // Set background awal
    changeBackground(); 

    // Ulangi fungsi setiap 4 detik
    setInterval(changeBackground, 5000); // Ubah gambar setiap 5 detik
});
