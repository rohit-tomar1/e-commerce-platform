import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import authService from "../services/authService";
import "../styles/auth.scss";

export function VerificationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const forEmail = type === "email";

  useEffect(() => {
    if (forEmail) {
      handleEmailVerification();
    }
  }, [forEmail]);

  const handleEmailVerification = async () => {
    try {
      setLoading(true);
      await authService.verifyEmail(token);
      setVerified(true);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      alert("Password should not be empty");
      return;
    }
    try {
      await authService.resetPasswordUsingToken(token, password);
      alert("Password reset successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      {forEmail ? (
        loading ? (
          <div className="loader">Verifying email...</div>
        ) : verified ? (
          <div className="text-center ">
            <div>
              <h2>Thanks for verifying your email</h2>
            </div>
            <div>
              <a href="/login" className="btn-primary">
               Go to Login
              </a>
            </div>
          </div>
        ) : null
      ) : (
        <form onSubmit={handleResetPassword} className="auth-form">
          <h2>Reset Password</h2>
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
            Submit
          </button>
          <div className="auth-links">
            <a href="/login">Login</a>
          </div>
        </form>
      )}
    </div>
  );
}
