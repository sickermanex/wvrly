import { useCallback, useEffect } from "react";
import axios from "axios";
import { getAllUsersData, saveUserData, searchUserData } from "../store/slices/userData.slice";

const url = "http://localhost:3000";

export const useFetchAllUsers = () => {
  const fetchAllUsers = useCallback(async (dispatch) => {
    try {
      const { data } = await axios.get(url);
      dispatch(getAllUsersData(data))
    } catch (error) {
      dispatch(getAllUsersData({ data: [], error }))
    }
  }, []);
  
  return { fetchAllUsers };
};

export const useCreateUser = () => {
  const saveUser = useCallback(async (dispatch, data) => {
      try {
        const response = await axios.post(url, data);
        dispatch(saveUserData(response.data))
        return true;
      } catch (error) {
        dispatch(saveUserData({ data: [], error }))
      }
  }, []);

  return { saveUser };
};

export const useSearchUser = () => {
  const fetchUsers = useCallback(async (dispatch, searchCriteria) => {
    const { lat, lon, radio } = searchCriteria;
    try {
      const { data } = await axios.get(
        `${url}/search-by-radio?lat=${lat}&lon=${lon}&radio=${radio}`
      );
      console.log(data)
      dispatch(searchUserData(data))
      return data;
    } catch (error) {
    }
  }, []);

  return { fetchUsers }
};
