import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { loginUser } from "../services/api";
import { saveToken } from "../utils/auth";

import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const token = await loginUser({
        email: email.trim(),
        password,
      });

      saveToken(token);

      navigate("/dashboard");
    } catch (error) {
      setMessage(
        error.message ||
          "Unable to login. Please check your credentials."
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
                TRAVEL PLANNING MADE SIMPLE
              </p>

              <h1>
                Your entire journey,
                <br />
                organized in one place.
              </h1>

              <p className="showcase-description">
                Plan trips, build day-wise
                itineraries, discover attractions
                and keep your travel budget under
                control.
              </p>

              <div className="feature-list">
                <div className="feature-item">
                  <span className="feature-icon">
                    01
                  </span>

                  <div>
                    <strong>
                      Plan your journey
                    </strong>

                    <p>
                      Create and manage all your
                      travel plans.
                    </p>
                  </div>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">
                    02
                  </span>

                  <div>
                    <strong>
                      Build your itinerary
                    </strong>

                    <p>
                      Organize activities day by
                      day.
                    </p>
                  </div>
                </div>

                <div className="feature-item">
                  <span className="feature-icon">
                    03
                  </span>

                  <div>
                    <strong>
                      Track your budget
                    </strong>

                    <p>
                      Monitor expenses throughout
                      your trip.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="showcase-footer">
              Plan smarter. Travel better.
            </p>
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-card">
            <div className="mobile-brand">
              TravelFlow
              <span className="brand-dot"></span>
            </div>

            <div className="auth-heading">
              <p className="auth-label">
                WELCOME BACK
              </p>

              <h2>Login to TravelFlow</h2>

              <p>
                Enter your account details to
                continue planning your journey.
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    autoComplete="current-password"
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
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>
                </div>
              </div>

              <button
                className="auth-button"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="button-spinner"></span>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span></span>
              <p>NEW TO TRAVELFLOW?</p>
              <span></span>
            </div>

            <p className="auth-link">
              Don't have an account?{" "}
              <Link to="/register">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;