module.exports = {
    entry: "./index.js",
    output: {
      filename: "bundle.js"
    }
  };
  const response = await fetch("/feed");
const feedData = await response.json();
