import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

function App() {
  const [form, setForm] = useState({
    username: "",
    paymail: "",
    password: "",
    publicKey: "",
    secretKey: "",
    mnemonic: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("https://konvobotwhatsapp.loca.lt/data");
        const { accountData1, mnemo, usname } = res.data;
        const { data } = accountData1;

        setForm((prevForm) => ({
          ...prevForm,
          username: usname,
          publicKey: data["public key"],
          paymail: data.paymail,
          secretKey: data["secret key"],
          mnemonic: mnemo,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
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
      const response = await axios.post('https://api.kipaji.app/api/v1/auth/register', form);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="container-box">
      <form onSubmit={handleSubmit}>
        <div className="container-layout">
          <div style={{ height: "120px", marginTop: "20px" }}>
            <div
              style={{
                height: "60px",
                width: "200px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            ></div>
            <h5 style={{ marginTop: "-4px", color: "GrayText" }}>
              Welcome To Benkiko
            </h5>
            <h3 style={{ marginTop: "-18px" }}>Complete your Sign Up</h3>
          </div>
          <div style={{ marginTop: "20px", height: "60px", diplay: "grid" }}>
            <div>
              <p style={{ fontSize: "0.9rem", marginTop: "-7px" }}>
                First Name
              </p>
            </div>
            <div>
              <input
                className="container-input"
                style={{ marginTop: "-6px" }}
                type="text"
                name="firstname"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div style={{ marginTop: "20px", height: "60px", diplay: "grid" }}>
            <div>
              <p style={{ fontSize: "0.9rem", marginTop: "-7px" }}>Last Name</p>
            </div>
            <div>
              <input
                className="container-input"
                style={{ marginTop: "-6px" }}
                type="text"
                name="lastname"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ marginTop: "20px", height: "60px", diplay: "grid" }}>
            <div>
              <p style={{ fontSize: "0.9rem", marginTop: "-7px" }}>Username</p>
            </div>
            <div>
              <input
                className="container-input"
                style={{ marginTop: "-6px" }}
                type="text"
                name="username"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div style={{ marginTop: "20px", height: "60px", diplay: "grid" }}>
            <p style={{ fontSize: "0.9rem", marginTop: "-7px" }}>Email</p>
            <input
              className="container-input"
              type="email"
              name="email"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div style={{ marginTop: "20px", height: "60px", diplay: "grid" }}>
            <p style={{ fontSize: "0.9rem", marginTop: "-7px" }}>
              New Password
            </p>
            <div style={{ position: "relative" }}>
              <input
                className="container-input"
                style={{ marginTop: "-10px" }}
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.name}
                onChange={handleChange}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
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
              style={{
                width: "70%",
                height: "40px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "yellow",
                fontWeight: "600",
                color: "white",
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
