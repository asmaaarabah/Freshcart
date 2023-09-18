import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [allBrands, setAllBrands] = useState(null);
  async function getAllBrands() {
    let { data } = await axios.get(
      ` https://route-ecommerce.onrender.com/api/v1/brands`
    );
    setAllBrands(data.data);
  }
  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>
      {allBrands ? (
        <div className="container">
          <div className="row align-items-center py-4">
            <div className="col-md-3 ">
              <div className="title">
                <h3 className="text-muted">Our Brands</h3>
                <p className="text-main">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
                  ex.
                </p>
              </div>
            </div>
            {allBrands.map(function (brand, idx) {
              return (
                <div key={idx} className="col-md-3">
                  <Link to={`/brandproducts/${brand._id}`}>
                    <div className="brand">
                      <img src={brand.image} alt="" />
                      <h6 className="text-center text-main text-blod">
                        {brand.name}
                      </h6>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
