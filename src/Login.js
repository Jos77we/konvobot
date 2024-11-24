import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import img1 from "./images/benkikologo.jpg";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import WebFont from "webfontloader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const formSubmit = async (e) => {
    setIsLoading(true);
    setIsSuccess(false);
    e.preventDefault();
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
        const publicKey = response.data.user.stellarPublicKey;
        const accRes = await axios.post(
          "https://konvobotchat.onrender.com/login/user-login",
          { phoneNumber, publicKey }
        );
        if (accRes.data) {
          setIsSuccess(true);
          toast.success('Account Successfully Created!');
        }
        console.log(accRes.data);
      }
      // console.log(response.data, response.data.stellarPublicKey);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('User already exists.');
        console.error('Bad Request: Please check the input data.', error.response.data);
  
      
      } else if(error.response.status === 500){
        toast.error('An unexpected error occurred.');
      }
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login-tab">
        <div className="logo-item">
          <img
            src={img1}
            alt="logo"
            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
          />
          <h4
            style={{
              marginBottom: "5px",
              fontFamily: "Poppins",
              fontSize: "0.8rem",
            }}
          >
            Benkiko DAO
          </h4>
        </div>
        <div className="login-category">
          <p style={{ fontFamily: "Montserrat" }} className="header-login">
            Welcome Back
          </p>
          <div
            style={{
              height: "80%",
              width: "70%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "6%",
            }}
          >
            <form onSubmit={formSubmit}>
              <div>
                <input
                  className="container-input"
                  type="text"
                  value={phoneNumber}
                  placeholder="Phone No"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div style={{ position: "relative" }}>
                <input
                  className="container-input"
                  
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                    className="show-password" style={{top:'70%', right:'40px'}}
                >
                  {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
                </span>
              </div>
              <p
                style={{ fontFamily: "Rubik", fontSize: "0.7rem" }}
                className="password"
              >
                Forgot Password?
              </p>
              <button type="submit" className="button-layout">
                {isLoading ? (
                  <span>
                    <AiOutlineLoading3Quarters />
                  </span> // Replace with your loading icon
                ) : isSuccess ? (
                  "Success" // Success message/icon
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <ToastContainer position="top-center" autoClose={5000} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
