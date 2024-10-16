// Ambil parameter 'to' dari URL dan tampilkan di semua elemen dengan class "guest-name"
document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to');

  if (guestName) {
    // Decode nama tamu dan ganti '+' dengan spasi
    const nameToDisplay = decodeURIComponent(guestName.replace(/\+/g, ' '));

    // Pilih semua elemen dengan class "guest-name" dan update isinya
    const guestNameElements = document.querySelectorAll('.guest-name');
    guestNameElements.forEach(element => {
      element.textContent = nameToDisplay;
    });

  }
});