import { useState } from 'react'
import './App.css'
import AuctionList from "./components/AuctionList"; 
import AddAuction from "./components/AddAuction";

function App() {
    return (
        <div>
            <h1>Auktionssidan</h1>
            <AddAuction />  {/* Formulär för att lägga till auktioner */}
            <AuctionList /> {/* Lista med befintliga auktioner */}
        </div>
    );
}

export default App;