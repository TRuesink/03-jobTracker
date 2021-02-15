const express = require("express");
const router = express.Router();
const noteRouter = require("./noteRouter");
const contactRouter = require("./contactRouter");

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

//redirect
router.use("/:oppId/notes", noteRouter);
router.use("/:oppId/contacts", contactRouter);

//routes
router
  .route("/")
  .get(
    protect,
    advancedResults(Opportunity, true, { path: "user", select: "name" }),
    getOpportunities
  )
  .post(protect, createOpportunity);

router
  .route("/:id")
  .put(protect, editOpportunity)
  .get(protect, getOpportunity)
  .delete(protect, deleteOpportunity);

module.exports = router;
