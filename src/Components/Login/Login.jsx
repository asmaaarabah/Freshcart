import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Login({ saveUserData }) {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [messageError, setmessageError] = useState("");

  async function handleLogin(values) {
    setisLoading(true); // send data to bataBase after submition
    let { data } = await axios
      .post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setisLoading(false);
        setmessageError(
          ` ${err.response.data.errors.param} : ${err.response.data.errors.msg}`
        );
      });
    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      saveUserData();
      setisLoading(false);
      navigate("/");
    }
  }
  let yupValidation = Yup.object({
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password must start with uppercase"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yupValidation,
    onSubmit: handleLogin,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className="w-75 mx-auto py-5 ">
        <h3 className="pt-4">Login Now :</h3>
        {
          messageError.length > 0 ? (
            <div className="alert alert-danger">{messageError}</div>
          ) : null // when the data have an error and cant go to login this will happen
        }

        <form
          onSubmit={formik.handleSubmit} //to prevent reload
        >
          <label htmlFor="email">Email :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}
          <label htmlFor="password">Password :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}

<Link to={'/forgetpassword'} className="text-main">Forget your Password ...?</Link>
<br />
       
          {isLoading  ? (
            <button type="button" className="btn bg-main text-white">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) :( 
            <button
              disabled={!(formik.isValid && formik.dirty)} //make the button disabled when the format of the inputs not valid or the inputs are empty
              type="submit"
              className="btn bg-main text-white"
            >
              Login
            </button>
            )}
        </form>
      </div>
    </>
  );
}
