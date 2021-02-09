const express = require("express");
const passport = require("passport");

const {
  authGoogle,
  authGoogleCallback,
  googleLogout,
} = require("../controllers/authController");

const router = express.Router();

router.route("/google").get(authGoogle);
router
  .route("/google/callback")
  .get(passport.authenticate("google"), authGoogleCallback);

router.route("/logout").get(googleLogout);

module.exports = router;
