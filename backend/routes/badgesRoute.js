const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgesController');

router.post('/', badgeController.createBadge);
router.get('/', badgeController.getBadges);
router.get('/:id', badgeController.getBadge);
router.put('/:id', badgeController.updateBadge);
router.delete('/:id', badgeController.deleteBadge);

module.exports = router;


