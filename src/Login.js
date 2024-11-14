import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import img1 from './images/benkikologo.jpg'
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Rubik', 'Poppins', 'Montserrat']
  }
});

const Login = () => {
  const [formIn, setFormIn] = useState({
    paymail: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormIn({
      ...formIn,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://konvobotwhatsapp.loca.lt/whatsapp/login-user",
        formIn
      );

      if (response.status === 200) {
        alert("Login successful");
      } else if (response.status === 400) {
        alert("Error in obtaining details");
      } else {
        alert("Internal error");
      }

      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-tab">
        <div className="logo-item">
         <img src={img1} alt="logo" style={{height:"50px", width:"50px", borderRadius:"50%"}}/>
         <h4 style={{marginBottom:"5px", fontFamily:'Poppins', fontSize:'0.8rem'}}>Benkiko DAO</h4>
        </div>
      <div className="login-category">
        <p style={{fontFamily: 'Montserrat' }} className="header-login">Welcome Back</p>
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
                name="paymail"
                value={formIn.paymail}
                onChange={handleChange}
                placeholder="Paymail"
              />
            </div>
            <div>
              <input
                className="container-input"
                type="password"
                name="password"
                placeholder="Password"
                value={formIn.password}
                onChange={handleChange}
              />
            </div>
            <p style={{fontFamily:'Rubik', fontSize:'0.7rem'}} className="password">Forgot Password?</p>
            <button
              type="submit"
             className="button-layout"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
