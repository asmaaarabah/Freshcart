import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const [productDetails, setproductDetails] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let params = useParams();

  async function getProductDetails(id) {
    setisLoading(true);
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products/${id}`
    );
    setproductDetails(data.data);
    setisLoading(false);
  }

  useEffect(() => {
    getProductDetails(params.id);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Product Detailst</title>
      </Helmet>
      <div className="row justfiy-content-center align-items-center py-3">
        {isLoading ? (
          <div className="text-center">
            <Loading />
          </div>
        ) : (
          <>
            {" "}
            <div className="col-md-4 ">
              <OwlCarousel
                bg-main
                className="owl-theme "
                autoplay={true}
                autoplayTimeout={3000}
                loop
                items={1}
              >
                {productDetails?.images.map((img) => (
                  <img className="w-100" src={img} alt="" />
                ))}
              </OwlCarousel>
              {/* <img className='w-100' src={productDetails?.imageCover} alt="" /> */}
            </div>
            <div className="col-md-8">
              <h3>{productDetails?.title}</h3>
              <p className="text-muted p-2">{productDetails?.desciption}</p>
              <p className="text-muted p-2">{productDetails?.category.name}</p>
              <div className="d-flex justify-content-between">
                <span className="text-muted">{productDetails?.price} EGP</span>
                <span>
                  <i className="fas fa-star rating-color"></i>
                  {productDetails?.ratingsAverage}
                </span>
              </div>
              <button className="btn bg-main text-white w-100">
                + Add To Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
