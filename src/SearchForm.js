import React from 'react';
import {useGlobalContext} from './context';

const SearchForm = () => {
    const {query, setQuery} = useGlobalContext();
    return ( 
        <section className='search-from-container'>
            <h1>Search Hacker News</h1>
            <form className='search-form'>
                <input 
                type='text' placeholder='type' className='search-input' 
                value={query} onChange={(e) => setQuery(e.target.value)}
                />
            </form>
        </section>
     );
}
 
export default SearchForm;