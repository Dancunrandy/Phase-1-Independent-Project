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