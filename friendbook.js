const data = new FormData();
data.append("photo", photo);
// Make a POST request to the /photos endpoint of the Unsplash API
fetch("https://api.unsplash.com/photos", {
  method: "POST",
  headers: {
    Authorization: `Client-ID ${Dxw4vAcOz1PP26qKDWCW08HW7pXZWC01wCNxzUfBpFo}` // Replace with your own API key
  },
  body: data
})

.then(response => {
  // Parse the response as JSON
  return response.json();
})
.then(photoData => {
  // Get the URL of the full-sized photo from the response
  const photoUrl = photoData.urls.full;
})
.catch(error => {
  // Handle any errors that occurred during the request
  console.error(error);
});
// Register form
const registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", async event => {
  // Prevent the form from being submitted
  event.preventDefault();

  // Get the user's email and password from the form
  const email = registerForm.elements["email"].value;
  const password = registerForm.elements["password"].value;

  // Send a POST request to the /register API
  const response = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    // If the response is successful, show a success message
    alert("Registration successful!");
  } else {
    // If the response is not successful, show an error message
    alert("Registration failed!");
  }
});
// Login form
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async event => {
  // Prevent the form from being submitted
  event.preventDefault();
  // Get the user's email and password from the form
  const email = loginForm.elements["email"].value;
  const password = loginForm.elements["password"].value;

  // Send a POST request to the /login API
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  if (response.ok) {
    // If the response is successful, show a success message and refresh the page
    alert("Login successful!");
    window.location.reload();
  } else {
    // If the response is not successful, show an error message
    alert("Invalid email or password!");
  }
});
async function updateProfile() {
    // Send a GET request to the /profile API
    const response = await fetch("/profile");
    const profile = await response.json();
  
    // Update the profile section with the user's profile information
    profileName.textContent = profile.name;
    profileBio.textContent = profile.bio;
    profilePicture.src = profile.profile_picture;
  }
  
  updateProfile();
  async function updateFriends() {
    // Send a GET request to the /friends API
    const response = await fetch("/friends");
    const friends = await response.json();
        // Update the friends section with the user's friends' profiles
        for (const friend of friends) {
            const li = document.createElement("li");
            li.textContent = friend.name;
            friendsList.appendChild(li);
          }
        }
        updateFriends();
  

        // Add friend form
        const addFriendForm = document.getElementById("add-friend-form");
        addFriendForm.addEventListener("submit", async event => {
          // Prevent the form from being submitted
          event.preventDefault();
          // Get the email of the friend to add from the form
    const friendEmail = addFriendForm.elements["friend-email"].value;

    // Send a POST request to the /add_friend API
    const response = await fetch("/add_friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ friend_email: friendEmail })
    });
    if (response.ok) {
        // If the response is successful, show a success message and refresh the page
        alert("Friend added successfully!");
        window.location.reload();
      } else {
        // If the response is not successful, show an error message
        alert("Failed to add friend!");
      }
    });
    async function updateFeed() {
        // Send a GET request to the /feed API
        const response = await fetch("/feed");
        const posts = await response.json();
        // Update the feed section with the user's posts and their friends' posts
    for (const post of posts) {
        const li = document.createElement("li");
    
        if (post.photo_url) {
          // If the post has a photo, create an img element and set its src
          const img = document.createElement("img");
          img.src = post.photo_url;
          li.appendChild(img);
        }
