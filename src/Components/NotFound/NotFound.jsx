import React from "react";
import notfoundImg from "../../assets/images/error.svg";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>NotFound</title>
      </Helmet>
      <div className=" mt-5 d-flex align-items-center justify-content-center">
        <img src={notfoundImg} alt="" />
      </div>
    </>
  );
}
