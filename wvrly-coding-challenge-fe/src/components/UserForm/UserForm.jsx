import React, { useEffect, useState } from "react";
import { useCreateUser, useFetchAllUsers, useSearchUser } from "../../hooks/userData.hook";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import MapView from "../MapView/MapView";

import "./UserForm.css";

const UserForm = () => {
  let dispatch = useDispatch();
  const { saveUser } = useCreateUser();
  const { fetchUsers } = useSearchUser();
  const { fetchAllUsers } = useFetchAllUsers();
  const blankUserState = {
    name: "",
    lastname: "",
    email: "",
    phone: "",
    lon: 0,
    lat: 0,
    radio: 0,
  }
  
  const { data, error } = useSelector(state => state.usersData.users)
  const [isCreate, setIsCreate] = useState(true);
  const [userState, setUserState] = useState(blankUserState);

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
          setUserState(blankUserState);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const newData = await fetchUsers(dispatch, values)
        } catch (error) {
          console.error(error);
        }
      }
    },
    validate: (values) => {
      const errors = {};

      if (isCreate) {
        if (values.name == "") {
          errors.name = 'Name is required';
        }

        if (values.lastname == "") {
          errors.lastname = 'Lastname is required';
        }
      } 

      if (values.lat === 0 || values.lon === 0) {
        errors.lat = 'Latitude and Longitude are required';
        errors.lon = 'Latitude and Longitude are required';
      }

      return errors;
    },
  });


  const updateCoords = (lon, lat) => {
    userState.lat = lat;
    userState.lon = lon
    setUserState(userState);
    formik.setFieldValue('lat', lat)
    formik.setFieldValue('lon', lon)
  }

  const clearFilters = (e) => {
    e.preventDefault();
    fetchAllUsers(dispatch);
  }

  return (
    <>
      <div className="buttons-container">
        <button onClick={() => { formik.resetForm(); updateIsCreate(true)}}>Create new user</button>
        <button onClick={() => { formik.resetForm() ; updateIsCreate(false)}}>Search users</button>
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
               { formik.touched.name && formik.errors.name ? (
                <div className="error-message">{formik.errors.name}</div>
              ) : null}
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
                { formik.touched.lastname && formik.errors.lastname ? (
                <div className="error-message">{formik.errors.lastname}</div>
              ) : null}
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
                  type="phone"
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
                  <label>Radio units {formik.values.radio}</label>
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

        <input type="hidden" id="lat" name="lat" value={formik.values.lat} />
        <input type="hidden" id="lon" name="lon" value={formik.values.lon} />
        { (formik.touched.lat && formik.errors.lat) || (formik.touched.lon && formik.errors.lon) ? (
            <div className="error-message">{formik.errors.lat}</div>
          ) : null}

        <button type="submit" disabled={!formik.isValid}>Submit</button>
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
