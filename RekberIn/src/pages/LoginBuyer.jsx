import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './assets/Login.css'

const LoginBuyer = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      console.log("Login successful");
      setError("");
      navigate("/form-buyer");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div id="buyer">
      <div className="container buyer-container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="login-form">
              <h2 className="fw-bold mb-4">Login-Pembeli</h2>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (<div className="alert alert-danger alert-login">{error}</div>)}
              <div className="login-controls">
              <button className="btn btn-primary mt-4" onClick={handleLogin}>
                Login
              </button>
              <a href="/forgot-password" className="forgot-password-link pt-4">
                Lupa Password?
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBuyer;
