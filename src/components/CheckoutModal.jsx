import { useDispatch, useSelector } from "react-redux";
import { removeFromBag } from "../Redux/productReducer";

const CheckoutModal = ({ modalOpen }) => {
  const bag = useSelector((state) => state.products.bag);
  const dispatch = useDispatch();

  return (
    <>
      <div
        className="bg-dark bg-opacity-50 fixed-top d-flex align-items-center"
        style={{ height: "100vh", width: "100vw" }}
      >
        <div
          className="card container gap-1 py-1 "
          style={{ width: "max-content", height: "max-content" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h3>Enter card details</h3>
            <button
              type="button"
              className="btn-close btn-sm"
              onClick={() => modalOpen(false)}
            ></button>
          </div>
          <form>
            <div className="col-12">
              <label htmlFor="cname">Name on Card :</label>
              <br />
              <input
                type="text"
                id="cname"
                className="col-12"
                name="cardname"
                placeholder="Card holder's name"
                required
              />
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="ccnum">Card no. :</label>
                <br />
                <input
                  type="text"
                  id="ccnum"
                  name="cardnumber"
                  placeholder="0000-0000-0000-0000"
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="cvv">CVV :</label>
                <br />
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="000"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="expyear">Exp Year :</label>
                <br />
                <input
                  type="text"
                  id="expyear"
                  name="expyear"
                  placeholder="YYYY"
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="expmonth">Exp Month :</label>
                <br />
                <input
                  type="text"
                  id="expmonth"
                  name="expmonth"
                  placeholder="MM"
                  required
                />
              </div>
            </div>

            <input
              type="submit"
              value="Continue to checkout"
              className="btn btn-sm btn-info mt-3 my-1 col-12"
              onSubmit={() => {
                modalOpen(false);
                bag.forEach((p) => {
                  dispatch(removeFromBag(p));
                });
              }}
            ></input>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
