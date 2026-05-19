import { Search } from "lucide-react";

import "./searchbar.css";

function SearchBar({
    value,
    onChange,
    placeholder
}) {

    return (

        <div className="search-container">

            <Search size={18} />

            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />

        </div>
    );
}

export default SearchBar;

