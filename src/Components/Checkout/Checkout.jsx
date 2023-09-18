import React, { useContext } from "react";
import { useFormik } from "formik";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function Checkout() {
  let { onlinePayment, cartId } = useContext(cartContext);
  async function handleSubmit(values) {
    let response = await onlinePayment(cartId, values);
    if (response?.data?.status === "success") {
      window.location.href = response.data.session.url;
    }
    console.log(values);
  }
  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout</title>
      </Helmet>
      <div className="w-50  py-5 mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <label className="pt-4" htmlFor="details">
            Address Details:{" "}
          </label>
          <input
            type="text"
            className="form-control mb-3"
            value={formik.values.details}
            onChange={formik.handleChange}
            name="details"
            id="details"
          />

          <label htmlFor="phone">Phone: </label>
          <input
            type="tel"
            className="form-control mb-3"
            value={formik.values.phone}
            onChange={formik.handleChange}
            name="phone"
            id="phone"
          />

          <label htmlFor="city">City: </label>
          <input
            type="text"
            className="form-control mb-3"
            value={formik.values.city}
            onChange={formik.handleChange}
            name="city"
            id="city"
          />

          <button type="submit" className="btn border-main w-100">
            Pay
          </button>
        </form>
      </div>
    </>
  );
}
