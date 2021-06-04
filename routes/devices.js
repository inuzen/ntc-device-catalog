const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { Device } = require('../config/db');
const { Op } = require('sequelize');

// @route     POST api/devices/allowEditing
// @desc      checks password for allowing editing. Shouldn't be here but whatever
// @access    Public

router.post('/allowEditing', async (req, res) => {
    try {
        const { password } = req.body;

        if (password === 'qwerty123') {
            res.json(true);
        } else {
            res.json(false);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/', async (req, res) => {
    try {
        const devices = await Device.findAll({ include: ['modifications', 'originalDevice'] });
        //findAndCountAll for pagination
        res.json(devices);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/getDevice/:id', async (req, res) => {
    try {
        const devices = await Device.findAll({
            where: {
                id: req.params.id,
            },
            include: ['modifications', 'originalDevice'],
        });
        //findAndCountAll for pagination
        res.json(devices);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const device = await Device.findOne({
            where: {
                id: req.params.id,
            },
        });
        console.log(device);
        if (!device) return res.status(404).json({ msg: 'Device not found' });

        await Device.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.json({ msg: 'Device was removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     POST api/devices
// @desc      Create a device
// @access    Public
router.post('/', async (req, res) => {
    try {
        const {
            name,
            short_name,
            description,
            dimensions,
            weight,
            voltage,
            supply,
            additionalInfo,
            amountInSupply,
            organization,
            comments,
            isModification,
            imagePath,
            originalDeviceId,
        } = req.body;

        if (isModification) {
            if (!originalDeviceId) {
                res.status(400).send('Device is marked as a modification but doesnt contain original ID');
            }
        }

        if (!name) {
            res.send(400).send('One or more of the required fields is missing');
        }
        if (organization !== 'ntc' && organization !== 'st') {
            res.status(400).send('Invalid organization');
        }

        const device = await Device.create({
            name,
            short_name,
            description,
            dimensions,
            weight,
            voltage,
            supply,
            additionalInfo,
            amountInSupply,
            organization,
            comments,
            isModification,
            imagePath,
            originalDeviceId: isModification ? originalDeviceId : null,
        });

        // await user.save();
        res.json({ device }); // Returns the new user that is created in the database
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
