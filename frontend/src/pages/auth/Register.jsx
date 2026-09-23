import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await registerUser(formData);
      navigate("/login");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Join EstateHub
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">
          Create the account that matches how you use property.
        </h1>
        <p className="mt-4 max-w-md leading-7 text-slate-500">
          Choose buyer mode to browse and save homes, or owner mode to list and
          manage properties from your dashboard.
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold text-slate-950">Register</h2>

        {error && (
          <p className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <form onSubmit={submitHandler} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Name</span>
            <input
              name="name"
              required
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-slate-950"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-slate-950"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              name="password"
              type="password"
              required
              minLength="6"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-slate-950"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Account type</span>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-slate-950"
            >
              <option value="user">Buyer / renter</option>
              <option value="owner">Property owner</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
            <FiArrowRight />
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-500">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-slate-950">
            Login
          </Link>
        </p>
      </section>
    </div>
  );
}
