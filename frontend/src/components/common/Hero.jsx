import { FiArrowRight, FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { aiSearch } from "../../services/aiService";

export default function Hero() {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();

    if (location.trim()) {
      params.set("location", location.trim());
    }

    navigate(`/properties${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleAISearch = async () => {
    try {
      const filters = await aiSearch(location);

      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          params.append(key, value);
        }
      });

      navigate(`/properties?${params.toString()}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
          alt="Modern home exterior"
          className="h-full w-full object-cover opacity-45"
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
            Verified homes, owner listings, better shortlists
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-6xl">
            Find a place that makes practical sense.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            Search apartments, villas, plots, and commercial spaces with clean
            details, real photos, and direct owner context.
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="mt-8 flex max-w-2xl flex-col gap-3 rounded-lg bg-white p-3 shadow-xl sm:flex-row"
        >
          <div className="flex flex-1 items-center gap-3 rounded-md border border-slate-200 px-4">
            <FiSearch className="text-slate-400" />
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Search by city or locality"
              className="h-12 w-full border-0 bg-transparent text-sm outline-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Search
            <FiArrowRight />
          </button>
          <button
            type="button"
            onClick={handleAISearch}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-green-600 px-5 text-sm font-semibold text-white hover:bg-green-700"
          >
            🤖 AI Search
          </button>
        </form>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/properties?propertyType=Apartment"
            className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 transition hover:bg-white/20"
          >
            Apartments
          </Link>
          <Link
            to="/properties?propertyType=Villa"
            className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20 transition hover:bg-white/20"
          >
            Villas
          </Link>
          <Link
            to="/owner/add-property"
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
          >
            List your property
          </Link>
        </div>
      </div>
    </section>
  );
}
