import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../features/auth/authSlice";
import authService from "../services/authService";
import "../styles/auth.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await authService.login({ email, password });
      dispatch(setCredentials(userData));
      setUser(userData.user);
      if (userData?.user?.isEmailVerified) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.resendVerifyEmailLink(email);
      alert(res.message);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      {user && !user.isEmailVerified ? (
        <div className="verify-email">
          <h3>We have sent a link on your email to verify your account.</h3>
          <div className="verify-email">
            Click here if you not received the mail
            <button onClick={handleEmailVerification} className="btn-primary">
              Send Again
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Login
          </button>
          <div className="auth-links">
            <a href="/reset-password">Forgot Password?</a>
            <a href="/signup">Don't have an account? Sign up</a>
          </div>
        </form>
      )}
    </div>
  );
}
