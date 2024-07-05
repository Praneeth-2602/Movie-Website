import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetchData(apiEndpoint) {
    const [alldata, setAlldata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allMovies, setAllMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                const res = await axios.get('/api/getmovies');
                const movies = res.data;
                console.log("Fetched All Movies:", movies); // Log fetched all movies
                setAllMovies(movies);
            } catch (error) {
                console.error("Error fetching all movies: ", error);
                setError(error);
            }
        };

        fetchAllMovies();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(apiEndpoint);
                const data = res.data;
                console.log("Fetched Data:", data); // Log fetched data
                setAlldata(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching the data: ", error);
                setError(error);
                setLoading(false);
            }
        };

        if (apiEndpoint) {
            fetchData();
        }
    }, [apiEndpoint]);

    return { alldata, allMovies, loading, error };
}

export default useFetchData;
