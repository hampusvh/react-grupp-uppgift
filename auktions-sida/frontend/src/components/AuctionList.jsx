import { useState } from "react";
import SearchBar from "./Searchbar";
import "./AuctionList.css";

const AuctionList = ({ auctions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const now = new Date();

  const filteredOngoingAuctions = auctions.filter(
    (auction) =>
      new Date(auction.endDate) > now &&
      auction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <button className="bid-btn">Lägg bud nu!</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
