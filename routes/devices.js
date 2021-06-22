const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { Device } = require('../config/db');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});
const upload = multer({ storage: multerStorage });

// @route     POST api/devices/allowEditing
// @desc      checks password for allowing editing. Shouldn't be here but whatever
// @access    Public
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
router.post('/', upload.single('deviceImage'), async (req, res) => {
    try {
        const {
            name,
            shortName,
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
            originalDeviceId,
        } = JSON.parse(req.body.deviceInfo);

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
            shortName,
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
            imagePath: req.file.filename,
            originalDeviceId: isModification ? originalDeviceId : null,
        });

        await device.save();
        res.json({ device }); // Returns the new user that is created in the database
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/imageTest', upload.single('deviceImage'), (req, res) => {
    try {
        console.log(req.file);
        console.log(req.body);
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, './uploads/image.png');

        if (path.extname(req.file.originalname).toLowerCase() === '.png') {
            fs.rename(tempPath, targetPath, (err) => {
                res.status(200).contentType('text/plain').end('File uploaded!');
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
