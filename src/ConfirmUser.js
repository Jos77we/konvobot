import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom'


const ConfirmUser = () => {
  const [userName, setUserName] = useState("");
  const history = useNavigate();


    const submitUser = async (event) => {
      event.preventDefault()

      try {
        const rest = await axios.post("https://konvobotwhatsapp.loca.lt/data", userName)
        if(rest.code === 200){
          history.push("/create-user")
        } else {
          alert("User not found")
        }
      } catch (error) {
        console.log(error)
      }

  };
  return (
    <>
      <div className="confirm-box">
        <div className="confirm-container">
          <form onSubmit={submitUser}>
          <h4>Verify your user handle</h4>
          <div style={{ marginLeft: "20px" }}>
            <p style={{ fontSize: "0.9rem", marginTop: "10px" }}>
              Confirm userName
            </p>
          </div>
          <div>
            <input
              className="container-input"
              style={{ marginTop: "-6px", width: "75%", marginLeft: "20px" }}
              type="text"
              value={userName.name}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          
          <div>
            <button style={{ marginLeft: "80%", marginTop: "20px" }}>
              Submit
            </button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmUser;
