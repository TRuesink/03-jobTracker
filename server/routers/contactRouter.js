const express = require("express");

const router = express.Router({ mergeParams: true });

const {
  getContacts,
  createContact,
  getContact,
  editContact,
  deleteContact,
} = require("../controllers/contactController");

//model
const Contact = require("../models/Contact");

//middlewares
const { protect, permissions } = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResults");

router
  .route("/")
  .get(protect, advancedResults(Contact, true), getContacts)
  .post(protect, createContact);

router
  .route("/:id")
  .get(protect, getContact)
  .put(protect, editContact)
  .delete(protect, deleteContact);

module.exports = router;
