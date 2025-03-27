import { useState } from "react";


const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <input
            type="text"
            className="search-bar"
            placeholder="Sök auktioner..."
            value={searchTerm}
            onChange={handleChange}
        />
    );
};

export default SearchBar;