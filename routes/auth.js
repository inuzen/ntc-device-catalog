const express = require('express');
const router = express.Router();

// @route POST api/auth
// @desc check the password to unlock editing
// @access Private
router.post('/', async (req, res) => {
    try {
        const { password } = req.body;
        if (password === '123') {
            res.json(true);
        } else {
            res.json(false);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
