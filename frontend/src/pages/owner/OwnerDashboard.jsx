import { useEffect, useMemo, useState } from "react";
import { FiHome, FiPlusCircle, FiTrendingUp, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

import EmptyState from "../../components/common/EmptyState";
import PropertyCard from "../../components/property/PropertyCard";
import { getDashboardStats, getMyProperties } from "../../services/propertyService";
import { formatPrice } from "../../utils/format";

export default function OwnerDashboard() {
  const [stats, setStats] = useState({ users: 0, properties: 0 });
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const [statsData, myProperties] = await Promise.all([
          getDashboardStats(),
          getMyProperties(),
        ]);

        setStats(statsData);
        setProperties(myProperties || []);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message || "Could not load dashboard.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const totalPortfolioValue = useMemo(
    () =>
      properties.reduce(
        (total, property) => total + (Number(property.price) || 0),
        0,
      ),
    [properties],
  );

  const cards = [
    {
      label: "My listings",
      value: properties.length,
      icon: FiHome,
    },
    {
      label: "Platform users",
      value: stats.users || 0,
      icon: FiUsers,
    },
    {
      label: "All properties",
      value: stats.properties || 0,
      icon: FiTrendingUp,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Owner workspace
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-950">
            Dashboard
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            A quick view of your listings and portfolio value.
          </p>
        </div>
        <Link
          to="/owner/add-property"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white"
        >
          <FiPlusCircle />
          Add property
        </Link>
      </div>

      {error && (
        <p className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{card.label}</p>
                <Icon className="text-slate-400" />
              </div>
              <p className="mt-3 text-3xl font-semibold text-slate-950">
                {loading ? "--" : card.value}
              </p>
            </div>
          );
        })}
        <div className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
          <p className="text-sm text-slate-300">Portfolio value</p>
          <p className="mt-3 text-3xl font-semibold">
            {loading ? "--" : formatPrice(totalPortfolioValue)}
          </p>
        </div>
      </div>

      <section className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-950">
            Recent listings
          </h2>
          <Link
            to="/owner/my-properties"
            className="text-sm font-semibold text-slate-600 hover:text-slate-950"
          >
            Manage all
          </Link>
        </div>

        {loading ? (
          <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-500">
            Loading dashboard...
          </div>
        ) : properties.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.slice(0, 3).map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No listings yet"
            message="Add a property to start building your owner dashboard."
            action={
              <Link
                to="/owner/add-property"
                className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white"
              >
                Add property
              </Link>
            }
          />
        )}
      </section>
    </div>
  );
}
