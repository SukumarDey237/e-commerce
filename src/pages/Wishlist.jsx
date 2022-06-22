import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToBag, removeFromWishlist } from "../Redux/productReducer";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.products.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="container mt-5">
        {wishlist.length === 0 && (
          <div className=" d-flex flex-column align-items-center justify-content-center">
            <p className="lead fs-4">No products in your wishlist!</p>
            <button
              className="btn btn-sm btn-info me-2"
              onClick={() => navigate("/")}
            >
              Add products to wishlist
            </button>
          </div>
        )}
        {wishlist.map((product) => {
          return (
            <div
              className="my-2 d-flex flex-column card flex-sm-row"
              key={product.id}
            >
              <img
                src={product.image}
                className="p-1 "
                style={{ height: 200, aspectRatio: "1/1", cursor: "pointer" }}
                onClick={() => navigate(`/Product/${product.id}`)}
                alt={product.title}
              />
              <div className="mt-3 ms-3">
                <p className="h3">{product.title}</p>
                <p className="fw-bold">
                  Rating - {product.rating?.rate.toFixed(1)}&#9733;
                  <span className="fw-light"> | {product.rating?.count}</span>
                </p>
                <p className="h3 fw-normal">${product.price.toFixed(2)}</p>
                <br />
                <button
                  className="btn btn-sm btn-info ms-0 m-2"
                  onClick={() => dispatch(removeFromWishlist(product))}
                >
                  Remove product
                </button>
                <button
                  className="btn btn-sm btn-info ms-0 m-2"
                  onClick={() => {
                    dispatch(addToBag(product));
                    dispatch(removeFromWishlist(product));
                  }}
                >
                  Move to Bag
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Wishlist;
