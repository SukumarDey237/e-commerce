import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToWishlist,
  changeProductQuantity,
  removeFromBag
} from "../Redux/productReducer";

const BagProduct = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const changeQty = () => {
    if (inputRef.current.value < 1) {
      dispatch(changeProductQuantity([product, 1]));
    } else {
      dispatch(changeProductQuantity([product, inputRef.current.value]));
    }
  };

  return (
    <div className="d-flex flex-column gap-5 flex-sm-row card mb-2 p-1">
      <img
        src={product.image}
        className="m-auto p-1"
        style={{ height: 200, cursor: "pointer", aspectRatio: "1/1" }}
        onClick={() => navigate(`/Product/${product.id}`)}
        alt={product.title}
      />
      <div className="mt-3 w-100">
        <p className="h3">{product.title}</p>
        <p className="fw-bold">
          Rating - {product.rating?.rate.toFixed(1)}&#9733;
          <span className="fw-light"> | {product.rating?.count}</span>
        </p>
        <div className=" d-flex flex-wrap ">
          <p className="h3 fw-normal ">
            ${numberWithCommas((product.quantity * product.price).toFixed(2))}
          </p>
          <p className=" mt-1 px-2 ">
            Quantity:{" "}
            <input
              ref={inputRef}
              type="number"
              style={{ width: "50px" }}
              className=" px-1 border rounded "
              min="1"
              onChange={() => changeQty()}
              value={product.quantity}
            />
          </p>
        </div>
        <button
          className="btn btn-sm btn-info ms-0 m-2"
          onClick={() => dispatch(removeFromBag(product))}
        >
          Remove product
        </button>
        <button
          className="btn btn-sm btn-info ms-0 m-2"
          onClick={() => {
            dispatch(addToWishlist(product));
            dispatch(removeFromBag(product));
          }}
        >
          Move to wishlist
        </button>
      </div>
    </div>
  );
};

export default BagProduct;
