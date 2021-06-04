const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { Folder, Document } = require('../config/db');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
    try {
        const folders = await Folder.findAll();

        res.json(folders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
router.get('/folderWithDocuments', async (req, res) => {
    try {
        const folders = await Folder.findAll({
            include: Document,
        });

        res.json(folders);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
router.get('/folderFull/:id', async (req, res) => {
    try {
        const folder = await Folder.findOne({
            where: {
                id: req.params.id,
            },
            include: [Document, Folder],
        });
        res.json(folder);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
//returns and array of matching folder IDs
router.post('/findFolder', async (req, res) => {
    try {
        const { name, designation, year, number, format } = req.body;

        let searchObj = {};
        if (name) {
            searchObj.name = { [Op.substring]: name.toLowerCase() };
            searchObj.short_name = { [Op.substring]: name.toLowerCase() };
        }
        // if (short_name) {
        //     searchObj.short_name = { [Op.substring]: short_name.toLowerCase() };
        // }
        if (designation) {
            searchObj.designation = designation; // { [Op.substring]: designation.toLowerCase() };
        }
        if (year) {
            searchObj.year = year;
        }
        if (number) {
            searchObj.number = { [Op.substring]: number.toLowerCase() };
        }
        if (format) {
            searchObj.format = format;
        }

        const folders = await Folder.findAll({
            where: searchObj,
        });

        const high = folders.reduce(
            (acc, curr) => {
                acc.folders.push(curr.id);
                acc.shelves.push(curr.ShelfId);
                if (curr.isSubFolder) {
                    acc.folders.push(curr.parentFolderId);
                }
                return acc;
            },
            {
                folders: [],
                shelves: [],
            },
        );

        res.json({ folders: [...new Set(high.folders)], shelves: [...new Set(high.shelves)] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// @route     POST api/folders
// @desc      Create a folder
// @access    Public
router.post('/', async (req, res) => {
    try {
        const { name, short_name, designation, year, number, format, isSubFolder, shelfID, parentFolderId } = req.body;

        if (isSubFolder) {
            if (!parentFolderId) {
                res.status(400).send('Folder is marked as Subfolder but doesnt contain parent ID');
            }
        }

        if (!name || !designation || !year || !number || !format || !shelfID) {
            res.send(400).send('One or more of the required fields is missing');
        }
        if (format !== 'a3' && format !== 'a4') {
            res.status(400).send('Invalid format');
        }

        const folder = await Folder.create({
            name: name.toLowerCase(),
            short_name: short_name.toLowerCase(),
            designation, //: designation.toLowerCase(),
            year,
            number: number.toLowerCase(),
            format: format.toLowerCase(),
            isSubFolder,
            parentFolderId: isSubFolder ? parentFolderId : null,
            ShelfId: shelfID,
        });

        // await user.save();
        res.json({ folder }); // Returns the new user that is created in the database
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let folder = await Folder.findOne({
            where: {
                id: req.params.id,
            },
        });
        // console.log(folder);
        if (!folder) return res.status(404).json({ msg: 'Folder not found' });

        await Document.destroy({
            where: {
                FolderId: req.params.id,
            },
        });
        await Folder.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.json({ msg: 'Folder removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route PUT api/contacts/:id
// @desc Update contact
// @access Private
router.put('/:id', async (req, res) => {
    const { name, short_name, designation, year, number, format, isSubFolder, ShelfId, parentFolderId } = req.body;

    try {
        if (isSubFolder) {
            if (!parentFolderId) {
                res.status(400).send('Folder is marked as Subfolder but doesnt contain parent ID');
            }
        }

        if (!name || !designation || !year || !number || !format) {
            res.send(400).send('One or more of the required fields is missing');
        }
        if (format !== 'a3' && format !== 'a4') {
            res.status(400).send('Invalid format');
        }

        const folder = await Folder.update(
            {
                name,
                short_name,
                designation,
                year,
                number,
                format,
                isSubFolder,
                parentFolderId: isSubFolder ? parentFolderId : null,
                ShelfId: ShelfId,
            },
            {
                where: {
                    id: req.params.id,
                },
            },
        );

        res.json({ folder }); // Returns the updated folder that is created in the database
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
