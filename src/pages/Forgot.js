import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com"; // Import emailjs
import backgroundImage from "../assets/about.jpg"; // Import the background image

function Forgot() {
  const [email, setEmail] = useState(""); // State to track email input
  const [error, setError] = useState(""); // State to track validation error
  const [emailSent, setEmailSent] = useState(false); // Track if the email has been sent
  const [timeLeft, setTimeLeft] = useState(0); // Time left for resending the email
  const [sentEmail, setSentEmail] = useState(""); // Store the sent email for display in confirmation
  const [resendAllowed, setResendAllowed] = useState(false); // Track if the "Resend Email" button should be visible
  const navigate = useNavigate(); // Hook to navigate to login page

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      // Once the timer hits 0, allow resend
      setResendAllowed(true);
    }
    return () => clearInterval(timer); // Clean up the timer on component unmount
  }, [timeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if email is entered
    if (!email) {
      setError("Email is required.");
      return;
    }

    // Clear any previous errors
    setError("");

    emailjs
    .send(
      "service_bmc645h", // Service ID
      "template_yobu8h9", // Template ID
      { email: email }, // Email data
      "AmSQoRsfP_t_jW6WI" // Public key (User ID)
    )
    .then(
      (response) => {
        console.log("Success!", response.status, response.text);
        setEmailSent(true);
        setSentEmail(email); // Store the email for confirmation display
        setTimeLeft(60); // Set the 1-minute timer for resending the email
        setResendAllowed(false); // Disable the resend button immediately after sending
        setEmail(""); // Clear the input field after submission
      },
      (error) => {
        console.log("Failed to send email:", error);
        setError(`Failed to send reset email. Please try again. Error: ${error.text || error.message}`);
      }
    );
  };

  const handleBackToLogin = () => {
    navigate("/"); // Navigate back to the login page
  };

  const handleResendEmail = () => {
    // Reset the timer to 60 seconds
    setTimeLeft(60);
    setResendAllowed(false); // Disable the button until the next minute is over
    console.log("Sending password reset email again to:", sentEmail);

    // Resend email again using emailjs
    emailjs
      .send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        { email: sentEmail }, // Parameters to pass to the template (email variable)
        "YOUR_PUBLIC_KEY" // Replace with your public key (User ID from EmailJS)
      )
      .then(
        (response) => {
          console.log("Success!", response.status, response.text);
        },
        (error) => {
          console.log("Failed...", error);
        }
      );
  };

  // Format the timeLeft as a timestamp (e.g., "Reset: 1:00")
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `Reset: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Apply background image using inline style
        backgroundSize: "cover", // Ensure the image covers the whole screen
        backgroundPosition: "center", // Center the image
      }}
    >
      <div className="bg-white p-8 rounded shadow-lg text-center max-w-md w-full">
        {!emailSent ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
            <p className="mb-6">Enter your email to reset your password.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-4 border rounded mb-4 ${
                  error ? "border-red-500" : ""
                }`}
              />
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
                disabled={timeLeft > 0} // Disable the button if timeLeft > 0
              >
                {timeLeft > 0 ? `Please wait ${formatTime(timeLeft)}` : "Reset Password"}
              </button>
              <button
                onClick={handleBackToLogin}
                className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 mt-4"
              >
                Back to Login
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Password Reset Email Sent</h1>
            <p className="mb-6">A password reset email has been sent to:</p>
            <input
              type="email"
              value={sentEmail}
              readOnly
              className="w-full p-4 border rounded mb-4 bg-gray-200 text-gray-600"
            />
            <p className="mb-6">{formatTime(timeLeft)}</p>
            {/* Show the resend button after the timer ends */}
            {resendAllowed && (
              <button
                onClick={handleResendEmail}
                className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
              >
                Resend Email
              </button>
            )}
            <button
              onClick={handleBackToLogin}
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 mt-4"
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Forgot;
