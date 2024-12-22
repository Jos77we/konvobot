import { useState } from "react";
import "./App.css";
import axios from "axios";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import image1 from "./images/benkikologo.jpg";
import WebFont from "webfontloader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


WebFont.load({
  google: {
    families: ["Rubik", "Poppins", "Montserrat"],
  },
});

function CreateUser() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    setIsSuccess(false);
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://auth-backend-khaki.vercel.app/api/auth/register",
        { phoneNumber, password },
        {
          headers: {
            "x-api-key":
              "GCQI626CM2QRQH4MPOSW5D7GDEUGBY54J3XUAMIPNE4VAXIFGFQN34V5",
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data)
      if (response.data) {
        const publicKey = response.data.user.stellarPublicKey;
        const accRes = await axios.post(
          "https://konvobotchat.onrender.com/user/create-user",
          { phoneNumber, publicKey }
        );
        console.log('the data that is stored is', accRes.data.success)
        if (accRes.data.success) {
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
      console.error("There was an error!", error);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      
    }
  };

  return (
    <>
      <div className="container-size">
        <div className="container-spilt">
          <div className="logo-item">
            <img
              src={image1}
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
          <div className="heading-create">
            <p
              className="header-paragraph"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              Sign Up for an account
            </p>
          </div>
          <div className="container-box">
            <form onSubmit={handleSubmit}>
              <div className="container-layout">
                <div
                  style={{ marginTop: "10px", height: "60px", diplay: "grid" }}
                >
                  <input
                    className="container-input"
                    style={{
                      marginTop: "0px",
                      marginLeft: "30px",
                      width: "84%",
                    }}
                    type="text"
                    value={phoneNumber}
                    placeholder="Phone No"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div
                  style={{ marginTop: "10px", height: "60px", diplay: "grid" }}
                >
                  <div style={{ position: "relative" }}>
                    <input
                      className="container-input"
                      style={{
                        marginTop: "0px",
                        marginLeft: "30px",
                        width: "84%",
                      }}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="show-password"
                    >
                      {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    height: "50px",
                    justifyContent: "center",
                  }}
                >
                  <button type="submit" className="create-button">
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
                </div>
              </div>
            </form>
            <ToastContainer position="top-center" autoClose={5000} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
