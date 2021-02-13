const express = require("express");

const router = express.Router();

const { getNotes } = require("../controllers/noteController");

//model
const Note = require("../models/Note");

//middlewares
const { protect, permissions } = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResults");

router.route("/").get(protect, advancedResults(Note, true), getNotes);

module.exports = router;
