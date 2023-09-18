import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function BrandProducts() {
  const { id } = useParams();
  const [brandProducts, setBrandProducts] = useState(null);
  async function getBrandProducts() {
    try {
      let { data } = await axios.get(
        ` https://route-ecommerce.onrender.com/api/v1/products`,
        {
          params: { brand: id },
        }
      );
      setBrandProducts(data.data);
    } catch (error) {
      console.log("Error", error);
    }
  }
  useEffect(() => {
    getBrandProducts();
  },[]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brand Products</title>
      </Helmet>
      {brandProducts ? (
        <div className="container py-5">
          <div className="row">
            {brandProducts.length === 0 ? (
              <div className="  mt-5 d-flex align-items-center justify-content-center py-5">
                <h2 className="text-main ">
                  NO Products Available RightNow...
                </h2>
              </div>
            ) : (
              brandProducts.map((brandproduct, idx) => (
                <div key={idx} className="col-md-3 py-3">
                  <Link to={`/products/${brandproduct.id}`}>
                    <div className="item h-100 rounded-3 position-relative ">
                      <img
                        className="w-100"
                        src={brandproduct.imageCover}
                        alt=""
                      />
                      <span className=" text-main fe-bold">
                        {brandproduct.category.name}
                      </span>
                      <h3 className="h6 ">
                        {brandproduct.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">
                          {brandproduct.price} EGP
                        </span>
                        <span>
                          <i className="fas fa-star rating-color"></i>
                          {brandproduct.ratingsAverage}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
