const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    createdBy: { type: String, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
  });  

const auctionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    highestBid: { type: Number, default: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdBy: { type: String, required: true },
    bids: [bidSchema]
});

module.exports = mongoose.model("Auction", auctionSchema);
