const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const {
 createTicket,
 getTickets,
 getTicket,
 deleteTicket,
} = require('../controllers/ticketController');

router.post('/', protect, createTicket);
router.get('/', protect, getTickets);
router.get('/:ticketId', protect, getTicket);
router.delete('/:ticketId', protect, deleteTicket);

module.exports = router;
