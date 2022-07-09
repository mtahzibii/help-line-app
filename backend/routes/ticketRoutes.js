const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

// Re-route into note router
router.use('/:ticketId/notes', require('./noteRoutes'));

const {
 createTicket,
 getTickets,
 getTicket,
 deleteTicket,
 updateTicket,
} = require('../controllers/ticketController');
const { addNote } = require('../controllers/noteController');

router.post('/', protect, createTicket);
router.get('/', protect, getTickets);
router.get('/:ticketId', protect, getTicket);
router.delete('/:ticketId', protect, deleteTicket);
router.put('/:ticketId', protect, updateTicket);

module.exports = router;
