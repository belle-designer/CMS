import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowIcon from "../assets/show.svg";
import HideIcon from "../assets/hide.svg";
import AboutImage from "../assets/about.jpg"; // Import the background image

function Reset() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [validation, setValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const passwordValidation = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    specialChar: /[@$!%*?&]/.test(newPassword),
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);

    setValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (
      !validation.length ||
      !validation.uppercase ||
      !validation.lowercase ||
      !validation.specialChar
    ) {
      setError(
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one special character."
      );
      return;
    }

    setError("");
    setSuccessMessage("Your password has been successfully reset!");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${AboutImage})` }} // Use imported image
    >
      <div className="bg-white p-8 rounded shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <p className="mb-6">Enter a new password below.</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="newPassword"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-4 border rounded"
                />
              </div>
              <div className="pl-2">
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="p-2"
                >
                  {passwordVisible ? (
                    <img src={ShowIcon} alt="Show Password" />
                  ) : (
                    <img src={HideIcon} alt="Hide Password" />
                  )}
                </button>
              </div>
            </div>
            <div className="text-left">
              <div className="text-sm text-gray-500">
                <p className={validation.length ? "text-green-500" : "text-red-500"}>
                  {validation.length ? "✔︎" : "✘"} At least 8 characters
                </p>
                <p className={validation.uppercase ? "text-green-500" : "text-red-500"}>
                  {validation.uppercase ? "✔︎" : "✘"} At least one uppercase letter
                </p>
                <p className={validation.lowercase ? "text-green-500" : "text-red-500"}>
                  {validation.lowercase ? "✔︎" : "✘"} At least one lowercase letter
                </p>
                <p className={validation.specialChar ? "text-green-500" : "text-red-500"}>
                  {validation.specialChar ? "✔︎" : "✘"} At least one special character
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="flex items-center w-full">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 p-4 border rounded-l"
              />
            <div className="pl-2">
              <button
                type="button"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                className="p-2"
              >
                {confirmPasswordVisible ? (
                  <img src={ShowIcon} alt="Show Confirm Password" />
                ) : (
                  <img src={HideIcon} alt="Hide Confirm Password" />
                )}
              </button>
            </div>
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-green-700 text-white rounded">
            Reset Password
          </button>
        </form>
        <button onClick={handleBackToLogin} className="mt-4 text-sm text-green-700">
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Reset;
