import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import AuctionList from "./components/AuctionList";
import AddAuction from "./components/AddAuction";
import Header from "./components/Header";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = () => {
    axios
      .get(`${API_URL}/api/auctions`)
      .then((response) => setAuctions(response.data))
      .catch((error) => console.error("Fel vid hämtning:", error));
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<AuctionList auctions={auctions} />} />
        <Route
          path="/closed-auctions"
          element={<AuctionList auctions={auctions} showClosed={true} />}
        />
        <Route
          path="/add-auction"
          element={<AddAuction onAuctionCreated={fetchAuctions} />}
        />
      </Routes>
    </div>
  );
}

export default App;
