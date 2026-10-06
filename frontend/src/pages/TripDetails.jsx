import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getTrips,
  getItineraries,
  createItinerary,
  updateItinerary,
  deleteItinerary,
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getBudgetSummary,
  getAttractions,
} from "../services/api";

import "../styles/tripDetails.css";

const emptyItinerary = {
  activityDate: "",
  activityTime: "",
  activity: "",
  location: "",
  notes: "",
};

const emptyExpense = {
  category: "",
  description: "",
  amount: "",
  expenseDate: "",
};

function TripDetails() {
  const { tripId } = useParams();

  const [trip, setTrip] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(null);
  const [attractions, setAttractions] = useState([]);

  const [itineraryForm, setItineraryForm] =
    useState(emptyItinerary);

  const [expenseForm, setExpenseForm] =
    useState(emptyExpense);

  const [editingItinerary, setEditingItinerary] =
    useState(null);

  const [editingExpense, setEditingExpense] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [itinerarySaving, setItinerarySaving] =
    useState(false);
  const [expenseSaving, setExpenseSaving] =
    useState(false);
  const [attractionsLoading, setAttractionsLoading] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);
        setError("");

        const tripsData = await getTrips();

        const currentTrip = tripsData.find(
          (item) =>
            String(item.id) === String(tripId)
        );

        if (!currentTrip) {
          setError("Trip not found.");
          return;
        }

        const [
          itineraryData,
          expenseData,
          budgetData,
        ] = await Promise.all([
          getItineraries(tripId),
          getExpenses(tripId),
          getBudgetSummary(tripId),
        ]);

        setTrip(currentTrip);
        setItineraries(itineraryData);
        setExpenses(expenseData);
        setBudget(budgetData);
      } catch (err) {
        setError(
          err.message ||
            "Unable to load trip details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [tripId]);

  const showSuccess = (message) => {
    setSuccess(message);

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  const refreshItineraries = async () => {
    const data = await getItineraries(tripId);
    setItineraries(data);
  };

  const refreshExpenses = async () => {
    const [expenseData, budgetData] =
      await Promise.all([
        getExpenses(tripId),
        getBudgetSummary(tripId),
      ]);

    setExpenses(expenseData);
    setBudget(budgetData);
  };

  const handleItineraryChange = (event) => {
    const { name, value } = event.target;

    setItineraryForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleItinerarySubmit = async (event) => {
    event.preventDefault();

    if (!trip) {
      return;
    }

    if (
      itineraryForm.activityDate < trip.startDate ||
      itineraryForm.activityDate > trip.endDate
    ) {
      setError(
        `Activity date must be between ${formatDate(
          trip.startDate
        )} and ${formatDate(trip.endDate)}.`
      );
      return;
    }

    try {
      setItinerarySaving(true);
      setError("");
      setSuccess("");

      if (editingItinerary) {
        await updateItinerary(
          tripId,
          editingItinerary,
          itineraryForm
        );

        showSuccess(
          "Itinerary activity updated successfully."
        );
      } else {
        await createItinerary(
          tripId,
          itineraryForm
        );

        showSuccess(
          "Itinerary activity added successfully."
        );
      }

      setItineraryForm(emptyItinerary);
      setEditingItinerary(null);

      await refreshItineraries();
    } catch (err) {
      setError(
        err.message ||
          "Unable to save itinerary activity."
      );
    } finally {
      setItinerarySaving(false);
    }
  };

  const handleEditItinerary = (item) => {
    setEditingItinerary(item.id);

    setItineraryForm({
      activityDate: item.activityDate || "",
      activityTime: item.activityTime || "",
      activity: item.activity || "",
      location: item.location || "",
      notes: item.notes || "",
    });

    setError("");
    setSuccess("");
  };

  const cancelItineraryEdit = () => {
    setEditingItinerary(null);
    setItineraryForm(emptyItinerary);
  };

  const handleDeleteItinerary = async (id) => {
    const confirmed = window.confirm(
      "Delete this itinerary activity?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteItinerary(tripId, id);

      if (editingItinerary === id) {
        cancelItineraryEdit();
      }

      await refreshItineraries();

      showSuccess(
        "Itinerary activity deleted successfully."
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to delete itinerary activity."
      );
    }
  };

  const handleExpenseChange = (event) => {
    const { name, value } = event.target;

    setExpenseForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleExpenseSubmit = async (event) => {
    event.preventDefault();

    if (!trip) {
      return;
    }

    if (
      expenseForm.expenseDate < trip.startDate ||
      expenseForm.expenseDate > trip.endDate
    ) {
      setError(
        `Expense date must be between ${formatDate(
          trip.startDate
        )} and ${formatDate(trip.endDate)}.`
      );
      return;
    }

    if (Number(expenseForm.amount) <= 0) {
      setError(
        "Expense amount must be greater than ₹0."
      );
      return;
    }

    const data = {
      category: expenseForm.category.trim(),
      description:
        expenseForm.description.trim(),
      amount: Number(expenseForm.amount),
      expenseDate: expenseForm.expenseDate,
    };

    try {
      setExpenseSaving(true);
      setError("");
      setSuccess("");

      if (editingExpense) {
        await updateExpense(
          tripId,
          editingExpense,
          data
        );

        showSuccess(
          "Expense updated successfully."
        );
      } else {
        await createExpense(tripId, data);

        showSuccess(
          "Expense added successfully."
        );
      }

      setExpenseForm(emptyExpense);
      setEditingExpense(null);

      await refreshExpenses();
    } catch (err) {
      setError(
        err.message || "Unable to save expense."
      );
    } finally {
      setExpenseSaving(false);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense.id);

    setExpenseForm({
      category: expense.category || "",
      description: expense.description || "",
      amount: expense.amount || "",
      expenseDate: expense.expenseDate || "",
    });

    setError("");
    setSuccess("");
  };

  const cancelExpenseEdit = () => {
    setEditingExpense(null);
    setExpenseForm(emptyExpense);
  };

  const handleDeleteExpense = async (id) => {
    const confirmed = window.confirm(
      "Delete this expense?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteExpense(tripId, id);

      if (editingExpense === id) {
        cancelExpenseEdit();
      }

      await refreshExpenses();

      showSuccess(
        "Expense deleted successfully."
      );
    } catch (err) {
      setError(
        err.message || "Unable to delete expense."
      );
    }
  };

  const handleFindAttractions = async () => {
    if (!trip) {
      return;
    }

    try {
      setAttractionsLoading(true);
      setError("");
      setSuccess("");

      const data = await getAttractions(
        trip.destination
      );

      setAttractions(data);

      if (data.length === 0) {
        setError(
          `No attractions found for ${trip.destination}.`
        );
      } else {
        showSuccess(
          `Found ${data.length} attractions in ${trip.destination}.`
        );
      }
    } catch (err) {
      setError(
        err.message ||
          "Unable to find attractions."
      );
    } finally {
      setAttractionsLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatMoney = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  const getGoogleMapsLink = (place) => {
    const query = encodeURIComponent(
      `${place.name || ""}, ${
        place.address || trip?.destination || ""
      }`
    );

    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  const getDirectionsLink = (place) => {
    if (
      place.latitude != null &&
      place.longitude != null
    ) {
      return `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
    }

    const destination = encodeURIComponent(
      `${place.name || ""}, ${
        place.address || trip?.destination || ""
      }`
    );

    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  };

  const totalBudget = Number(
    budget?.budget || trip?.budget || 0
  );

  const totalSpent = Number(
    budget?.totalSpent || 0
  );

  const remainingBudget = Number(
    budget?.remainingBudget ??
      totalBudget - totalSpent
  );

  const spentPercentage =
    totalBudget > 0
      ? Math.min(
          (totalSpent / totalBudget) * 100,
          100
        )
      : 0;

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="trip-details-page">
          <div className="details-loading">
            <div className="details-spinner"></div>

            <h2>Loading trip details...</h2>

            <p>
              Preparing your TravelFlow trip.
            </p>
          </div>
        </main>
      </>
    );
  }

  if (!trip) {
    return (
      <>
        <Navbar />

        <main className="trip-details-page">
          <Link
            to="/trips"
            className="back-link"
          >
            ← Back to Trips
          </Link>

          <div className="details-alert error-alert">
            {error || "Trip not found."}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="trip-details-page">
        <Link
          to="/trips"
          className="back-link"
        >
          ← Back to Trips
        </Link>

        {error && (
          <div className="details-alert error-alert">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
            >
              ×
            </button>
          </div>
        )}

        {success && (
          <div className="details-alert success-alert">
            <span>{success}</span>

            <button
              type="button"
              onClick={() => setSuccess("")}
            >
              ×
            </button>
          </div>
        )}

        <section className="trip-hero">
          <div className="trip-hero-content">
            <p className="section-label">
              TRIP #{trip.id}
            </p>

            <h1>{trip.destination}</h1>

            <div className="hero-dates">
              <span>
                {formatDate(trip.startDate)}
              </span>

              <span className="hero-arrow">
                →
              </span>

              <span>
                {formatDate(trip.endDate)}
              </span>
            </div>

            <p className="hero-description">
              {trip.description ||
                "No description added for this trip."}
            </p>
          </div>

          <div className="hero-budget">
            <span>TRIP BUDGET</span>

            <strong>
              ₹{formatMoney(trip.budget)}
            </strong>

            <small>
              Planned travel budget
            </small>
          </div>
        </section>

        <section className="details-section">
          <div className="details-section-heading">
            <div>
              <p className="section-label">
                TRIP SCHEDULE
              </p>

              <h2>Itinerary</h2>

              <p>
                Organize activities for each day of
                your trip.
              </p>
            </div>

            <div className="section-count">
              {itineraries.length}{" "}
              {itineraries.length === 1
                ? "Activity"
                : "Activities"}
            </div>
          </div>

          <form
            className="details-form"
            onSubmit={handleItinerarySubmit}
          >
            <div className="details-form-group">
              <label htmlFor="activityDate">
                Date
              </label>

              <input
                id="activityDate"
                type="date"
                name="activityDate"
                value={
                  itineraryForm.activityDate
                }
                onChange={
                  handleItineraryChange
                }
                min={trip.startDate}
                max={trip.endDate}
                required
              />

              <small>
                Between {formatDate(trip.startDate)}{" "}
                and {formatDate(trip.endDate)}
              </small>
            </div>

            <div className="details-form-group">
              <label htmlFor="activityTime">
                Time
              </label>

              <input
                id="activityTime"
                type="time"
                name="activityTime"
                value={
                  itineraryForm.activityTime
                }
                onChange={
                  handleItineraryChange
                }
                required
              />
            </div>

            <div className="details-form-group">
              <label htmlFor="activity">
                Activity
              </label>

              <input
                id="activity"
                type="text"
                name="activity"
                placeholder="Beach visit"
                value={
                  itineraryForm.activity
                }
                onChange={
                  handleItineraryChange
                }
                required
              />
            </div>

            <div className="details-form-group">
              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                type="text"
                name="location"
                placeholder="Baga Beach"
                value={
                  itineraryForm.location
                }
                onChange={
                  handleItineraryChange
                }
                required
              />
            </div>

            <div className="details-form-group wide-field">
              <label htmlFor="notes">
                Notes
              </label>

              <textarea
                id="notes"
                name="notes"
                placeholder="Optional notes about this activity..."
                value={itineraryForm.notes}
                onChange={
                  handleItineraryChange
                }
                rows="3"
              />
            </div>

            <div className="form-action-row">
              <button
                className="main-action"
                type="submit"
                disabled={itinerarySaving}
              >
                {itinerarySaving
                  ? "Saving..."
                  : editingItinerary
                    ? "Update Activity"
                    : "+ Add Activity"}
              </button>

              {editingItinerary && (
                <button
                  className="secondary-action"
                  type="button"
                  onClick={
                    cancelItineraryEdit
                  }
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          {itineraries.length === 0 ? (
            <div className="details-empty-state">
              <div className="empty-icon">
                📅
              </div>

              <h3>No activities yet</h3>

              <p>
                Add your first activity to start
                building your itinerary.
              </p>
            </div>
          ) : (
            <div className="data-list">
              {itineraries.map(
                (item, index) => (
                  <article
                    className="data-card itinerary-card"
                    key={item.id}
                  >
                    <div className="activity-number">
                      {index + 1}
                    </div>

                    <div className="data-card-content">
                      <div className="data-card-header">
                        <div>
                          <span className="data-tag">
                            {formatDate(
                              item.activityDate
                            )}
                          </span>

                          <h3>
                            {item.activity}
                          </h3>
                        </div>

                        <span className="activity-time">
                          {item.activityTime}
                        </span>
                      </div>

                      <p className="location-text">
                        📍 {item.location}
                      </p>

                      {item.notes && (
                        <p className="notes-text">
                          {item.notes}
                        </p>
                      )}
                    </div>

                    <div className="card-buttons">
                      <button
                        className="card-edit-button"
                        type="button"
                        onClick={() =>
                          handleEditItinerary(
                            item
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="card-delete-button"
                        type="button"
                        onClick={() =>
                          handleDeleteItinerary(
                            item.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                )
              )}
            </div>
          )}
        </section>

        <section className="details-section">
          <div className="details-section-heading">
            <div>
              <p className="section-label">
                FINANCES
              </p>

              <h2>Budget & Expenses</h2>

              <p>
                Track your travel spending against
                your planned budget.
              </p>
            </div>
          </div>

          {budget && (
            <div className="budget-overview-box">
              <div className="budget-grid">
                <div className="budget-stat">
                  <span>Total Budget</span>

                  <strong>
                    ₹{formatMoney(totalBudget)}
                  </strong>
                </div>

                <div className="budget-stat">
                  <span>Total Spent</span>

                  <strong>
                    ₹{formatMoney(totalSpent)}
                  </strong>
                </div>

                <div className="budget-stat">
                  <span>Remaining</span>

                  <strong>
                    ₹
                    {formatMoney(
                      remainingBudget
                    )}
                  </strong>
                </div>

                <div className="budget-stat">
                  <span>Budget Used</span>

                  <strong>
                    {spentPercentage.toFixed(0)}%
                  </strong>
                </div>
              </div>

              <div className="details-budget-progress">
                <div
                  className="details-budget-progress-fill"
                  style={{
                    width: `${spentPercentage}%`,
                  }}
                ></div>
              </div>

              <div className="budget-progress-labels">
                <span>
                  ₹{formatMoney(totalSpent)} spent
                </span>

                <span>
                  ₹{formatMoney(totalBudget)} budget
                </span>
              </div>
            </div>
          )}

          <div className="expense-form-heading">
            <h3>
              {editingExpense
                ? "Edit Expense"
                : "Add Expense"}
            </h3>

            <p>
              Expense dates must fall within your
              trip dates.
            </p>
          </div>

          <form
            className="details-form"
            onSubmit={handleExpenseSubmit}
          >
            <div className="details-form-group">
              <label htmlFor="category">
                Category
              </label>

              <input
                id="category"
                type="text"
                name="category"
                placeholder="Hotel"
                value={expenseForm.category}
                onChange={handleExpenseChange}
                required
              />
            </div>

            <div className="details-form-group">
              <label htmlFor="expenseDescription">
                Description
              </label>

              <input
                id="expenseDescription"
                type="text"
                name="description"
                placeholder="Hotel booking"
                value={
                  expenseForm.description
                }
                onChange={handleExpenseChange}
                required
              />
            </div>

            <div className="details-form-group">
              <label htmlFor="amount">
                Amount (₹)
              </label>

              <input
                id="amount"
                type="number"
                name="amount"
                placeholder="5000"
                value={expenseForm.amount}
                onChange={handleExpenseChange}
                min="0.01"
                step="0.01"
                required
              />
            </div>

            <div className="details-form-group">
              <label htmlFor="expenseDate">
                Expense Date
              </label>

              <input
                id="expenseDate"
                type="date"
                name="expenseDate"
                value={
                  expenseForm.expenseDate
                }
                onChange={handleExpenseChange}
                min={trip.startDate}
                max={trip.endDate}
                required
              />

              <small>
                Between {formatDate(trip.startDate)}{" "}
                and {formatDate(trip.endDate)}
              </small>
            </div>

            <div className="form-action-row full-width">
              <button
                className="main-action"
                type="submit"
                disabled={expenseSaving}
              >
                {expenseSaving
                  ? "Saving..."
                  : editingExpense
                    ? "Update Expense"
                    : "+ Add Expense"}
              </button>

              {editingExpense && (
                <button
                  className="secondary-action"
                  type="button"
                  onClick={
                    cancelExpenseEdit
                  }
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="expense-list-heading">
            <h3>Expense History</h3>

            <span>
              {expenses.length}{" "}
              {expenses.length === 1
                ? "Expense"
                : "Expenses"}
            </span>
          </div>

          {expenses.length === 0 ? (
            <div className="details-empty-state">
              <div className="empty-icon">
                ₹
              </div>

              <h3>No expenses yet</h3>

              <p>
                Add your first expense to start
                tracking your trip budget.
              </p>
            </div>
          ) : (
            <div className="data-list">
              {expenses.map((expense) => (
                <article
                  className="data-card expense-card"
                  key={expense.id}
                >
                  <div className="expense-icon">
                    ₹
                  </div>

                  <div className="data-card-content">
                    <div className="data-card-header">
                      <div>
                        <span className="data-tag">
                          {expense.category}
                        </span>

                        <h3>
                          {expense.description}
                        </h3>
                      </div>

                      <strong className="expense-amount">
                        ₹
                        {formatMoney(
                          expense.amount
                        )}
                      </strong>
                    </div>

                    <p className="expense-date">
                      {formatDate(
                        expense.expenseDate
                      )}
                    </p>
                  </div>

                  <div className="card-buttons">
                    <button
                      className="card-edit-button"
                      type="button"
                      onClick={() =>
                        handleEditExpense(
                          expense
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="card-delete-button"
                      type="button"
                      onClick={() =>
                        handleDeleteExpense(
                          expense.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="details-section">
          <div className="attraction-heading">
            <div>
              <p className="section-label">
                DISCOVER
              </p>

              <h2>
                Attractions in {trip.destination}
              </h2>

              <p>
                Discover interesting places to visit
                during your trip and open them
                directly in Google Maps.
              </p>
            </div>

            <button
              className="main-action"
              type="button"
              onClick={
                handleFindAttractions
              }
              disabled={attractionsLoading}
            >
              {attractionsLoading
                ? "Searching..."
                : "Find Attractions"}
            </button>
          </div>

          {attractionsLoading ? (
            <div className="details-empty-state">
              <div className="details-spinner"></div>

              <p>
                Searching for attractions in{" "}
                {trip.destination}...
              </p>
            </div>
          ) : attractions.length === 0 ? (
            <div className="details-empty-state">
              <div className="empty-icon">
                📍
              </div>

              <h3>
                Discover {trip.destination}
              </h3>

              <p>
                Click Find Attractions to discover
                tourist places for your trip.
              </p>
            </div>
          ) : (
            <div className="attractions-grid">
              {attractions.map(
                (place, index) => (
                  <article
                    className="attraction-card"
                    key={`${place.name}-${index}`}
                  >
                    <div className="attraction-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    <div className="attraction-icon">
                      📍
                    </div>

                    <h3>
                      {place.name ||
                        "Unnamed Attraction"}
                    </h3>

                    <p>
                      {place.address ||
                        "Address unavailable"}
                    </p>

                    <div className="attraction-actions">
                      <a
                        href={getGoogleMapsLink(
                          place
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="maps-button"
                      >
                        <span>
                          View on Google Maps
                        </span>

                        <span>↗</span>
                      </a>

                      <a
                        href={getDirectionsLink(
                          place
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="directions-button"
                      >
                        <span>
                          Get Directions
                        </span>

                        <span>→</span>
                      </a>
                    </div>
                  </article>
                )
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default TripDetails;