import './Home.css';

function SearchBar() {
    return (
        <div className="search-bar">
            <form className="search">
                <input type="text" className="search" placeholder="Search for word" />
            </form>
        </div>
    );
}

export default SearchBar
