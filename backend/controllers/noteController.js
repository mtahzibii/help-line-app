const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
 //  Check if user exist in DB
 const user = await User.findById(req.user.id);
 if (!user) {
  res.status(401);
  throw new Error('User not found');
 }

 //  Check if ticket is the user's ticket
 const ticketId = await Ticket.findById(req.params.ticketId);

 if (ticketId.user.toString() !== req.user.id) {
  res.status(401);
  throw new Error('User not authorized!');
 }

 const notes = await Note.find({ ticket: req.params.ticketId });
 res.status(200).json(notes);
});

// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
 // Check if user exist in DB
 const user = await User.findById(req.user.id);
 if (!user) {
  res.status(401);
  throw new Error('User not found');
 }

 //  Check if ticket is the user's ticket
 const ticketId = req.params.ticketId;
 const ticket = await Ticket.findById(ticketId);
 if (ticket.user.toString() !== req.user.id) {
  res.status(401);
  throw new Error('User not authorized ');
 }

 const { text } = req.body;

 const note = await Note.create({
  text: req.body.text,
  isStaff: false,
  ticket: req.params.ticketId,
  user: req.user.id,
 });

 res.status(201).json(note);
});

module.exports = { getNotes, addNote };
