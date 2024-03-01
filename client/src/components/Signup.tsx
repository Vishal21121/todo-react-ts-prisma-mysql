import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useState } from "react";

function Signup() {
  const { createUser } = useUserContext();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  return (
    <div className="hero min-h-screen bg-base-200 w-full">
      <div className="hero-content flex-col lg:w-1/2">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold">Signup now!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered"
                required
                value={userData.username}
                onChange={(e) =>
                  setUserData((pre) => ({ ...pre, username: e.target.value }))
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                value={userData.email}
                onChange={(e) =>
                  setUserData((pre) => ({ ...pre, email: e.target.value }))
                }
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                value={userData.password}
                onChange={(e) =>
                  setUserData((pre) => ({ ...pre, password: e.target.value }))
                }
              />
              <div className="flex gap-2 items-center mt-2">
                <span className="text-xs w-fit">Already have an account?</span>
                <Link to="/login" className="label-text-alt link link-hover">
                  login
                </Link>
              </div>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  createUser(userData);
                }}
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
