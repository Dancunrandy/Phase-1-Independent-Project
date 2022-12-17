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