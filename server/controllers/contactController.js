const ErrorResponse = require("../utils/errorResponse");
const Contact = require("../models/Contact");
const Opportunity = require("../models/Opportunity");
const asyncHandler = require("../middlewares/async");

// @desc get a list of contacts
// @route GET /api/v1/opportunities/:oppId/contacts
// @access PRIVATE
exports.getContacts = asyncHandler(async (req, res, next) => {
  if (req.params.oppId) {
    const contacts = await Contact.find({
      opportunity: req.params.oppId,
      user: req.user.id,
    });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc create a contact
// @route POST /api/v1/opportunities/:oppId/contacts
// @access PRIVATE
exports.createContact = asyncHandler(async (req, res, next) => {
  req.body.opportunity = req.params.oppId;
  req.body.user = req.user.id;

  const opp = await Opportunity.findById(req.params.oppId);

  if (!opp) {
    return next(
      new ErrorResponse(`opportunity not found with id of ${req.params.id}`)
    );
  }

  if (opp.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `user does not own opportunity with id of ${req.params.oppId}`
      )
    );
  }

  const newContact = await Contact.create(req.body);

  res.status(201).json({
    success: true,
    data: newContact,
  });
});

// @desc get a single contact
// @route GET /api/v1/contacts/:id
// @access PRIVATE
exports.getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(
      new ErrorResponse(`contact with id of ${req.params.id} does not exist`)
    );
  }

  if (contact.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`user not authorized to access contact`));
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

// @desc edit a contact
// @route GET /api/v1/contacts/:id
// @access PRIVATE
exports.editContact = asyncHandler(async (req, res, next) => {
  let contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(
      new ErrorResponse(`contact with id of ${req.params.id} does not exist`)
    );
  }

  if (contact.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`user not authorized to access contact`));
  }

  contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json({
    success: true,
    data: contact,
  });
});

// @desc delete a contact
// @route GET /api/v1/contact/:id
// @access PRIVATE
exports.deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(
      new ErrorResponse(`contact with id of ${req.params.id} does not exist`)
    );
  }

  if (contact.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`user not authorized to delete contact`));
  }

  await contact.remove();

  res.status(200).json({
    success: true,
    data: [],
  });
});