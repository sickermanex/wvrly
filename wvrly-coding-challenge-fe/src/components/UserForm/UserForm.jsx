import React, { useEffect, useState } from "react";
import { useCreateUser, useFetchAllUsers, useSearchUser } from "../../hooks/userData.hook";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import "./UserForm.css";
import MapView from "../MapView/MapView";
import { searchUserData } from "../../store/userData.slice";

const UserForm = () => {
  let dispatch = useDispatch();
  const { saveUser } = useCreateUser();
  const { fetchUsers } = useSearchUser();
  const { fetchAllUsers } = useFetchAllUsers();
  
  const { data, error } = useSelector(state => state.usersData.users)
  const [isCreate, setIsCreate] = useState(true);
  const [userState, setUserState] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    lon: 0,
    lat: 0,
    radio: 0,
  });

  useEffect(() => {
    fetchAllUsers(dispatch);
  }, [])

  const updateIsCreate = (status) => {
    setIsCreate(status);
  }

  const formik = useFormik({
    initialValues: userState,
    onSubmit: async (values, { resetForm }) => {
      values.lat = userState.lat;
      values.lon = userState.lon
      if (isCreate) {
        try {
          const isSuccess = await saveUser(dispatch, values);
          resetForm();
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          console.log(values)
          const newData = await fetchUsers(dispatch, values)
        } catch (error) {
          console.error(error);
        }
      }
    }
  });


  const updateCoords = (lon, lat) => {
    userState.lat = lat;
    userState.lon = lon;
    setUserState(userState);
  }

  const clearFilters = (e) => {
    e.preventDefault();
    fetchAllUsers(dispatch);
  }

  return (
    <>
      <div className="buttons-container">
        <button onClick={() => updateIsCreate(true)}>Create new user</button>
        <button onClick={() => updateIsCreate(false)}>Search users</button>
      </div>
      <form onSubmit={formik.handleSubmit} className="user_data_form">
        <div className="input-container">
          { isCreate ? (
            <>
              <div>
              <label>Name </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              </div>
              <div>
                <label>Lastname </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                />
              </div>
              <div>
                <label>Email </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div>
                <label>Phone </label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
              </div>
            </>
          ) : (
              <>
                <div className="input-entry">
                  <label>Radio (Km.) {formik.values.radio}</label>
                  <input type="range"
                    id="radio"
                    name="radio"
                    min={0}
                    max={350}
                    step={5}
                    onChange={formik.handleChange}
                    value={formik.values.radio}
                  />
                </div>
                <div className="input-entry">
                  <label className="info-data">Latitude: {userState.lat}</label><br/>
                  <label className="info-data">Longitude: {userState.lon}</label>
                </div>
              </>
          )}
        </div>

        <input type="hidden" id="lat" name="lat" onChange={formik.handleChange} value={formik.values.lat} />
        <input type="hidden" id="lon" name="lon" onChange={formik.handleChange} value={formik.values.lon} />

        <button type="submit">Submit</button>
        { !isCreate ? 
        (<>
          <button onClick={clearFilters} type="button">Clear Search</button>
        </>) : null }
        <div className="map-container">
          <MapView data={data} updateCoords={updateCoords}/>
        </div>
      </form>
    </>
  );
};

export default UserForm;
