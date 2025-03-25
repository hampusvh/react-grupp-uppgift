const express = require('express');
const Auction = require('../models/Auction');
const router = express.Router();

// Hämta alla auktioner
router.get('/', async (req, res) => {
    try {
        const auctions = await Auction.find();
        res.json(auctions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching auctions", error });
    }
});

// Hämta alla pågående auktioner
router.get('/active', async (req, res) => {
    try {
        const auctions = await Auction.find({
            startDate: { $lte: new Date() },
            endDate: { $gt: new Date() }
        });
        res.json(auctions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching active auctions", error });
    }
});

// Hämta alla avslutade auktioner
router.get('/closed', async (req, res) => {
    try {
        const auctions = await Auction.find({
            endDate: { $lte: new Date() }
        });
        res.json(auctions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching closed auctions", error });
    }
});

// Skapa en ny auktion
router.post('/', async (req, res) => {
    try {
        const { title, description, price, startDate, endDate, createdBy } = req.body;
        const auction = new Auction({ title, description, price, startDate, endDate, createdBy });
        await auction.save();
        res.status(201).json(auction);
    } catch (error) {
        res.status(400).json({ message: "Error creating auction", error });
    }
});

module.exports = router;
