// Firebase configuration object
    const firebaseConfig = { 
        apiKey: "AIzaSyDE8YQywhPg1Jstd5CHmO6mUCUibx9cJ6Q",
        authDomain: "tejyul22.firebaseapp.com",
        databaseURL: "https://tejyul22-default-rtdb.firebaseio.com",
        projectId: "tejyul22",
        storageBucket: "tejyul22.appspot.com",
        messagingSenderId: "169996071627",
        appId: "1:169996071627:web:a37b578fdcf39e8c39214e"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    // Helper function to get URL parameter
    function getURLParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Set the name field based on URL parameter 'to' or default to 'Anonymous'
    const guestName = getURLParameter('to') || 'Anonymous';
    document.getElementById('name').value = guestName;

   // Submit form
document.getElementById('attendanceForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const message = document.getElementById('message').value;

    let finalMessage = '';

    // Create the message based on user input
    if (attendance && message) {
        finalMessage = `${name}, ${attendance}\n${message}`;
    } else if (attendance) {
        finalMessage = `${name}, ${attendance}`;
    } else if (message) {
        finalMessage = `${name}\n${message}`;
    }

    // Save to Firebase
    if (finalMessage) {
        const discussionRef = database.ref('discussions');
        discussionRef.push({
            message: finalMessage
        }).then(() => {
            document.getElementById('attendanceForm').reset();
            displayMessage(name, attendance, message); // Call function to display message
        }).catch(error => {
            alert('Error: ' + error.message);
        });
    }
});

// Function to display the message in HTML format
function displayMessage(name, attendance, message) {
    const messageList = document.getElementById('messageList');
    const li = document.createElement('div');
    let content = '';

    if (attendance && message) {
        content = `<div class='row g-0 p-2 bg-dark bg-opacity-25'><div class="nama_undangan col-6 text-start">${name}</div><div class="kehadiran_undangan ${attendance} col-6 text-end">${attendance}</div></div><div class="rounded-bottom bg-dark bg-opacity-75 pesan_undangan col-12 text-start p-3">${message}</div>`;
    } else if (attendance) {
        content = `<div class='row g-0 p-2 bg-dark bg-opacity-25'><div class="nama_undangan col-6 text-start">${name}</div><div class="kehadiran_undangan ${attendance} col-6 text-end">${attendance}</div></div>`;
    } else if (message) {
        content = `<div class='row g-0 p-2 bg-dark bg-opacity-25'><div class="nama_undangan col-12 text-start">${name}</div><div class="rounded-bottom bg-dark bg-opacity-75 pesan_undangan col-12 text-start p-3">${message}</div></div>`;
    }

    li.innerHTML = content; // Set innerHTML for formatting
    li.className = 'row row-cols-1 g-0 pb-4'; // Add Bootstrap class for list items
    messageList.appendChild(li);
}

// Load discussions
const discussionRef = database.ref('discussions');
discussionRef.on('child_added', function (data) {
    const [name, attendanceMessage] = data.val().message.split(', ');
    const [attendance, message] = attendanceMessage ? attendanceMessage.split('\n') : ['', ''];
    displayMessage(name, attendance, message);
});
