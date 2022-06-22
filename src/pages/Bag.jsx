import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BagProduct from "../components/BagProduct";
import CheckoutModal from "../components/CheckoutModal";

const Bag = () => {
  const bag = useSelector((state) => state.products.bag);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bagTotal = () => {
    let total = bag.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    return total.toFixed(2);
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <div className="container mt-5 gap-3">
        <div className="row">
          {bag.length === 0 && (
            <div className=" d-flex flex-column align-items-center justify-content-center">
              <p className="lead fs-4 text-center">
                Your bag is empty. Let's grab some products.
              </p>
              <div className="container-fluid d-flex gap-1">
                <button
                  className="btn btn-sm btn-info ms-auto"
                  onClick={() => navigate("/")}
                >
                  Shop for more products
                </button>
                <button
                  className="btn btn-sm btn-info me-auto"
                  onClick={() => navigate("/Wishlist")}
                >
                  Add products from wishlist
                </button>
              </div>
            </div>
          )}

          <div className="col-lg-8">
            {bag.map((product) => (
              <BagProduct product={product} key={product.id} />
            ))}
          </div>

          {bag.length > 0 && (
            <div
              className=" col-lg-4 card gap-2 py-2"
              style={{ height: "max-content" }}
            >
              <p className="fw-bold fs-4">
                Price Details of ({bag.length}) products
              </p>
              <div className="mb-auto">
                {bag.map((product) => {
                  return (
                    <div className="d-flex px-2" key={product.id}>
                      <p className="me-auto">
                        {product.title} ({product.quantity})
                      </p>
                      <p className="ms-2">
                        ${(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
                <hr className="m-0" />
                <div className="d-flex px-2">
                  <p className="me-auto">Toltal</p>
                  <p className="ms-2">${numberWithCommas(bagTotal())}</p>
                </div>
              </div>
              <button
                className="btn btn-sm btn-info"
                onClick={() => navigate("/Wishlist")}
              >
                Add more from wishlist
              </button>
              <button
                className="btn btn-info fw-bold"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Place order
              </button>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && <CheckoutModal modalOpen={setIsModalOpen} />}
    </>
  );
};
export default Bag;
