import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./Searchbar";
import "./AuctionList.css";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const AuctionList = ({ auctions }) => {
  // Hämta auktioner från backend

  return (
    <div>
      <h2 className="auctions-title">Pågående auktioner</h2>
      <div className="auction-list">
        {auctions.map((auction) => (
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
