import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logopic from "../../assets/images/freshcart-logo.svg";
import { cartContext } from "../../Context/CartContext";

export default function Navbar({ userData, logout }) {
  let { numOfCartItems } = useContext(cartContext);
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="">
            <img src={logopic} alt="/" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userData !== null ? (
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="brands">
                    Brands
                  </Link>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item d-flex align-items-center  ">
                <i className="fab mx-2 fa-facebook"></i>
                <i className="fab mx-2 fa-twitter"></i>
                <i className="fab mx-2 fa-instagram"></i>
                <i className="fab mx-2 fa-tiktok"></i>
                <i className="fab mx-2 fa-linkedin"></i>
                <i className="fab mx-2 fa-youtube"></i>
              </li>

              {userData === null ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li className="nav-item position-relative">
                    <Link className="nav-link px-2" to="cart">
                      <i className="fas fa-shopping-cart fa-lg "></i>
                      <span className="badge  bg-main text-white position-absolute top-0 end-0">
                        {numOfCartItems}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span
                      onClick={logout}
                      className="nav-link cursor-pointer mx-2"
                    >
                      {" "}
                      Logout
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>{" "}
      </nav>
    </>
  );
}
