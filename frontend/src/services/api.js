const API_URL = "http://localhost:8080";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// ================= AUTH =================

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Registration failed");
  }

  return response.text();
};

export const loginUser = async (loginData) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Invalid email or password");
  }

  return response.text();
};

// ================= DASHBOARD =================

export const getDashboard = async () => {
  const response = await fetch(`${API_URL}/api/dashboard`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Unable to load dashboard");
  }

  return response.json();
};

// ================= TRIPS =================

export const getTrips = async () => {
  const response = await fetch(`${API_URL}/api/trips`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Unable to load trips");
  }

  return response.json();
};

export const createTrip = async (tripData) => {
  const response = await fetch(`${API_URL}/api/trips`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(tripData),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Unable to create trip");
  }

  return response.json();
};

export const updateTrip = async (id, tripData) => {
  const response = await fetch(`${API_URL}/api/trips/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(tripData),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Unable to update trip");
  }

  return response.json();
};

export const deleteTrip = async (id) => {
  const response = await fetch(`${API_URL}/api/trips/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Unable to delete trip");
  }
};

// ================= ITINERARY =================

export const getItineraries = async (tripId) => {
  const response = await fetch(
    `${API_URL}/api/trips/${tripId}/itineraries`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Unable to load itinerary");
  }

  return response.json();
};

export const createItinerary = async (tripId, data) => {
  const response = await fetch(
    `${API_URL}/api/trips/${tripId}/itineraries`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Unable to add activity");
  }

  return response.json();
};

export const updateItinerary = async (
  tripId,
  itineraryId,
  data
) => {
  const response = await fetch(
    `${API_URL}/api/trips/${tripId}/itineraries/${itineraryId}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Unable to update activity");
  }

  return response.json();
};

export const deleteItinerary = async (
  tripId,
  itineraryId
) => {
  const response = await fetch(
    `${API_URL}/api/trips/${tripId}/itineraries/${itineraryId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Unable to delete activity");
  }
};

// ================= EXPENSES =================

export const getExpenses = async (tripId) => {
  const response = await fetch(
    `${API_URL}/api/trips/${tripId}/expenses`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Unable to load expenses");
  }

  return response.json();
};

export const createExpense = async (tripId, data) => {
  const response = await fetch(
    `${API_URL}/api/trips/${tripId}/expenses`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Unable to add expense");
  }

  return response.json();
};

export const updateExpense = async (
  tripId,
  expenseId,
  data
) => {
  const response = await fetch(
    `${API_URL}/api/trips/${tripId}/expenses/${expenseId}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Unable to update expense");
  }

  return response.json();
};

export const deleteExpense = async (
  tripId,
  expenseId
) => {
  const response = await fetch(
    `${API_URL}/api/trips/${tripId}/expenses/${expenseId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Unable to delete expense");
  }
};

// ================= BUDGET =================

export const getBudgetSummary = async (tripId) => {
  const response = await fetch(
    `${API_URL}/api/trips/${tripId}/budget-summary`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Unable to load budget summary");
  }

  return response.json();
};

// ================= ATTRACTIONS =================

export const getAttractions = async (destination) => {
  const response = await fetch(
    `${API_URL}/api/places/destination-attractions?destination=${encodeURIComponent(
      destination
    )}`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Unable to load attractions");
  }

  return response.json();
};