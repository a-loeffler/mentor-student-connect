import {useState} from 'react';



const SearchBar = () => {

    const [searchText, setSearchText] = useState("");

    const searchAction = (e) => {
        e.preventDefault();

        //TO DO:  get fetch to the backend and redirect to results
    }

    return (
        <div>
            <form onSubmit={e => searchAction(e)}>
                <input type="text" className="searchbar-field" value={searchText} onChange={e => setSearchText(e.target.value)} default="search"></input>
            </form>
        </div>
    )
}

export default SearchBar;
