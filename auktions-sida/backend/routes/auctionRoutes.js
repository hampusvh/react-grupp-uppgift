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

// Hämta bud
router.get('/:id/bids', async (req, res) => {
    const auctionId = req.params.id;
    try {
        const auction = await Auction.findById(auctionId)
        if (!auction) return res.status(404).json({ error: 'Auction not found' });
        res.status(200).json({ bids: auction.bids });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Lägg till bud
router.post('/:id/bids', async (req, res) => {
    const auctionId = req.params.id;
    const { createdBy, amount } = req.body;
    try {
        const auction = await Auction.findById(auctionId);
        if (!auction) return res.status(404).json({ error: 'Auction not found' });
        auction.bids.push({ createdBy, amount });
        await auction.save();
        res.status(200).json({ message: 'Bid added', auction });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
