import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import img1 from "./images/benkikologo.jpg";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import WebFont from "webfontloader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

WebFont.load({
  google: {
    families: ["Rubik", "Poppins", "Montserrat"],
  },
});

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const API_URL = 'http://vwcoo04wgg8ssk44cc0cws0s.95.111.251.93.sslip.io'
  const formSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const response = await axios.post(
        "https://auth-backend-py1a.vercel.app/api/auth/login",
        { phoneNumber, password },
        {
          headers: {
            "x-api-key":
              "GCQI626CM2QRQH4MPOSW5D7GDEUGBY54J3XUAMIPNE4VAXIFGFQN34V5",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        console.log(`${process.env.API_URL}`)
        const publicKey = response.data.user.stellarPublicKey;
        const accRes = await axios.post(
          `${API_URL}/login/user-login`,
          { phoneNumber, publicKey }
        );
        if (accRes.data) {
          setIsSuccess(true);
          toast.success("Log in was successful");
        }
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Wrong login credentials.");
      } else if (error.response?.status === 500) {
        toast.error("An unexpected error occurred.");
      }
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "1.2rem",
          fontFamily: "Poppins",
        }}
      >
        <div className="text-center mb-4">
          <img
            src={img1}
            alt="logo"
            className="rounded-circle mb-3"
            style={{ height: "70px", width: "70px" }}
          />
          <h5 style={{ fontWeight: "600" }}>Benkiko DAO</h5>
          <small style={{ fontFamily: "Montserrat", fontSize: "0.85rem" }}>
            Welcome Back
          </small>
        </div>

        <form onSubmit={formSubmit}>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer", fontSize: "1.2rem", color: "#6c757d", marginTop: '18px' }}
            >
              {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
            </span>
          </div>

          <div className="text-end mb-3">
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none"
              style={{ fontSize: "0.8rem" }}
              onClick={() => {
                // Future logic: navigate or show a modal
                console.log("Forgot Password clicked");
              }}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
            disabled={isLoading}
            style={{ borderRadius: "0.5rem" }}
          >
            {isLoading ? (
              <>
                <AiOutlineLoading3Quarters className="me-2 spinner-border spinner-border-sm" />
                Signing In...
              </>
            ) : isSuccess ? (
              "Success"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <ToastContainer position="top-center" autoClose={5000} />
      </div>
    </div>
  );
};

export default Login;
