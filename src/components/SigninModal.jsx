import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBag, removeFromWishlist } from "../Redux/productReducer";
import { changeProfile } from "../Redux/profileReducer";

const SigninModal = ({ modalOpen }) => {
  const wishlist = useSelector((state) => state.products.wishlist);
  const bag = useSelector((state) => state.products.bag);
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const addressRef = useRef(null);

  const handleSubmit = () => {
    const username = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const address = addressRef.current.value;
    dispatch(changeProfile([username, email, password, address]));
    wishlist.forEach((p) => dispatch(removeFromWishlist(p)));
    bag.forEach((p) => dispatch(removeFromBag(p)));
    modalOpen(false);
  };
  return (
    <>
      <div
        className="bg-dark bg-opacity-50 fixed-top d-flex align-items-center"
        style={{ height: "100vh", width: "100vw" }}
      >
        <div
          className="card container gap-1 py-1"
          style={{ maxWidth: "max-content", height: "max-content" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h3>Enter profile details</h3>
            <button
              type="button"
              className="btn-close btn-sm"
              onClick={() => modalOpen(false)}
            ></button>
          </div>

          <form onSubmit={() => handleSubmit()}>
            <div className="col-12">
              <label htmlFor="name">Name :</label>
              <br />
              <input
                ref={nameRef}
                type="text"
                id="name"
                className="col-12"
                name="name"
                placeholder="Username"
                required
              />
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="email"> Email :</label>
                <br />
                <input
                  ref={emailRef}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="username@email.com"
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="password">Password :</label>
                <br />
                <input
                  ref={passwordRef}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="********"
                  required
                />
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="address">Address :</label>
              <br />
              <input
                ref={addressRef}
                type="text"
                id="address"
                className="col-12"
                name="address"
                placeholder="abc xyz zip-0000"
                required
              />
            </div>
            <input
              type="submit"
              value="Sign in"
              className="btn btn-sm btn-info mt-3 col-12"
            ></input>
          </form>
        </div>
      </div>
    </>
  );
};

export default SigninModal;
