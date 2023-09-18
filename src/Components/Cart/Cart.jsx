import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Cart() {
  let { getLoggedUserCart, removeItem, updateProductCount,setnumOfCartItems } =
    useContext(cartContext);
  const [cartDetails, setcartDetails] = useState(null);
  async function getCart() {
    let response = await getLoggedUserCart();
    if (response?.data?.status === "success") {
      setcartDetails(response.data.data);
    }
  }
  async function deleteItem(productId) {
    let response = await removeItem(productId);
    setcartDetails(response.data.data);
    setnumOfCartItems(response.data.numOfCartItems);
    toast("Product Successfully Removed", { duration: 2000 });
    console.log(response);
  }

  async function updateCartQuntity(productId, count) {
    let response = await updateProductCount(productId, count);
    setcartDetails(response.data.data);
    toast("Product Count Successfully updated", { duration: 2000 });
    console.log(response);
  }
  useEffect(() => {
    getCart();
  },[]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>

      <div className=" py-5  cart">
        {cartDetails !== null ? (
          <div className="bg-main-light mt-4">
            <h3>Shop Cart:</h3>
            <h6 className="text-main">
              {" "}
              Total Cart Price: {cartDetails.totalCartPrice} EGP
            </h6>
            {cartDetails.products.map((product) => (
              <div
                key={product.product._id}
                className="row py-2 border-bottom align-items-center"
              >
                <div className="col-md-1">
                  <img
                    src={product.product.imageCover}
                    className="w-100"
                    alt=""
                  />
                </div>
                <div className="col-md-11 d-flex justify-content-between">
                  <div>
                    <h6>{product.product.title}</h6>
                    <h6 className="text-main">Price:{product.price}</h6>
                    <button
                      onClick={() => deleteItem(product.product._id)}
                      className="p-0 m-0 btn"
                    >
                      {" "}
                      <i className="fa-regular fa-trash-can text-main"></i>{" "}
                      Rmove
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        updateCartQuntity(
                          product.product._id,
                          product.count + 1
                        )
                      }
                      className="btn border-main btn-sm"
                    >
                      +
                    </button>
                    <span className="mx-2">{product.count}</span>
                    <button
                      onClick={() =>
                        updateCartQuntity(
                          product.product._id,
                          product.count - 1
                        )
                      }
                      className="btn border-main btn-sm"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button className="btn bg-main">
              <Link className="text-white " to={"/checkout"}>
                Checkout
              </Link>
            </button>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
