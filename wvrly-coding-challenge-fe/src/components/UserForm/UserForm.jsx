import React, { useEffect, useState } from "react";
import { useCreateUser, useFetchAllUsers } from "../../hooks/userData.hook";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import "./UserForm.css";
import MapView from "../MapView/MapView";

const UserForm = () => {
  let dispatch = useDispatch();
  const { saveUser } = useCreateUser();

  useFetchAllUsers(dispatch);
  
  const { data, error } = useSelector(state => state.usersData.users)
  const [userState, setUserState] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    lon: 0,
    lat: 0,
  });

  const formik = useFormik({
    initialValues: userState,
    onSubmit: async (values, { resetForm }) => {
      try {
        values.lat = userState.lat;
        values.lon = userState.lon
        const isSuccess = await saveUser(dispatch, values);
        resetForm();
        // window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  });


  const updateCoords = (lon, lat) => {
    userState.lat = lat;
    userState.lon = lon;
    setUserState(userState);
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="user_data_form">
        <label>Insert User Data</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <input
          type="text"
          id="lastname"
          name="lastname"
          onChange={formik.handleChange}
          value={formik.values.lastname}
        />
        <input
          type="text"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />

        <input type="hidden" id="lat" name="lat" onChange={formik.handleChange} value={formik.values.lat} />
        <input type="hidden" id="lon" name="lon" onChange={formik.handleChange} value={formik.values.lon} />

        <button type="submit">Submit</button>
        <MapView data={data} updateCoords={updateCoords}/>
      </form>
    </>
  );
};

export default UserForm;
