import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <main className="home-page">
      <nav className="home-navbar">
        <Link to="/" className="home-logo">
          TravelFlow
          <span></span>
        </Link>

        <div className="home-nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>

          <Link
            to="/login"
            className="home-login"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="home-register"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="home-hero">
        <div className="hero-left">
          <p className="home-label">
            YOUR COMPLETE TRAVEL PLANNER
          </p>

          <h1>
            Plan smarter.
            <br />
            Travel <span>better.</span>
          </h1>

          <p className="home-hero-description">
            Organize your trips, create day-wise
            itineraries, manage travel expenses and
            discover attractions — all from one
            simple platform.
          </p>

          <div className="hero-buttons">
            <Link
              to="/register"
              className="primary-home-button"
            >
              Start Planning
              <span>→</span>
            </Link>

            <Link
              to="/login"
              className="secondary-home-button"
            >
              Login to Account
            </Link>
          </div>

          <div className="hero-benefits">
            <div>
              <strong>01</strong>
              <span>Plan Trips</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Track Budget</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Discover Places</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="travel-preview">
            <div className="preview-top">
              <div>
                <p>UPCOMING TRIP</p>
                <h3>Goa</h3>
              </div>

              <div className="preview-plane">
                ✈
              </div>
            </div>

            <div className="preview-dates">
              <div>
                <span>START</span>
                <strong>10 DEC</strong>
              </div>

              <div className="preview-line">
                <span></span>
                <p>→</p>
                <span></span>
              </div>

              <div>
                <span>END</span>
                <strong>15 DEC</strong>
              </div>
            </div>

            <div className="preview-budget">
              <div className="preview-budget-heading">
                <span>Travel Budget</span>
                <strong>₹25,000</strong>
              </div>

              <div className="preview-progress">
                <div></div>
              </div>

              <div className="preview-budget-values">
                <span>₹5,000 spent</span>
                <span>₹20,000 remaining</span>
              </div>
            </div>

            <div className="preview-itinerary">
              <p>TODAY'S PLAN</p>

              <div className="preview-activity">
                <span className="activity-time-home">
                  09:00
                </span>

                <div>
                  <strong>Beach Visit</strong>
                  <p>📍 Baga Beach</p>
                </div>
              </div>

              <div className="preview-activity">
                <span className="activity-time-home">
                  13:00
                </span>

                <div>
                  <strong>Lunch</strong>
                  <p>📍 Panjim</p>
                </div>
              </div>

              <div className="preview-activity">
                <span className="activity-time-home">
                  17:30
                </span>

                <div>
                  <strong>Sunset View</strong>
                  <p>📍 Anjuna Beach</p>
                </div>
              </div>
            </div>
          </div>

          <div className="floating-card floating-attractions">
            <span>📍</span>

            <div>
              <strong>Discover</strong>
              <p>Nearby attractions</p>
            </div>
          </div>

          <div className="floating-card floating-budget">
            <span>₹</span>

            <div>
              <strong>Budget</strong>
              <p>Track expenses</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="features-section"
        id="features"
      >
        <div className="section-title">
          <p className="home-label">
            EVERYTHING YOU NEED
          </p>

          <h2>
            One platform for your
            <br />
            entire journey
          </h2>

          <p>
            TravelFlow brings the important parts of
            travel planning together in one place.
          </p>
        </div>

        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-number">
              01
            </div>

            <div className="home-feature-icon">
              ✈
            </div>

            <h3>Trip Management</h3>

            <p>
              Create trips with destinations,
              travel dates, budgets and trip
              descriptions.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-number">
              02
            </div>

            <div className="home-feature-icon">
              📅
            </div>

            <h3>Day-wise Itinerary</h3>

            <p>
              Organize activities with dates,
              timings, locations and notes for your
              journey.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-number">
              03
            </div>

            <div className="home-feature-icon">
              ₹
            </div>

            <h3>Budget Tracking</h3>

            <p>
              Record expenses and automatically
              monitor your total spending and
              remaining budget.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-number">
              04
            </div>

            <div className="home-feature-icon">
              📍
            </div>

            <h3>Attraction Discovery</h3>

            <p>
              Find interesting tourist attractions
              around your selected destination.
            </p>
          </article>
        </div>
      </section>

      <section
        className="how-section"
        id="how-it-works"
      >
        <div className="how-heading">
          <p className="home-label">
            SIMPLE WORKFLOW
          </p>

          <h2>
            From idea to itinerary
            <br />
            in four simple steps.
          </h2>
        </div>

        <div className="steps-grid">
          <div className="step">
            <span>01</span>

            <div className="step-line"></div>

            <h3>Create Account</h3>

            <p>
              Register securely and login to your
              TravelFlow account.
            </p>
          </div>

          <div className="step">
            <span>02</span>

            <div className="step-line"></div>

            <h3>Create Trip</h3>

            <p>
              Add your destination, travel dates
              and planned budget.
            </p>
          </div>

          <div className="step">
            <span>03</span>

            <div className="step-line"></div>

            <h3>Build Your Plan</h3>

            <p>
              Add itinerary activities and discover
              attractions.
            </p>
          </div>

          <div className="step">
            <span>04</span>

            <div className="step-line"></div>

            <h3>Track Expenses</h3>

            <p>
              Record travel spending and monitor
              your remaining budget.
            </p>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div>
          <p className="home-label">
            READY TO TRAVEL?
          </p>

          <h2>
            Your next journey starts
            with a plan.
          </h2>

          <p>
            Create your TravelFlow account and start
            organizing your next adventure.
          </p>
        </div>

        <Link
          to="/register"
          className="cta-button"
        >
          Get Started Free →
        </Link>
      </section>

      <footer className="home-footer">
        <Link to="/" className="footer-logo">
          TravelFlow
          <span></span>
        </Link>

        <p>
          Travel Planning & Management System
        </p>

        <p>
          © 2026 TravelFlow
        </p>
      </footer>
    </main>
  );
}

export default Home;