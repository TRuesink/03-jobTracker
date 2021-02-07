const express = require("express");
const morgan = require("morgan");
const cookieSession = require("cookie-session");

require("colors");

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config({ path: "./config/config.env" });
}

// init server
const app = express();

// middlewares
app.use(morgan("dev")); // logging
app.use(express.json()); // body parsing
app.use(
  cookieSession({
    name: "jobTrackerSession",
    keys: [process.env.COOKIE_KEY],
    maxAge: 15 * 24 * 60 * 60 * 1000,
  })
);

// if in production or test production, use react build
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "test_production"
) {
  // Express will serve production assets like our main.js file or main.css file
  app.use(express.static("client/build"));
  // Express will serve the index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// get the port
const PORT = process.env.PORT || 5000;

// listen
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`.yellow);
});
