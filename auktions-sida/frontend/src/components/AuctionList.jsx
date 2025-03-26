import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./Searchbar";
import "./AuctionList.css";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const AuctionList = ({ auctions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredAuctions = auctions.filter((auction) =>
   auction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Hämta auktioner från backend

  return (
    <div>
      <h2>Auktioner</h2>
      <SearchBar onSearch={setSearchTerm} />
      <div className="auction-list">
        {filteredAuctions.map((auction) => (
          <div key={auction._id} className="auction-card">
            <div className="image-placeholder">Bild</div>
            <p>
              <strong>{auction.title}</strong>
            </p>
            <p>Startpris: {auction.price} kr</p>
            {auction.description && <p>Beskrivning: {auction.description}</p>}
            {auction.startDate && (
              <p>
                Start:{" "}
                {new Date(auction.startDate).toLocaleString("sv-SE", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
            {auction.endDate && (
              <p>
                Slut:{" "}
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
            {auction.createdBy && <p>Skapad av: {auction.createdBy}</p>}
            <button className="bid-btn">Lägg bud nu!</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
