// useFetch.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

const  = (url: string) => {
    const [data, setData] = useState<any[]>([]); // Change the type as needed
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (err) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;