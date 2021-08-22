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

// @route     GET api/devices/
// @desc      returns all devices in simple form from the table
// @access    Public
router.get('/', async (req, res) => {
    try {
        const { pageSettings } = req.params;
        // console.log(pageSettings, 'PAGE SETTINGS');
        // const { offset, limit } = JSON.parse(pageSettings);
        // console.log(offset, limit);
        const devices = await Device.findAndCountAll({
            include: ['modifications', 'originalDevice'],
            // limit,
            // offset,
        });
        // TODO: exclude modifications from the list
        //findAndCountAll for pagination
        res.json(devices);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// @route     GET api/devices/:id
// @desc      returns a single device by id including it's modifications if any
// @access    Public
router.get('/:id', async (req, res) => {
    try {
        const device = await Device.findOne({
            where: {
                id: req.params.id,
            },
            include: ['modifications', 'originalDevice'],
        });
        res.json(device);
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

        if (!device) return res.status(404).json({ msg: 'Device not found' });
        fs.unlinkSync(`./uploads/${device.imagePath}`); // delete associated file synchronously
        await Device.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.json({ msg: 'Device was removed with all modifications' });
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
        const { name, shortName, description, additionalInfo, organization, isModification, originalDeviceId } =
            JSON.parse(req.body.deviceInfo);

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
            additionalInfo: additionalInfo || [],
            organization,
            isModification,
            imagePath: req.file ? req.file.filename : '',
            originalDeviceId: isModification ? originalDeviceId : null,
        });

        await device.save();
        res.json({ device }); // Returns the new device that is created in the database
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     PUT api/devices
// @desc      Update a device
// @access    Public
router.put('/:id', upload.single('deviceImage'), async (req, res) => {
    try {
        const {
            name,
            shortName,
            description,
            additionalInfo,
            organization,
            isModification,
            originalDeviceId,
            imagePath,
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

        if (req.file) {
            fs.unlinkSync(`./uploads/${imagePath}`);
        }
        const device = await Device.update(
            {
                name,
                shortName,
                description,
                additionalInfo,
                organization,
                isModification,
                imagePath: req.file ? req.file.filename : imagePath,
                originalDeviceId: isModification ? originalDeviceId : null,
            },
            {
                where: {
                    id: req.params.id,
                },
                returning: true,
            },
        );
        // the return of .update is [rowCount, items[]]. In our case there is only one item updated.
        res.json({ device: device[1][0] }); // Returns the new device that is created in the database
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
