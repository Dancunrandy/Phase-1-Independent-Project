const createPostForm = document.getElementById("create-post-form");

if (createPostForm && createPostForm.elements) {
  const photo = createPostForm.elements["photo"].files[0];

  if (photo) {
    // Create a FormData object to hold the photo data
    const data = new FormData();
    data.append("photo", photo);
    // Make a POST request to the /photos endpoint of the Unsplash API
    fetch("https://api.unsplash.com/photos", {
      method: "POST",
      headers: {
        Authorization: Dxw4vAcOz1PP26qKDWCW08HW7pXZWC01wCNxzUfBpFo // Replace with your own API key
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
  }
}

const registerForm = document.getElementById("register-form");

if (registerForm) {
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
}
// Login form
const loginForm = document.getElementById("login-form");

if (loginForm) {
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
}


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

if (addFriendForm) {
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
}

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
      if (post.text) {
        // If the post has text, create a p element and set its text
        const p = document.createElement("p");
        p.textContent = post.text;
        li.appendChild(p);
        }
        if (post.user) {
          // If the post has a user, create a span element and set its text
          const span = document.createElement("span");
          span.textContent = post.user;
          li.appendChild(span);
        }
        
        feedList.appendChild(li);
      }
    }
    
    updateFeed();
// Create post form
if (createPostForm) {
  createPostForm.addEventListener("submit", async event => {
    // Prevent the form from being submitted
    event.preventDefault();

    // Get the text and photo from the form
    const text = createPostForm.elements["text"].value;
    const photo = createPostForm.elements["photo"].files[0];

  // If a photo was selected, upload it to Unsplash and get its URL
  let photoUrl = null;
  if (photo) {
    const data = new FormData();
    data.append("photo", photo);
    const response = await fetch("https://api.unsplash.com/photos", {
      method: "POST",
      headers: {
        Authorization: Dxw4vAcOz1PP26qKDWCW08HW7pXZWC01wCNxzUfBpFo
      },
      body: data
    });
    const photoData = await response.json();
    photoUrl = photoData.urls.full;
  }

  // Send a POST request to the /create_post API
  const response = await fetch("/create_post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text, photo_url: photoUrl })
  });

  if (response.ok) {
    // If the response is successful, show a success message and refresh the page
    alert("Post created successfully!");
    window.location.reload();
  } else {
    // If the response is not successful, show an error message
    alert("Failed to create post!");
  }
});
}
const express = require('express');

const app = express();

app.get('/feed', (req, res) => {
  // Connect to the MongoDB database
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect((err) => {
    if (err) {
      console.error(err);
      res.status(500).send();
      return;
    }

    // Connected successfully
    console.log('Connected to MongoDB');

    // Retrieve the feed data from the database
    const collection = client.db('my_database').collection('feed');
    collection.find({}).toArray((err, docs) => {
      if (err) {
        console.error(err);
        res.status(500).send();
        return;
      }

      // Send the results as a JSON response
      res.json(docs);
    });
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Login function
async function login(email, password) {
  // Send a POST request to the /login API with the email and password
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  if (response.ok) {
    // If the response is successful, return true
    return true;
  } else {
    // If the response is not successful, return false
    return false;
  }
}

// Fetch the data
fetch('/data.json')
  .then(response => response.json())
  .then(data => {
    // Do something with the data
  })
  .catch(error => {
    console.error(error);
  });

// Login function
function login(email, password) {
  // Check if the email and password match a user in the data object
  const user = data.users.find(
    user => user.email === email && user.password === password
  );
  if (user) {
    // Login successful
    return true;
  } else {
    // Login failed
    return false;
  }
}
// Register function (continued)
function register(email, password, name, bio, picture) {
  // Check if the email is already in use
  const existingUser = data.users.find(user => user.email === email);
  if (existingUser) {
    // Email is already in use
    return false;
  } else {
    // Add the new user to the data object
    data.users.push({
      email: email,
      password: password,
      name: name,
      bio: bio,
      picture: picture,
      friends: [],
      posts: []
    });
    // Registration successful
    return true;
  }
}

// Post function
function post(email, text, photo) {
  // Find the user with the specified email
  const user = data.users.find(user => user.email === email);
  if (user) {
    // Add the post to the user's posts
    user.posts.push({
      text: text,
      photo: photo
    });
    // Post successful
    return true;
  } else {
    // User not found
    return false;
  }
}
fetch('https://api.unsplash.com/photos/random?count=5 ')
  .then(response => response.json())
  .then(data => {
    // process the data and create a summary
    const summary = {
      totalPhotos: data.length,
      totalLikes: data.reduce((total, photo) => total + photo.likes, 0),
      totalComments: data.reduce((total, photo) => total + photo.comments, 0)
    };

    console.log(summary);
  })
  .catch(error => {
    // handle the error here
  });

