import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { registerUser } from "../services/api";

import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    if (password.length < 8) {
      setMessage(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      alert(
        "Registration successful. Please login."
      );

      navigate("/login");
    } catch (error) {
      setMessage(
        error.message ||
          "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-container">
        <div className="auth-showcase">
          <div className="showcase-content">
            <Link
              to="/login"
              className="auth-brand"
            >
              TravelFlow
              <span className="brand-dot"></span>
            </Link>

            <div className="showcase-main">
              <p className="showcase-label">
                START YOUR JOURNEY
              </p>

              <h1>
                Plan less.
                <br />
                Experience more.
              </h1>

              <p className="showcase-description">
                Create your TravelFlow account and
                organize your trips, itineraries,
                expenses and destination discovery
                from one dashboard.
              </p>

              <div className="feature-list">
                <div className="feature-item">
                  <span className="feature-icon">
                    01
                  </span>

                  <div>
                    <strong>
                      Create trips
                    </strong>

                    <p>
                      Keep your travel plans
                      organized.
                    </p>
                  </div>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">
                    02
                  </span>

                  <div>
                    <strong>
                      Discover attractions
                    </strong>

                    <p>
                      Find places to explore at your
                      destination.
                    </p>
                  </div>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">
                    03
                  </span>

                  <div>
                    <strong>
                      Control spending
                    </strong>

                    <p>
                      Track your travel expenses and
                      remaining budget.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="showcase-footer">
              Your journey starts here.
            </p>
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-card register-card">
            <div className="mobile-brand">
              TravelFlow
              <span className="brand-dot"></span>
            </div>

            <div className="auth-heading">
              <p className="auth-label">
                CREATE ACCOUNT
              </p>

              <h2>Join TravelFlow</h2>

              <p>
                Create an account and start
                planning your next adventure.
              </p>
            </div>

            {message && (
              <div className="auth-error">
                <span className="error-icon">
                  !
                </span>

                <span>{message}</span>
              </div>
            )}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <div className="auth-form-group">
                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  autoComplete="name"
                  required
                />
              </div>

              <div className="auth-form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-form-group">
                <label htmlFor="password">
                  Password
                </label>

                <div className="password-field">
                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    minLength="8"
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (previous) =>
                          !previous
                      )
                    }
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password again"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  minLength="8"
                  autoComplete="new-password"
                  required
                />
              </div>

              <p className="password-hint">
                Use at least 8 characters for your
                password.
              </p>

              <button
                className="auth-button"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="button-spinner"></span>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span></span>
              <p>ALREADY A MEMBER?</p>
              <span></span>
            </div>

            <p className="auth-link">
              Already have an account?{" "}
              <Link to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;