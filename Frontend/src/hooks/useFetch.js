import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const header = { headers: { Authorization: token } };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url,header);
        setData(response.data);
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchData();
  }, [url]);

  return { data, loading };
};