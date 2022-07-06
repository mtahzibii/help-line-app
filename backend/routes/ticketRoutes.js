const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const {
 createTicket,
 getTickets,
 getTicket,
} = require('../controllers/ticketController');

router.post('/', protect, createTicket);
router.get('/', protect, getTickets);
router.get('/:ticketId', protect, getTickets);

module.exports = router;
