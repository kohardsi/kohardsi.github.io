 var firebaseConfig = {
   apiKey: "AIzaSyC93TW6swGTCyYpmamq7df0mwx4dm3BKGw",
   authDomain: "kohardsi.firebaseapp.com",
   projectId: "kohardsi",
   storageBucket: "kohardsi.appspot.com",
   messagingSenderId: "608640770591",
   appId: "1:608640770591:web:e6727e99b45dd688982b2a",
   measurementId: "G-73FBXHV2KW"
 };
 firebase.initializeApp(firebaseConfig);

        $(document).ready(function() {
            var pageId = getPageIdFromDocumentTitle();


            // Mengecek status autentikasi pengguna
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // Jika pengguna terautentikasi, periksa apakah sudah memberi suka pada halaman ini sebelumnya
                    var likedPagesRef = firebase.database().ref("likedPages/" + user.uid);
                    likedPagesRef.child(pageId).once("value").then(function(snapshot) {
                        if (snapshot.exists()) {
                            // Jika pengguna sudah memberi suka, nonaktifkan tombol "Like"
                            $('#like-button').prop("disabled", true);
                        }
                    });
                }
            });


            if (pageId) {
                var viewStats = firebase.database().ref("pages/id/" + pageId + "/views");
                var likeStatsRef = firebase.database().ref("pages/id/" + pageId + "/likes");

                viewStats.once('value').then(function(snapshot) {
                    var viewCount = snapshot.val() || 0;
                    $('#view').text(viewCount);
                    viewStats.set(viewCount + 1);
                }).catch(function(error) {
                    console.error("Error getting view count: ", error);
                });

                likeStatsRef.once('value').then(function(snapshot) {
                    var likeCount = snapshot.val() || 0;
                    $('#like').text(likeCount);

                    $('#like-button').on('click', function() {
                        firebase.auth().onAuthStateChanged(function(user) {
                            if (user) {
                                // Tandai halaman ini sebagai disukai oleh pengguna
                                var likedPagesRef = firebase.database().ref("likedPages/" + user.uid);
                                likedPagesRef.child(pageId).set(true);
                                likeStatsRef.transaction(function(likes) {
                                    return (likes || 0) + 1;
                                }).then(function() {
                                    $('#like-button').prop("disabled", true);
                                }).catch(function(error) {
                                    console.error("Error updating like count: ", error);
                                });
                            } else {
                                console.log("Pengguna belum login.");
                            }
                        });
                    });
                }).catch(function(error) {
                    console.error("Error getting like count: ", error);
                });
            }
        });

        function getPageIdFromDocumentTitle() {
            return document.title.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        }