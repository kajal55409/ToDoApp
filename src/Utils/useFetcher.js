import { useState, useEffect } from "react";
import axios from "axios";

export const BASE_URL = "https://api.staging.sumize.io/api";
const useDataFetcher = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(BASE_URL + url);
      setData(response.data?.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refreshData = () => {
    fetchData();
  };

  return { data, isLoading, error, refreshData };
};

export default useDataFetcher;
