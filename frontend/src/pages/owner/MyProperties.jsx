import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

import EmptyState from "../../components/common/EmptyState";
import LoadingGrid from "../../components/common/LoadingGrid";
import PropertyCard from "../../components/property/PropertyCard";
import { deleteProperty, getMyProperties } from "../../services/propertyService";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getMyProperties();
        setProperties(data || []);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message || "Could not load your listings.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const removeProperty = async (id) => {
    const confirmed = window.confirm("Delete this property listing?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteProperty(id);
      setProperties((current) => current.filter((property) => property._id !== id));
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Could not delete this listing.",
      );
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Owner workspace
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-950">
            My properties
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            Review what buyers see and remove old listings when needed.
          </p>
        </div>
        <Link
          to="/owner/add-property"
          className="rounded-md bg-slate-950 px-4 py-2 text-center text-sm font-medium text-white"
        >
          Add property
        </Link>
      </div>

      {error && (
        <p className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <LoadingGrid />
      ) : properties.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              actions={
                <button
                  type="button"
                  onClick={() => removeProperty(property._id)}
                  className="grid h-10 w-10 place-items-center rounded-md border border-red-200 text-red-600 transition hover:bg-red-50"
                  title="Delete property"
                >
                  <FiTrash2 />
                </button>
              }
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="You have not listed anything yet"
          message="Add your first property and it will appear in public search immediately."
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
    </div>
  );
}
