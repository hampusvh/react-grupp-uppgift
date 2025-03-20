import { useState } from "react";
import axios from "axios";

const AddAuction = () => {
    const [title, setTitle] = useState("");
    const [startPrice, setStartPrice] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/auctions", { title, startPrice })
            .then(response => {
                setTitle("");
                setStartPrice("");
            })
            .catch(error => {
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
                type="number" 
                placeholder="Startpris" 
                value={startPrice} 
                onChange={(e) => setStartPrice(e.target.value)} 
                required 
            />
            <button type="submit">Lägg till</button>
        </form>
    );
};

export default AddAuction;