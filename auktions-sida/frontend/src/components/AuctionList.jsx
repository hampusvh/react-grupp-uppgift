import { useState } from "react";
import SearchBar from "./Searchbar";
import "./AuctionList.css";

const AuctionList = ({ auctions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bids, setBids] = useState({});
  const now = new Date();

  const filteredOngoingAuctions = auctions.filter(
    (auction) =>
      new Date(auction.endDate) > now &&
      auction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("Auktioner från backend:", auctions);

  const handleBidChange = (auctionId, value) => {setBids((prevBids) => ({
    ...prevBids, 
    [auctionId]: value,
  
  }));
  };

  const submitBid = async (auctionId, auctionPrice) => {
    const bidAmount = parseFloat(bids[auctionId]);

    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      alert("Ange ett giltigt bud");
      return;
    }

    if (bidAmount < auctionPrice) {
      alert(`Ditt bud måste vara minst ${auctionPrice} kr!`);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/bids`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auctionId, amount: bidAmount }),
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
    <div>
      <h2>Auktioner</h2>
      <SearchBar onSearch={setSearchTerm} />

      <h2 className="auctions-title">Pågående auktioner</h2>

      <div className="auction-list">
        {filteredOngoingAuctions.map((auction) => (
          <div key={auction._id} className="auction-card">
            <div className="image-placeholder">Bild</div>
            <p>
              <strong className="card-title">{auction.title}</strong>
            </p>
            <p className="item-price">
              <strong>Utropspris:</strong> {auction.price} kr
            </p>
            {auction.highestBid && (
              <p>
                <strong>Högsta bud:</strong> {auction.highestBid} kr
              </p>
            )}
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
            <input 
            type="number"
            className="bid-input"
            placeholder="Ange ditt bud"
            value={bids[auction._id] || ""} 
            onChange={(e) => handleBidChange(auction._id, e.target.value)}
            />
            <button className="bid-btn" onClick={() => submitBid(auction._id, auction.price)}>Lägg bud nu!</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
