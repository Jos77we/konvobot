import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import image1 from "./images/benkikologo.jpg";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Rubik", "Poppins", "Montserrat"],
  },
});

function CreateUser() {
  const { state } = useLocation();
  const userName = state?.userName || "";

  const [form, setForm] = useState({
    username: "",
    paymail: "",
    password: "",
    publicKey: "",
    secretKey: "",
    mnemonic: "",
    email: "",
    firstname: "",
    lastname: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.post("http://localhost:3000/data", {
          userName,
        });
        console.log(res.data);
        const {
          accountDetails: {
            accountData1: {
              data: {
                "public key": publicKey,
                "secret key": secretKey,
                paymail,
              },
            },
            mnemo,
            usname,
          },
        } = res.data;
        console.log("accountDetails:", res.data.accountDetails.accountData1);
        // const { data } = accountData1;

        setForm((prevForm) => ({
          ...prevForm,
          username: usname,
          publicKey: publicKey,
          paymail: paymail,
          secretKey: secretKey,
          mnemonic: mnemo,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/whatsapp/create",
        { form }
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
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
                    name="phone"
                    value={form.name}
                    placeholder="Phone No"
                    onChange={handleChange}
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
                      name="password"
                      value={form.name}
                      onChange={handleChange}
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
                  <button
                    type="submit"
                   className="create-button"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
