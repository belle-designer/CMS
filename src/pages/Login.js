import React, { useState } from "react";
import hide from "../assets/hide.svg"; 
import show from "../assets/show.svg"; 
import previewImage from "../assets/preview.jpg"; 
import aboutImage from "../assets/about.jpg"; 
import programImage from "../assets/program.jpg"; 

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [activeLink, setActiveLink] = useState("Preview");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  
  const imageMap = {
    Preview: previewImage,
    About: aboutImage,
    Program: programImage,
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex w-full h-full bg-white">
        {}
        <div className="w-1/3 bg-green-700 text-white p-12 flex flex-col justify-center rounded-r-3xl h-full">
          <div className="pb-32">
            <h1 className="text-4xl font-bold mb-10">Curriculum.</h1>
          </div>

          <div className="pb-10">
            <h2 className="text-3xl mb-6">Sign in</h2>
          </div>

          <form>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm mb-2">
                Username or Email Address
              </label>
              <input
                type="text"
                id="email"
                className="w-full p-4 rounded-lg text-black"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm mb-2">
                Password
              </label>
              <div className="flex items-center">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-4 rounded-l-lg text-black"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="ml-2 bg-white p-4 rounded-r-lg"
                >
                  <img
                    src={passwordVisible ? hide : show}
                    alt={passwordVisible ? "Hide password" : "Show password"}
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
          </form>

          <div className="pt-20 pb-20">
            <button
              type="submit"
              className="w-full bg-white text-green-700 py-4 rounded-lg font-bold hover:bg-gray-200 mt-6"
            >
              Sign in
            </button>
            <p className="text-sm mt-6 text-center">
              <a href="#" className="underline">
                Forgot password?
              </a>
            </p>
          </div>
        </div>

        {}
        <div className="w-2/3 bg-white p-8 flex flex-col justify-between rounded-r-lg h-full">
          <nav className="flex justify-between items-center mb-6">
            <div className="flex gap-6">
              {["Preview", "About", "Program"].map((link) => (
                <div key={link} className="text-center">
                  <a
                    href="#"
                    onClick={() => handleLinkClick(link)}
                    className={`text-sm text-gray-700 hover:text-green-700 ${
                      activeLink === link ? "text-green-700" : ""
                    }`}
                  >
                    {link}
                  </a>
                  {activeLink === link && (
                    <div className="flex justify-center mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="12px"
                        viewBox="0 -960 960 960"
                        width="12px"
                        fill="#0e7529"
                      >
                        <path d="M440-120v-264L254-197l-57-57 187-186H120v-80h264L197-706l57-57 186 187v-264h80v264l186-187 57 57-187 186h264v80H576l187 186-57 57-186-187v264h-80Z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button className="bg-green-700 text-white py-2 px-6 rounded-lg hover:bg-green-800">
              Sign in
            </button>
          </nav>
          <div className="flex justify-center items-center flex-grow">
            <img
              src={imageMap[activeLink]}
              alt={activeLink}
              className="max-w-full max-h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
