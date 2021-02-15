const ErrorResponse = require("../utils/errorResponse");
const Contact = require("../models/Contact");
const Meeting = require("../models/Meeting");
const asyncHandler = require("../middlewares/async");

// @desc get a list of meetings
// @route GET /api/v1/contacts/:contactId/meetings
// @access PRIVATE
exports.getMeetings = asyncHandler(async (req, res, next) => {
  if (req.params.contactId) {
    const meetings = await Meeting.find({
      contact: req.params.contactId,
      user: req.user.id,
    });
    res.status(200).json({
      success: true,
      count: meetings.length,
      data: meetings,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc create a meetings
// @route POST /api/v1/contacts/:contactId/meetings
// @access PRIVATE
exports.createMeeting = asyncHandler(async (req, res, next) => {
  req.body.contact = req.params.contactId;
  req.body.user = req.user.id;

  const contact = await Contact.findById(req.params.contactId);

  if (!contact) {
    return next(
      new ErrorResponse(`contact not found with id of ${req.params.contactId}`)
    );
  }

  if (contact.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `user does not own contact with id of ${req.params.contactId}`
      )
    );
  }

  const newMeeting = await Meeting.create(req.body);

  res.status(201).json({
    success: true,
    data: newMeeting,
  });
});

// @desc get a single meeting
// @route GET /api/v1/meetings/:id
// @access PRIVATE
exports.getMeeting = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.findById(req.params.id);

  if (!meeting) {
    return next(
      new ErrorResponse(`meeting with id of ${req.params.id} does not exist`)
    );
  }

  if (meeting.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`user not authorized to access meeting`));
  }

  res.status(200).json({
    success: true,
    data: meeting,
  });
});

// @desc edit a meeting
// @route GET /api/v1/meetings/:id
// @access PRIVATE
exports.editMeeting = asyncHandler(async (req, res, next) => {
  let meeting = await Meeting.findById(req.params.id);

  if (!meeting) {
    return next(
      new ErrorResponse(`meeting with id of ${req.params.id} does not exist`)
    );
  }

  if (meeting.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`user not authorized to access meeting`));
  }

  meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    success: true,
    data: meeting,
  });
});

// @desc delete a meeting
// @route GET /api/v1/meetings/:id
// @access PRIVATE
exports.deleteMeeting = asyncHandler(async (req, res, next) => {
  const meeting = await Meeting.findById(req.params.id);

  if (!meeting) {
    return next(
      new ErrorResponse(`meeting with id of ${req.params.id} does not exist`)
    );
  }

  if (meeting.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`user not authorized to delete meeting`));
  }

  await meeting.remove();

  res.status(200).json({
    success: true,
    data: [],
  });
});
