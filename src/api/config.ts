// Central API base URL for the app.
//
// Set REACT_APP_API_URL at build time to point at a deployed backend.
// Falls back to the local dev server so `npm start` works out of the box.
// Features are designed to work WITHOUT a backend (local-first / bundled
// data); the backend is an optional enhancement.
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";
