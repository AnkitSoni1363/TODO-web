import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.token) {
      localStorage.setItem("token", json.token);
      navigate("/home");
    } else if (json.errors) {
      alert(json.errors[0].msg);
    } else {
      alert("enter valid details");
    }
  };

  const onemailchange = (e) => {
    setEmail(e.target.value);
  };

  const onpasswordchange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h3 className="w-50 test-start">
        <strong>Signup</strong>
      </h3>
      <form className="w-50 mt-3" onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <strong>Email address</strong>
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            aria-describedby="emailHelp"
            onChange={onemailchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={onpasswordchange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
