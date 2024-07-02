import React, { useState } from "react";
import "./App.css";
import axios from 'axios'

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
        "https://api.kipaji.app/api/v1/auth/register",
        formIn
      );
      if (!response.data) {
        alert("There is an error");
      } else {
        axios.post("http://localhost:3000/login-user", {response})
        alert("You are readily logged in");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-container">
      <div className="login-tab">
        <h5>Login To Benkiko</h5>
        <div
          style={{
            height: "200px",
            width: "85%",
            border: "1px green solid",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "15%",
          }}
        >
          <form onSubmit={formSubmit}>
            <div>
              <p style={{ fontSize: "0.9rem", marginTop: "10px" }}>Paymail</p>
            </div>
            <div>
              <input
                className="container-input"
                style={{ marginTop: "-6px", width: "75%" }}
                type="text"
                name="firstname"
                value={formIn.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <p style={{ fontSize: "0.9rem", marginTop: "10px" }}>Password</p>
            </div>
            <div>
              <input
                className="container-input"
                style={{ marginTop: "-6px", width: "75%" }}
                type="text"
                name="firstname"
                value={formIn.name}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
