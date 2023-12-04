import React, { useEffect } from "react";
import { useFetchAllUsers } from "../../hooks/userData.hook";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import "./UserForm.css";
import { getAllUsersData } from "../../store/userData.slice";

const UserForm = () => {
  const dispatch = useDispatch();

  const response = useFetchAllUsers();

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      longitude: -66.15,
      latitute: -17.3,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
