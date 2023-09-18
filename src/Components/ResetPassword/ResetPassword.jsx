import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ResetPassword() {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [messageError, setmessageError] = useState("");

  async function newPassword(values) {
    setisLoading(true); // send data to bataBase after submition
    let { data } = await axios
      .put(
        `https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`,
        values
      )
      .catch((err) => {
        setisLoading(false);
        setmessageError(err.response.data.message);
        console.log(err.response.data.message);
        setisLoading(false);
        // ` ${err.response.data.errors.param} : ${err.response.data.errors.msg}`
      });
    if (data.token) {
      // localStorage.setItem("userToken", data.token);

      setisLoading(false);
      navigate("/login");
    }
  }
  let yupValidation = Yup.object({
    email: Yup.string().required("email is required").email("email is invalid"),
    newPassword: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password must start with uppercase"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: yupValidation,
    onSubmit: (values) => {
      newPassword(values);
    },
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ResetPassword</title>
      </Helmet>
      <div className="w-75 mx-auto py-5 ">
        <h3 className="pt-3">Reset New Password :</h3>
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
          <label htmlFor="newPassword">newPassword :</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            type="password"
            name="newPassword"
            id="newPassword"
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="alert alert-danger">
              {formik.errors.newPassword}
            </div>
          ) : null}

          {isLoading ? (
            <button type="button" className="btn bg-main text-white">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)} //make the button disabled when the format of the inputs not valid or the inputs are empty
              type="submit"
              className="btn bg-main text-white"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}
