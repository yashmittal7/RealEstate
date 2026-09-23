import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const submitHandler = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const data = await loginUser({ email, password });
      login(data.user, data.token);
      navigate(data.user?.role === "owner" ? "/owner/dashboard" : "/properties");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Welcome back
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">
          Continue your property search.
        </h1>
        <p className="mt-4 max-w-md leading-7 text-slate-500">
          Login to manage listings, save properties, and keep your owner or buyer
          workspace in one place.
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-semibold text-slate-950">Login</h2>
        <p className="mt-2 text-sm text-slate-500">
          Use the email and password you registered with.
        </p>

        {error && (
          <p className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <form onSubmit={submitHandler} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              required
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-slate-950"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              required
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-slate-950"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Logging in..." : "Login"}
            <FiArrowRight />
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-500">
          New here?{" "}
          <Link to="/register" className="font-semibold text-slate-950">
            Create an account
          </Link>
        </p>
      </section>
    </div>
  );
}
