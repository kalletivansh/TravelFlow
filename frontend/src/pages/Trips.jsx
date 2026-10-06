import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getTrips,
  createTrip,
  updateTrip,
  deleteTrip,
} from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/trips.css";

const emptyForm = {
  destination: "",
  startDate: "",
  endDate: "",
  budget: "",
  description: "",
};

function Trips() {
  const [trips, setTrips] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);

        const data = await getTrips();

        setTrips(data);
        setError("");
      } catch {
        setError("Unable to load your trips.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const data = await getTrips();
      setTrips(data);
    } catch {
      setError("Unable to refresh trips.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const showSuccess = (message) => {
    setSuccess(message);

    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (form.endDate < form.startDate) {
      setError(
        "End date cannot be before the start date."
      );
      return;
    }

    if (Number(form.budget) <= 0) {
      setError(
        "Please enter a budget greater than ₹0."
      );
      return;
    }

    const tripData = {
      destination: form.destination.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      budget: Number(form.budget),
      description: form.description.trim(),
    };

    try {
      setSaving(true);

      if (editingId) {
        await updateTrip(editingId, tripData);

        showSuccess(
          "Trip updated successfully."
        );
      } else {
        await createTrip(tripData);

        showSuccess(
          "Trip created successfully."
        );
      }

      resetForm();
      await loadTrips();
    } catch {
      setError(
        editingId
          ? "Unable to update trip."
          : "Unable to create trip."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (trip) => {
    setEditingId(trip.id);

    setForm({
      destination: trip.destination || "",
      startDate: trip.startDate || "",
      endDate: trip.endDate || "",
      budget: trip.budget || "",
      description: trip.description || "",
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (tripId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await deleteTrip(tripId);

      if (editingId === tripId) {
        resetForm();
      }

      showSuccess(
        "Trip deleted successfully."
      );

      await loadTrips();
    } catch {
      setError(
        "Unable to delete trip. Please try again."
      );
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
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    );
  };

  return (
    <>
      <Navbar />

      <main className="trips-page">
        <section className="trips-header">
          <div>
            <p className="trips-label">
              MY JOURNEYS
            </p>

            <h1>Trips</h1>

            <p className="trips-subtitle">
              Create and manage your travel plans,
              itinerary, budget and attractions.
            </p>
          </div>

          <div className="trip-count">
            <strong>{trips.length}</strong>
            <span>
              {trips.length === 1
                ? "Trip"
                : "Trips"}
            </span>
          </div>
        </section>

        {error && (
          <div className="trips-alert error-alert">
            {error}
          </div>
        )}

        {success && (
          <div className="trips-alert success-alert">
            {success}
          </div>
        )}

        <section className="trip-form-section">
          <div className="section-heading">
            <div>
              <p className="trips-label">
                {editingId
                  ? "EDIT TRIP"
                  : "NEW TRIP"}
              </p>

              <h2>
                {editingId
                  ? "Update your trip"
                  : "Plan a new adventure"}
              </h2>
            </div>

            {editingId && (
              <button
                type="button"
                className="cancel-edit-button"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form
            className="trip-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="destination">
                Destination
              </label>

              <input
                id="destination"
                type="text"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                placeholder="Example: Goa"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="startDate">
                Start Date
              </label>

              <input
                id="startDate"
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">
                End Date
              </label>

              <input
                id="endDate"
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                min={form.startDate || undefined}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="budget">
                Budget (₹)
              </label>

              <input
                id="budget"
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="25000"
                min="1"
                step="0.01"
                required
              />
            </div>

            <div className="form-group description-group">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Add a short note about your trip..."
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="save-trip-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Trip"
                    : "+ Create Trip"}
              </button>
            </div>
          </form>
        </section>

        <section className="my-trips-section">
          <div className="section-heading">
            <div>
              <p className="trips-label">
                YOUR TRIPS
              </p>

              <h2>Travel Plans</h2>
            </div>
          </div>

          {loading ? (
            <div className="trips-state">
              <div className="trips-spinner"></div>
              <p>Loading your trips...</p>
            </div>
          ) : trips.length === 0 ? (
            <div className="empty-trips">
              <div className="empty-trip-icon">
                ✈
              </div>

              <h3>No trips yet</h3>

              <p>
                Create your first trip using the
                form above.
              </p>
            </div>
          ) : (
            <div className="trips-grid">
              {trips.map((trip) => (
                <article
                  className="trip-card"
                  key={trip.id}
                >
                  <div className="trip-card-top">
                    <div>
                      <span className="trip-number">
                        TRIP #{trip.id}
                      </span>

                      <h3>
                        {trip.destination}
                      </h3>
                    </div>

                    <div className="destination-icon">
                      ✈
                    </div>
                  </div>

                  <div className="trip-dates">
                    <div>
                      <span>START</span>
                      <strong>
                        {formatDate(
                          trip.startDate
                        )}
                      </strong>
                    </div>

                    <div className="date-arrow">
                      →
                    </div>

                    <div>
                      <span>END</span>
                      <strong>
                        {formatDate(
                          trip.endDate
                        )}
                      </strong>
                    </div>
                  </div>

                  <div className="trip-budget">
                    <span>Trip Budget</span>

                    <strong>
                      ₹
                      {formatMoney(
                        trip.budget
                      )}
                    </strong>
                  </div>

                  <p className="trip-description">
                    {trip.description ||
                      "No description added for this trip."}
                  </p>

                  <div className="trip-card-actions">
                    <Link
                      className="manage-trip-button"
                      to={`/trips/${trip.id}`}
                    >
                      Manage Trip
                    </Link>

                    <button
                      type="button"
                      className="edit-trip-button"
                      onClick={() =>
                        handleEdit(trip)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-trip-button"
                      onClick={() =>
                        handleDelete(trip.id)
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
      </main>
    </>
  );
}

export default Trips;