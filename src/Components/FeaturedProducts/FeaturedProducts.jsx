import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  let { addToCart, setnumOfCartItems } = useContext(cartContext);
  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response?.data?.status === "success") {
      setnumOfCartItems(response.data.numOfCartItems);
      toast.success(response.data.message, {
        duration: 2000,
        position: "top-center",
      });
    } else {
      toast.error("Error", { duration: 2000 });
    }

    console.log(response);
  }

  async function getProducts() {
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products`
    );
    setProducts(data.data);
    console.log(data);
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="row">
        {products.map((product) => (
          <div
            key={product._id} //to prvent error of virtual dom
            className="col-md-2 "
          >
            <div className="product cussor-pointer px-2 py-3">
              <Link to={`products/${product._id}`}>
                <img className="w-100" src={product.imageCover} alt="" />
                <span className="fw-bold text-main ">
                  {product.category.name}
                </span>
                <h3 className="h6 ">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star rating-color"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <button
                onClick={() => addProduct(product._id)}
                className="btn bg-main text-white w-100"
              >
                + Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
