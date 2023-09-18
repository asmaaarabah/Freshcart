import React from "react";

export default function Footer() {
  return (
    <>
      <div>
        <footer className="py-5 bg-light my-5 mb-auto">
          <div className="container ">
            <div className="py-2">
              <h2>Get The Freshcart App</h2>
              <p className="text-muted">We will send you a link, </p>
              <form>
                <div className="row">
                  <div className="col-md-10">
                    <input
                      type="email"
                      placeholder="email..."
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-2">
                    <button className="btn bg-main">Share App Link</button>
                  </div>
                </div>
              </form>
            </div>

            <div className="row border-top border-2 border-dark  pt-2 ">
              <div className="col-md-4  ">
                <ul className="list-unstyled d-flex">
                  <li className="me-2">
                    <h6>Payment Parteners</h6>
                  </li>
                  <li className="me-2  text-main">
                    <i className="fa-brands fa-paypal"></i>
                  </li>
                  <li className="me-2 text-main">
                    <i className="fa-brands fa-cc-amazon-pay"></i>
                  </li>
                  <li className="me-2 text-main">
                    <i className="fa-brands fa-cc-mastercard"></i>
                  </li>
                </ul>
              </div>
              <div className="col-md-8">
                <div className=" d-flex align-items-center">
                  <h6>Get Deliveries With FreshCart</h6>
                  <button className="btn btn-dark  me-2">
                    <i className="fa-brands fa-app-store"></i>
                    <span> Avaliavle On App Store</span>
                    Avaliavle On App Store
                  </button>
                  <button className="btn btn-dark ">
                    <i className="fa-brands fa-google-play me-2"></i>

                    <span>Get It From Google Play</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
