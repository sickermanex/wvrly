import { useCallback, useEffect } from "react";
import axios from "axios";
import { getAllUsersData, saveUserData } from "../store/userData.slice";


const url = "http://localhost:3000";

export const useFetchAllUsers = (dispatch) => {
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(url);
        dispatch(getAllUsersData(data))
      } catch (error) {
        dispatch(getAllUsersData({ data: [], error }))
      }
    })();
  }, [dispatch]);
};

export const useCreateUser = () => {
  const saveUser = useCallback(async (dispatch, data) => {
      try {
        const response = await axios.post(url, data);
        dispatch(saveUserData(response.data))
        // useFetchAllUsers(newDispatch);
        return true;
      } catch (error) {
        // dispatch(saveUserData({ data: [], error }))
      }
  }, []);

  return { saveUser };
  useEffect(() => {
  }, [dispatch]);
};

export const useSearchUser = (dispatch, searchCriteria) => {
  useEffect(() => {
    const searchData = async () => {
      const { lat, long, radio } = searchCriteria;
      try {
        const response = await axios.get(
          `${url}/data?lat=${lat}&long=${long}&radio=${radio}`
        );
      } catch (error) {
      }
    };
    searchData();
  }, [dispatch]);
};
