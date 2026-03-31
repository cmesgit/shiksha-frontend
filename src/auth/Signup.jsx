import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSubmitting(false);
      return;
    }

    setError("");
    console.log({ email, username, password });

    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="signup-container">
      {/* Hero-style bottom-left glow */}
      <div className="signup-glow"></div>

      <div className="signup-form">
        <h2>Sign Up</h2>

        {error && <p className="error general-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="signup-form-group">
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="signup-form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
          </div>

          <div className="signup-form-group">
            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setShowConfirm((p) => !p)}
              >
                {showConfirm ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;