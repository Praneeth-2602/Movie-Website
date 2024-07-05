import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetchData(apiEndpoint) {
    const [alldata, setAlldata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const res = await axios.get(apiEndpoint);
                const alldata = res.data;
                setAlldata(alldata);
                setLoading(false);
            } catch (error) {
                console.log("error fetching the data: ", error);
                setLoading(false);
            }
        };

        if (initialLoad) {
            setInitialLoad(false);
            setLoading(false);
            return;
        }

        if (apiEndpoint) {
            fetchAllData();
        }
    }, [initialLoad, apiEndpoint]);

    return { alldata, loading };
}

export default useFetchData;
