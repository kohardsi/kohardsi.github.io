$(window).on('load resize', function() {
    var width = $(window).width();
    if (width >= 768) {
        $('#myModal').modal('hide'); // Show modal for md and lg
    } else {
        $('#myModal').modal('show'); // Hide modal for smaller screens
    }
});

