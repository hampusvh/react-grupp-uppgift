import { useState } from "react";
import SearchBar from "./SearchBar";
import "./AuctionList.css";

const AuctionList = ({ auctions, showClosed = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const now = new Date();

  const filteredAuctions = auctions.filter((auction) => {
    const auctionEnds = new Date(auction.endDate);
    const isClosed = auctionEnds <= now;
    const matchesSearch = auction.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return showClosed ? isClosed && matchesSearch : !isClosed && matchesSearch;
  });

  console.log("Auktioner från backend:", auctions);
  return (
    <div>
<h2 className="auction-main-title">Auktioner</h2>

<div className="searchbar-wrapper">
  <SearchBar onSearch={setSearchTerm} />
</div>


      <h2 className="auctions-title">
        {showClosed ? "Avslutade auktioner" : "Pågående auktioner"}
      </h2>

      <div className="auction-list">
        {filteredAuctions.map((auction) => (
          <div key={auction._id} className="auction-card">
            <div className="image-placeholder">Bild</div>
            <p>
              <strong className="card-title">{auction.title}</strong>
            </p>
            <p className="item-price">
              <strong>Utropspris:</strong> {auction.price} kr
            </p>
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
            {!showClosed && <button className="bid-btn">Lägg bud nu!</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
