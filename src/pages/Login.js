import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hide from "../assets/hide.svg";
import show from "../assets/show.svg";
import backgroundImage from "../assets/preview.jpg";
import logo from "../assets/cvsu.png";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="h-screen flex">

      <div className="w-1/4 bg-green-700 p-12 flex flex-col justify-between">
        <div className="flex items-center mb-12">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-auto mr-3"
          />
          <h1 className="text-4xl font-bold text-white">CurricuLink</h1>
        </div>

        <div className="flex flex-col justify-center flex-grow mb-10">
          <h2 className="text-3xl font-semibold text-white mb-6 text-left">Sign In</h2>
          <form className="w-full">
            <div className="mb-10">
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Username or Email Address
              </label>
              <input
                type="text"
                id="email"
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  className="w-full p-4 border rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
                >
                  <img
                    src={passwordVisible ? hide : show}
                    alt={passwordVisible ? "Hide password" : "Show password"}
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>

            <div className="border-t border-white mt-32 mb-10"></div>
            <button
              type="submit"
              className="w-full bg-white text-green-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
            >
              Sign In
            </button>
            <p className="text-sm mt-6 text-center text-white flex items-center justify-center">
            <a href="#" onClick={handleForgotPassword} className="underline text-white hover:text-gray-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className='mr-2' height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF">
              <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480h80q0 66 25 124.5t68.5 102q43.5 43.5 102 69T480-159q134 0 227-93t93-227q0-134-93-227t-227-93q-89 0-161.5 43.5T204-640h116v80H80v-240h80v80q55-73 138-116.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-80-240q-17 0-28.5-11.5T360-360v-120q0-17 11.5-28.5T400-520v-40q0-33 23.5-56.5T480-640q33 0 56.5 23.5T560-560v40q17 0 28.5 11.5T600-480v120q0 17-11.5 28.5T560-320H400Zm40-200h80v-40q0-17-11.5-28.5T480-600q-17 0-28.5 11.5T440-560v40Z"/>
            </svg>
              Forgot password?
            </a>
          </p>
          </form>
        </div>
      </div>

      <div
        className="w-3/4 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
    </div>
  );
}

export default Login;
