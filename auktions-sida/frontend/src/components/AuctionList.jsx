import { useState } from "react";
import SearchBar from "./SearchBar";
import "./AuctionList.css";
import AuctionCard from "./AuctionCard";

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
        {filteredAuctions.map((auction) => {
          const auctionEnds = new Date(auction.endDate);
          const isClosed = auctionEnds <= now;
          return <AuctionCard auction={auction} isClosed={isClosed} />}
        )}
      </div>
    </div>
  );
};

export default AuctionList;
