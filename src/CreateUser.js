// import { useState } from "react";
// import "./App.css";
// import axios from "axios";
// import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import image1 from "./images/benkikologo.jpg";
// import WebFont from "webfontloader";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// WebFont.load({
//   google: {
//     families: ["Rubik", "Poppins", "Montserrat"],
//   },
// });

// function CreateUser() {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const handleSubmit = async (e) => {
//     setIsLoading(true);
//     setIsSuccess(false);
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://auth-backend-py1a.vercel.app/api/auth/register",
//         { phoneNumber, password },
//         {
//           headers: {
//             "x-api-key":
//               "GCQI626CM2QRQH4MPOSW5D7GDEUGBY54J3XUAMIPNE4VAXIFGFQN34V5",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log(response.data)
//       if (response.data) {
//         const publicKey = response.data.user.stellarPublicKey;
//         const accRes = await axios.post(
//           "http://localhost:3000/user/create-user",
//           { phoneNumber, publicKey }
//         );
//         console.log('the data that is stored is', accRes.data.success)
//         if (accRes.data.success) {
//           setIsSuccess(true);
//           toast.success('Account Successfully Created!');
//         }
//         console.log(accRes.data);
//       }
//       // console.log(response.data, response.data.stellarPublicKey);
//     } catch (error) {
//       if (error.response.status === 400) {
//         toast.error('User already exists.');
//         console.error('Bad Request: Please check the input data.', error.response.data);
//     } else if(error.response.status === 500){
//       toast.error('An unexpected error occurred.');
//     }
//       console.error("There was an error!", error);
//       setIsSuccess(false);
//     } finally {
//       setIsLoading(false);
      
//     }
//   };

//   return (
//     <>
//       <div className="container-size">
//         <div className="container-spilt">
//           <div className="logo-item">
//             <img
//               src={image1}
//               alt="logo"
//               style={{ height: "50px", width: "50px", borderRadius: "50%" }}
//             />
//             <h4
//               style={{
//                 marginBottom: "5px",
//                 fontFamily: "Poppins",
//                 fontSize: "0.8rem",
//               }}
//             >
//               Benkiko DAO
//             </h4>
//           </div>
//           <div className="heading-create">
//             <p
//               className="header-paragraph"
//               style={{
//                 fontFamily: "Montserrat",
//               }}
//             >
//               Sign Up for an account
//             </p>
//           </div>
//           <div className="container-box">
//             <form onSubmit={handleSubmit}>
//               <div className="container-layout">
//                 <div
//                   style={{ marginTop: "10px", height: "60px", diplay: "grid" }}
//                 >
//                   <input
//                     className="container-input"
//                     style={{
//                       marginTop: "0px",
//                       marginLeft: "30px",
//                       width: "84%",
//                     }}
//                     type="text"
//                     value={phoneNumber}
//                     placeholder="Phone No"
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                   />
//                 </div>
//                 <div
//                   style={{ marginTop: "10px", height: "60px", diplay: "grid" }}
//                 >
//                   <div style={{ position: "relative" }}>
//                     <input
//                       className="container-input"
//                       style={{
//                         marginTop: "0px",
//                         marginLeft: "30px",
//                         width: "84%",
//                       }}
//                       type={showPassword ? "text" : "password"}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Password"
//                     />
//                     <span
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="show-password"
//                     >
//                       {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
//                     </span>
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     marginTop: "20px",
//                     display: "flex",
//                     alignItems: "center",
//                     height: "50px",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <button type="submit" className="create-button">
//                     {isLoading ? (
//                       <span>
//                         <AiOutlineLoading3Quarters />
//                       </span> // Replace with your loading icon
//                     ) : isSuccess ? (
//                       "Success" // Success message/icon
//                     ) : (
//                       "Sign Up"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </form>
//             <ToastContainer position="top-center" autoClose={5000} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CreateUser;


import React, { useState, useEffect } from "react";
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

const CreateUser = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    if (password && confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      setPasswordsMatch(true); // Reset when empty
    }
  }, [password, confirmPassword]);

  const formSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords before submission
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!phoneNumber || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);

    try {
      const response = await axios.post(
        "https://auth-backend-py1a.vercel.app/api/auth/register",
        { phoneNumber, password },
        {
          headers: {
            "x-api-key": "GCQI626CM2QRQH4MPOSW5D7GDEUGBY54J3XUAMIPNE4VAXIFGFQN34V5",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        console.log(response.data)
        const publicKey = response.data.user.stellarPublicKey;
        const accRes = await axios.post(
          "http://vwcoo04wgg8ssk44cc0cws0s.95.111.251.93.sslip.io/user/create-user",
          { phoneNumber, publicKey }
        );
        
        if (accRes.data) {
          setIsSuccess(true);
          toast.success("Account created successfully");
          // Reset form after success
          setPhoneNumber("");
          setPassword("");
          setConfirmPassword("");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('User already exists or invalid data');
        } else if (error.response.status === 404) {
          toast.error('Endpoint not found. Please check the URL.');
        } else if (error.response.status === 500) {
          toast.error('Server error. Please try again later.');
        } else {
          toast.error('An error occurred. Please try again.');
        }
      } else if (error.request) {
        toast.error('No response from server. Check your connection.');
      } else {
        toast.error('Request setup error: ' + error.message);
      }
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
            Sign Up for an account
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
              minLength={6}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer", fontSize: "1.2rem", color: "#6c757d", marginTop: '18px' }}
            >
              {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
            </span>
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${!passwordsMatch && confirmPassword ? 'is-invalid' : ''}`}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
            {!passwordsMatch && confirmPassword && (
              <div className="invalid-feedback">Passwords do not match</div>
            )}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer", fontSize: "1.2rem", color: "#6c757d", marginTop: '18px' }}
            >
              {showPassword ? <RiEyeCloseLine /> : <RiEyeLine />}
            </span>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
            disabled={isLoading || !passwordsMatch}
            style={{ borderRadius: "0.5rem" }}
          >
            {isLoading ? (
              <>
                <AiOutlineLoading3Quarters className="me-2 spinner-border spinner-border-sm" />
                Creating Account...
              </>
            ) : isSuccess ? (
              "Success"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <ToastContainer position="top-center" autoClose={5000} />
      </div>
    </div>
  );
}

export default CreateUser;