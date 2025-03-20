import { useState, useEffect } from "react";
import axios from "axios";

const AuctionList = () => {
    const [auctions, setAuctions] = useState([]);

    // Hämta auktioner från backend
    useEffect(() => {
        axios.get("http://localhost:5000/auctions")
            .then(response => {
                setAuctions(response.data);
            })
            .catch(error => {
                console.error("Fel vid hämtning av auktioner:", error);
            });
    }, []);

    return (
        <div>
            <h2>Auktioner</h2>
            <ul>
                {auctions.map((auction) => (
                    <li key={auction.id}>
                        <strong>{auction.title}</strong> - Startpris: {auction.startPrice} kr
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuctionList;