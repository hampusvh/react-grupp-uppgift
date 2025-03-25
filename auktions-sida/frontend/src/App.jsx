import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import AuctionList from "./components/AuctionList";
import AddAuction from "./components/AddAuction";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = () => {
    axios
      .get(`${API_URL}/auctions`)
      .then((response) => setAuctions(response.data))
      .catch((error) => console.error("Fel vid hämtning:", error));
  };

  return (
    <div>
      <h1>Auktionssidan</h1>
      <AddAuction onAuctionCreated={fetchAuctions} />
      <AuctionList auctions={auctions} />
    </div>
  );
}

export default App;
