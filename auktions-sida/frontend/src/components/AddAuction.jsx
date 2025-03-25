import { useState } from "react";
import axios from "axios";

const AddAuction = ({ onAuctionCreated }) => {
  const [title, setTitle] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [creator, setCreator] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/auctions/`, {
        title,
        description,
        price: startPrice,
        startDate,
        endDate,
        createdBy: creator,
      })
      .then((response) => {
        setTitle("");
        setStartPrice("");
        if (onAuctionCreated) {
          onAuctionCreated();
        }
      })
      .catch((error) => {
        console.error("Fel vid skapande av auktion:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Lägg till Auktion</h2>
      <input
        type="text"
        placeholder="Auktionsnamn"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Beskrivning"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Startpris"
        value={startPrice}
        onChange={(e) => setStartPrice(Number(e.target.value))}
        required
      />
      <input
        type="date"
        placeholder="Slut datum"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Skapad av"
        value={creator}
        onChange={(e) => setCreator(e.target.value)}
        required
      />
      <button type="submit">Lägg till</button>
    </form>
  );
};

export default AddAuction;
