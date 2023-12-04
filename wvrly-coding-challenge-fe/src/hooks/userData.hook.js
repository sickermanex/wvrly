import { useEffect, useState } from "react";
import axios from "axios";
import { getAllUsersData } from "../store/userData.slice";

const url = "http://localhost:3000";

export const useFetchAllUsers = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response);
        getAllUsersData(response)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, error, loading };
};

export const useCreateUser = (data) => {
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.post(url, data);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { data, error, loading };
};

export const useSearchUser = (searchCriteria) => {
  useEffect(() => {
    const searchData = async () => {
      const { lat, long, radio } = searchCriteria;
      try {
        setLoading(true);
        const response = await axios.get(
          `${url}/data?lat=${lat}&long=${long}&radio=${radio}`
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    searchData();
  }, []);
  return { data, error, loading };
};
