import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addToBag,
  addToWishlist,
  removeFromWishlist
} from "../Redux/productReducer";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.products.wishlist);
  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(data);
    } catch (e) {
      alert(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="placeholder-wave col-12 col-md-4">
            <span
              className="placeholder m-2 col-12"
              style={{ height: 400 }}
            ></span>
          </div>

          <div className="placeholder-wave col-12 col-md-8 mt-5">
            <span className="placeholder m-2 col-3" />
            <h2 className="placeholder m-2 col-12 "> </h2>
            <h2 className="placeholder m-2 col-6 "> </h2>
            <span className="placeholder m-2 col-6 mt-5" />
            <span className="placeholder m-2 col-7 " />
            <span className="placeholder m-2 col-8" />
            <span className="placeholder m-2 col-6" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="container mt-5">
          <div className="row gap-5">
            <div className="col-12 col-lg-4 p-1 d-flex aling-items-center justify-content-center">
              <img
                src={product.image}
                alt={product.title}
                style={{ height: 300, aspectRatio: "1/1" }}
              />
            </div>
            <div className="col">
              <div className="fw-light fs-5 text-uppercase">
                {product.category}
              </div>
              <h1 className="fw-light py-1">{product.title}</h1>
              <p className="fw-bold">
                Rating {product.rating?.rate.toFixed(1)}&#9733;
                <span className="fw-light"> | {product.rating?.count}</span>
              </p>
              <div className="fw-bold fs-1">${product.price.toFixed(2)}</div>
              <div className="fs-5 text-muted">{product.description}</div>
              <div className="my-3 d-flex justify-content-end">
                <div>
                  <button
                    className="btn btn-info mx-2"
                    onClick={() =>
                      wishlist.some((i) => i.id === product.id)
                        ? dispatch(removeFromWishlist(product))
                        : dispatch(addToWishlist(product))
                    }
                  >
                    {wishlist.some((i) => i.id === product.id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"}
                  </button>
                  <button
                    className="btn btn-info mx-2 ms-auto"
                    onClick={() => dispatch(addToBag(product))}
                  >
                    Add to bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Product;
