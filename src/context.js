import React, {useContext, createContext, useState, useEffect} from 'react';

// query=react&hitsPerPage=20

// title, url, points, author, num_comments, objectID
const AppContext = createContext();
const url = 'https://hn.algolia.com/api/v1/search?';

const AppProvider = ({ children }) => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('react');
    const [totalPage, setTotalPages] = useState(0);
    const [error, setError] = useState(false);

    const removeStory = (id) => {
        const newStories = stories.filter(item => item.objectID !== id);
        setStories(newStories);
    }

    const handlePage = (num) => {
        let newPage = page + num;
        if (newPage > totalPage){
            newPage = 1;
        }
        if (newPage < 1){
            newPage = totalPage ;
        }

        setPage(newPage);
    }

    const fetchData =async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await fetch(`${url}query=${query}&hitsPerPage=20&page=${page}`);
            const data = await response.json();
            console.log(data);
            if (data.hits.length > 0){
                setStories(data.hits.map((item) => {
                    const {title, url, points, author, num_comments, objectID} = item;
                    return {title, url, points, author, num_comments, objectID};
                }));
                setTotalPages(data.nbPages);
                setLoading(false)
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, [query, page])
   return <AppContext.Provider value={{loading, stories, query, setQuery, totalPage, error, removeStory, page ,handlePage}}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppProvider}