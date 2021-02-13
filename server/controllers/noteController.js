const ErrorResponse = require("../utils/errorResponse");
const Note = require("../models/Note");
const asyncHandler = require("../middlewares/async");

// @desc get a list of notes
// @route GET /api/v1/opportunities/:oppId/notes
// @access PRIVATE
exports.getNotes = asyncHandler(async (req, res, next) => {
  if (req.params.oppId) {
    const notes = await Note.find({ opportunity: req.params.oppId });
    return res.status(200).json({
      success: true,
      data: notes,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc create a note
// @route POST /api/v1/opportunities/:oppId/notes
// @access PRIVATE

// @desc get single note
// @route GET /api/v1/notes/:id
// @access PRIVATE

// @desc Edit a note
// @route PUT /api/v1/notes/:id
// @access PRIVATE

// @desc Delete a note
// @route DELETE /api/v1/notes/:id
// @access PRIVATE
