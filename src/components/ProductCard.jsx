import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToBag,
  addToWishlist,
  removeFromWishlist
} from "../Redux/productReducer";

const ProductCard = ({ product }) => {
  const wishlist = useSelector((state) => state.products.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="col d-flex justify-content-center">
      <div className="card m-2 shadow" style={{ width: 300 }}>
        <img
          src={product.image}
          className="card-img-top m-auto p-1"
          onClick={() => navigate(`/Product/${product.id}`)}
          style={{ height: 300, cursor: "pointer", width: 200 }}
          alt={product.title}
        />
        <div className="card-body">
          <h5 className="card-title text-center">
            {product.title.slice(0, 20)}...
          </h5>
          <span className="d-flex px-1">
            <p className="card-text fw-bold">
              Rating - {product.rating?.rate.toFixed(1)}&#9733;
            </p>
            <p className="card-text fw-bold ms-auto ">
              ${product.price.toFixed(2)}
            </p>
          </span>
          <span className="d-flex px-1">
            <button
              className="btn btn-sm btn-outline-danger border-0 rounded-pill"
              onClick={() =>
                wishlist.some((i) => i.id === product.id)
                  ? dispatch(removeFromWishlist(product))
                  : dispatch(addToWishlist(product))
              }
            >
              {wishlist.some((i) => i.id === product.id) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              )}
            </button>
            <button
              className="btn btn-sm btn-info ms-auto"
              onClick={() => dispatch(addToBag(product))}
            >
              Add to bag
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
