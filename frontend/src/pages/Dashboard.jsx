import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);
        setError("");
      } catch {
        setError("Unable to load dashboard.");
      }
    };

    loadDashboard();
  }, []);

  if (error) {
    return (
      <>
        <Navbar />

        <main className="dashboard-page">
          <div className="dashboard-message error-message">
            <h2>Unable to load dashboard</h2>
            <p>{error}</p>
          </div>
        </main>
      </>
    );
  }

  if (!dashboard) {
    return (
      <>
        <Navbar />

        <main className="dashboard-page">
          <div className="dashboard-message">
            <div className="loading-spinner"></div>
            <h2>Loading your dashboard...</h2>
          </div>
        </main>
      </>
    );
  }

  const totalBudget = Number(
    dashboard.totalBudget || 0
  );

  const totalExpenses = Number(
    dashboard.totalExpenses || 0
  );

  const remainingBudget = Number(
    dashboard.remainingBudget || 0
  );

  const spentPercentage =
    totalBudget > 0
      ? Math.min(
          (totalExpenses / totalBudget) * 100,
          100
        )
      : 0;

  return (
    <>
      <Navbar />

      <main className="dashboard-page">
        <section className="dashboard-header">
          <div>
            <p className="dashboard-label">
              TRAVELFLOW
            </p>

            <h1>Travel Dashboard</h1>

            <p className="dashboard-subtitle">
              Plan your trips, track expenses and
              manage your travel journey from one
              place.
            </p>
          </div>

          <Link
            to="/trips"
            className="create-trip-link"
          >
            + Plan New Trip
          </Link>
        </section>

        <section className="dashboard-grid">
          <article className="dashboard-card">
            <div className="dashboard-card-icon">
              ✈
            </div>

            <div>
              <span>Total Trips</span>

              <strong>
                {dashboard.totalTrips || 0}
              </strong>

              <small>
                Trips created in TravelFlow
              </small>
            </div>
          </article>

          <article className="dashboard-card">
            <div className="dashboard-card-icon">
              📅
            </div>

            <div>
              <span>Upcoming Trips</span>

              <strong>
                {dashboard.upcomingTrips || 0}
              </strong>

              <small>
                Adventures waiting for you
              </small>
            </div>
          </article>

          <article className="dashboard-card">
            <div className="dashboard-card-icon">
              ₹
            </div>

            <div>
              <span>Total Budget</span>

              <strong>
                ₹
                {totalBudget.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </strong>

              <small>
                Combined trip budget
              </small>
            </div>
          </article>

          <article className="dashboard-card">
            <div className="dashboard-card-icon">
              ↗
            </div>

            <div>
              <span>Total Expenses</span>

              <strong>
                ₹
                {totalExpenses.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </strong>

              <small>
                Money spent on your trips
              </small>
            </div>
          </article>
        </section>

        <section className="dashboard-bottom-grid">
          <article className="budget-overview">
            <div className="budget-overview-header">
              <div>
                <p className="dashboard-label">
                  BUDGET OVERVIEW
                </p>

                <h2>Travel Budget</h2>
              </div>

              <div className="remaining-budget">
                <span>Remaining</span>

                <strong>
                  ₹
                  {remainingBudget.toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </strong>
              </div>
            </div>

            <div className="budget-values">
              <div>
                <span>Budget</span>
                <strong>
                  ₹
                  {totalBudget.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

              <div>
                <span>Spent</span>
                <strong>
                  ₹
                  {totalExpenses.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>
            </div>

            <div className="budget-progress">
              <div
                className="budget-progress-fill"
                style={{
                  width: `${spentPercentage}%`,
                }}
              ></div>
            </div>

            <p className="budget-progress-text">
              {spentPercentage.toFixed(0)}% of your
              total travel budget has been used.
            </p>
          </article>

          <article className="quick-actions">
            <p className="dashboard-label">
              QUICK ACTIONS
            </p>

            <h2>Start Planning</h2>

            <p>
              Create a trip and manage its itinerary,
              expenses and attractions.
            </p>

            <Link
              to="/trips"
              className="quick-action-button"
            >
              View My Trips →
            </Link>
          </article>
        </section>
      </main>
    </>
  );
}

export default Dashboard;