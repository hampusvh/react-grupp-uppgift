import { useState, useEffect } from "react";
import axios from "axios";
import "./AuctionList.css";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);

  // Hämta auktioner från backend
  useEffect(() => {
    axios
      .get(`${API_URL}/auctions`)
      .then((response) => {
        setAuctions(response.data);
      })
      .catch((error) => {
        console.error("Fel vid hämtning av auktioner:", error);
      });
  }, []);

  return (
    <div>
      <h2>Auktioner</h2>
      <div className="auction-list">
        {auctions.map((auction) => (
          <div key={auction._id} className="auction-card">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
