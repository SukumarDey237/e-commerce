import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Redux/profileReducer";

import SigninModal from "../components/SigninModal";

const Profile = () => {
  const profile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("https://fakestoreapi.com/users/1");
      const username = data.name.firstname + " " + data.name.lastname;
      const email = data.email;
      const password = data.password;
      const address =
        data.address.city +
        " " +
        data.address.street +
        ", zipcode- " +
        data.address.zipcode;
      dispatch(changeProfile([username, email, password, address]));
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    profile.username === "" && fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {profile.username ? (
        <div
          className="container card mt-5 px-4 py-2"
          style={{ width: "max-content" }}
        >
          <div className="fs-4 fw-bold" style={{ maxWidth: "max-content" }}>
            User Profile
          </div>
          <hr className="my-2" />
          <div className="d-flex gap-1 flex-column row col fw-bold">
            <div className="col">Name : {profile.username}</div>
            <div className="col">E mail : {profile.email}</div>
            <div className="col">Password : {profile.password}</div>
            <div className="col">Address : {profile.address}</div>
          </div>
          <hr />
          <div className="row ">
            <button
              className="btn btn-sm btn-info m-1"
              onClick={() => setIsModalOpen(true)}
            >
              Change profile
            </button>
            <button
              className="btn btn-sm btn-info m-1"
              onClick={() => {
                dispatch(changeProfile([null, null, null, null]));
              }}
            >
              Log out
            </button>
          </div>
        </div>
      ) : (
        <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
          <div className="lead fs-4 text-center">Sign in to view profile.</div>
          <button
            className="btn btn-sm btn-info m-1"
            onClick={() => setIsModalOpen(true)}
          >
            Sign in
          </button>
        </div>
      )}

      {isModalOpen && <SigninModal modalOpen={setIsModalOpen} />}
    </>
  );
};

export default Profile;
