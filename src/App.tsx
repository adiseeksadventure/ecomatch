import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SustainabilityQuiz from "./pages/SustainabilityQuiz";
import BusinessDirectory from "./pages/BusinessDirectory";
import CarbonCalculator from "./pages/CarbonCalculator";
import CommunityDashboard from "./pages/CommunityDashboard";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<SustainabilityQuiz />} />
            <Route path="/directory" element={<BusinessDirectory />} />
            <Route path="/calculator" element={<CarbonCalculator />} />
            <Route path="/dashboard" element={<CommunityDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
