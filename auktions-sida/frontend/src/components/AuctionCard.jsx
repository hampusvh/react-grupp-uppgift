import { useState } from "react";
import CountdownTimer from "./Countdown";
import "./AuctionCard.css"

const AuctionCard = ({ auction, showClosed }) => {
  const [bids, setBids] = useState({});

  const handleBidChange = (auctionId, value) => {
    setBids((prevBids) => ({
      ...prevBids,
      [auctionId]: value,

    }));
  };

  const submitBid = async (auctionId, auctionPrice) => {
    try {
      const bidAmount = parseFloat(bids[auctionId]);

      if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
        alert("Ange ett giltigt bud");
        return;
      }

      if (bidAmount < auctionPrice) {
        alert(`Ditt bud måste vara minst ${auctionPrice} kr!`);
        return;
      }

      const createdBy = "amanda"

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auctions/${auctionId}/bids`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auctionId, amount: bidAmount, createdBy }),
      });

      if (!response.ok) {
        throw new Error("Fel vid budgivning");
      }

      alert(`Ditt bud på ${bidAmount} kr har lagts!`);
      setBids((prev) => ({ ...prev, [auctionId]: "" }));
    } catch (error) {
      console.error(error);
      alert("Kunde inte lägga bud, försök igen.");
    }
  };

  return (
    <div key={auction.id} className="auction-card">
      <div className="image-placeholder">Bild</div>
      <p>
        <strong className="card-title">{auction.title}</strong>
      </p>
      <p className="item-price">
        <strong>{auction.bids.length > 0
          ? `${auction.bids[auction.bids.length - 1].amount} kr`
          : auction.price + ' kr'}</strong>
      </p>
      <strong>Utropspris:</strong><p>{auction.price} kr</p>
      {auction.description && (
        <p>
          <strong>Beskrivning:</strong> {auction.description}
        </p>
      )}
      {auction.endDate && (
        <p>
          <strong>Slut:</strong>{" "}
          {new Date(auction.endDate).toLocaleString("sv-SE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      )}
      {auction.createdBy && (
        <p>
          <strong>Skapad av:</strong> {auction.createdBy}
        </p>
      )}
      <CountdownTimer endDate={auction.endDate} />
      {!showClosed &&
        <><input
          type="number"
          className="bid-input"
          placeholder="Ange ditt bud"
          value={bids[auction._id] || ""}
          onChange={(e) => handleBidChange(auction._id, e.target.value)}
        />
          <button className="bid-btn" onClick={() => submitBid(auction._id, auction.price)}>Lägg bud nu!</button>
        </>}
    </div>
  );
};

export default AuctionCard;

