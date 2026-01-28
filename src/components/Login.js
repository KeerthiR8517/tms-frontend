import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../utils/auth";
import "../styles/Login.css";

const LOGIN_MUTATION = gql`
  mutation Login($role: String!) {
    login(role: $role)
  }
`;

export default function Login() {
  const [role, setRole] = useState("EMPLOYEE");
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { role } });
      setAuth(role, data.login);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">TMS Login</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="login-select"
        >
          <option value="ADMIN">Admin</option>
          <option value="EMPLOYEE">Employee</option>
        </select><br></br>

        <button onClick={handleLogin} className="login-btn">
          Login
        </button>
      </div>
    </div>
  );
}