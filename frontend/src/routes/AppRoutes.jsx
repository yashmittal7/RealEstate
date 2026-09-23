import { Routes, Route } from "react-router-dom";
import Profile from "../pages/user/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PropertyListing from "../pages/PropertyListing";
import PropertyDetails from "../pages/PropertyDetails";
import AddProperty from "../pages/owner/AddProperty";
import MyProperties from "../pages/owner/MyProperties";
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import AIRecommendations from "../pages/AIRecommendations";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/properties" element={<PropertyListing />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute roles={["owner", "admin"]}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/add-property"
        element={
          <ProtectedRoute roles={["owner", "admin"]}>
            <AddProperty />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/my-properties"
        element={
          <ProtectedRoute roles={["owner", "admin"]}>
            <MyProperties />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-recommend"
        element={
          <ProtectedRoute>
            <AIRecommendations />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
