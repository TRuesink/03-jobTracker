const express = require("express");
const passport = require("passport");

const {
  authGoogle,
  authGoogleCallback,
  googleLogout,
  authGoogleToken,
} = require("../controllers/authController");

const router = express.Router();

router.route("/google").get(authGoogle);
router
  .route("/google/callback")
  .get(passport.authenticate("google"), authGoogleCallback);

router
  .route("/google/token")
  .get(passport.authenticate("google-token"), authGoogleToken);

router.route("/logout").get(googleLogout);

module.exports = router;
