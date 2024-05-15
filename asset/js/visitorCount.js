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
            if (pageId) {
                var viewStats = firebase.database().ref("pages/id/" + pageId + "/views");
                var likeStats = firebase.database().ref("pages/id/" + pageId + "/likes");

                viewStats.once('value').then(function(snapshot) {
                    var viewCount = snapshot.val() || 0;
                    $('#view').text(viewCount);
                    viewStats.set(viewCount + 1);
                }).catch(function(error) {
                    console.error("Error getting view count: ", error);
                });

                likeStats.once('value').then(function(snapshot) {
                    var likeCount = snapshot.val() || 0;
                    $('#like').text(likeCount);

                    $('#like-button').on('click', function() {
                        likeCount++;
                        $('#like').text(likeCount);
                        likeStats.set(likeCount);
                    });
                }).catch(function(error) {
                    console.error("Error getting like count: ", error);
                });
            }
        });

        function getPageIdFromDocumentTitle() {
            return document.title.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        }