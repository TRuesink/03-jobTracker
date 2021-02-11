const express = require("express");
const router = express.Router();

const {
  getOpportunities,
  createOpportunity,
  editOpportunity,
  getOpportunity,
  deleteOpportunity,
} = require("../controllers/opportunityController");

//model
const Opportunity = require("../models/Opportunity");

//middlewares
const { protect, permissions } = require("../middlewares/auth");
const advancedResults = require("../middlewares/advancedResults");

//routes
router
  .route("/")
  .get(
    protect,
    advancedResults(Opportunity, { path: "user", select: "name" }),
    getOpportunities
  )
  .post(protect, createOpportunity);

router
  .route("/:id")
  .put(protect, editOpportunity)
  .get(protect, getOpportunity)
  .delete(protect, deleteOpportunity);

module.exports = router;
