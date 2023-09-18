import React, { useEffect, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);
  async function getCategories() {
    let { data } = await axios.get(
      ` https://route-ecommerce.onrender.com/api/v1/categories `
    );
    setCategories(data.data);
    console.log(data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      {categories ? (
        <div className="pt-5">
          <h3>Shop Now Popular Categories</h3>
          <OwlCarousel
            className="owl-theme "
            autoplay={true}
            autoplayTimeout={1000}
            loop
            items={7}
          >
            {categories.map((category) => (
              <div key={category._id}>
                <img
                  src={category.image}
                  height={200}
                  className="w-100"
                  alt=""
                />
                <h2 className="h6 pt-2 text-main text-center">
                  {category.name}
                </h2>
              </div>
            ))}
          </OwlCarousel>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
