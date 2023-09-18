import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgetPassword() {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [flagReset, setflagReset] = useState(false);
  const [errMsg, seterrMsg] = useState("");

  async function getforgetPassword(values) {
    let { data } = await axios.post(
      `https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`,
      values
    );
    if (data.statusMsg === "success") {
      setflagReset(true);
    }
    console.log(data);
  }
  let yupValidation = Yup.object({
    email: Yup.string().required("email is required").email("email is invalid"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yupValidation,
    onSubmit: (values) => {
      getforgetPassword(values);
    },
  });
  async function resetPassword(value) {
    setisLoading(true);
    let data = await axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,
        value
      )
      .catch((err) => {
        seterrMsg(err.response.data.message);
      });
    if (data.data.status === "Success") {
      navigate("/resetpassword");
    }

    console.log(data);
  }
  let formik1 = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: (values) => {
      resetPassword(values);
    },
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ForgetPassword</title>
      </Helmet>
      {flagReset ? (
        <div className="mx-auto py-5 w-75">
          <form
            className="py-4"
            onSubmit={formik1.handleSubmit} //to prevent reload
          >
            <label htmlFor="email">Reset Code:</label>{" "}
            <input
              onBlur={formik1.handleBlur}
              className="form-control "
              onChange={formik1.handleChange}
              value={formik1.values.resetCode}
              type="text"
              name="resetCode"
              id="resetCode"
            />
            {formik1.errors.resetCode && formik1.touched.resetCode ? (
              <div className="alert alert-danger">{formik1.errors.email}</div>
            ) : null}
            {errMsg !== "" ? (
              <div className="alet alert-danger"> {errMsg} </div>
            ) : null}
            {isLoading ? (
              <button type="button" className="btn bg-main text-white mt-2">
                <i className="fas fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                disabled={!(formik1.isValid && formik1.dirty)} //make the button disabled when the format of the inputs not valid or the inputs are empty
                type="submit"
                className="btn bg-main text-white mt-2"
              >
                Verify Code
              </button>
            )}
          </form>
        </div>
      ) : (
        <div className="mx-auto py-5 w-75">
          <form
            className="py-4"
            onSubmit={formik.handleSubmit} //to prevent reload
          >
            <label htmlFor="email">Email :</label>
            <input
              onBlur={formik.handleBlur}
              className="form-control "
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger">{formik.errors.email}</div>
            ) : null}

            {isLoading ? (
              <button type="button" className="btn bg-main text-white mt-2">
                <i className="fas fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                disabled={!(formik.isValid && formik.dirty)} //make the button disabled when the format of the inputs not valid or the inputs are empty
                type="submit"
                className="btn bg-main text-white mt-2"
              >
                send
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}
