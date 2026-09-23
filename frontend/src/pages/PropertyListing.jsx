import { useEffect, useMemo, useState } from "react";
import { FiFilter, FiRefreshCw } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

import EmptyState from "../components/common/EmptyState";
import LoadingGrid from "../components/common/LoadingGrid";
import PropertyCard from "../components/property/PropertyCard";
import { getProperties } from "../services/propertyService";

const propertyTypes = ["Apartment", "Villa", "Plot", "Commercial"];
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: low to high", value: "lowToHigh" },
  { label: "Price: high to low", value: "highToLow" },
];

export default function PropertyListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filters = useMemo(
    () => ({
      location: searchParams.get("location") || "",
      propertyType: searchParams.get("propertyType") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      sort: searchParams.get("sort") || "newest",
      page: Number(searchParams.get("page")) || 1,
    }),
    [searchParams],
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getProperties({ ...filters, limit: 6 });
        setProperties(data.properties || []);
        setMeta({
          total: data.total || 0,
          page: data.page || 1,
          pages: data.pages || 1,
        });
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Could not load properties right now.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const updateFilter = (name, value) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(name, value);
    } else {
      nextParams.delete(name);
    }

    nextParams.delete("page");
    setSearchParams(nextParams);
  };

  const setPage = (page) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", page);
    setSearchParams(nextParams);
  };

  const resetFilters = () => setSearchParams({});

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Property search
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-950">
            Browse available properties
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Use the filters to narrow by locality, budget, and property style.
          </p>
        </div>
        <p className="text-sm text-slate-500">{meta.total} result(s)</p>
      </div>

      <div className="mb-8 rounded-lg border border-slate-200 bg-white p-4">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <FiFilter />
          Filters
        </div>
        <div className="grid gap-3 md:grid-cols-5">
          <input
            value={filters.location}
            onChange={(event) => updateFilter("location", event.target.value)}
            placeholder="City or locality"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950"
          />
          <select
            value={filters.propertyType}
            onChange={(event) => updateFilter("propertyType", event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950"
          >
            <option value="">All types</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <input
            value={filters.minPrice}
            onChange={(event) => updateFilter("minPrice", event.target.value)}
            placeholder="Min price"
            type="number"
            min="0"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950"
          />
          <input
            value={filters.maxPrice}
            onChange={(event) => updateFilter("maxPrice", event.target.value)}
            placeholder="Max price"
            type="number"
            min="0"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950"
          />
          <select
            value={filters.sort}
            onChange={(event) => updateFilter("sort", event.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-950"
        >
          <FiRefreshCw />
          Reset filters
        </button>
      </div>

      {error && (
        <p className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      {loading ? (
        <LoadingGrid />
      ) : properties.length ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>

          {meta.pages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {Array.from({ length: meta.pages }).map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setPage(page)}
                    className={`h-10 w-10 rounded-md border text-sm font-medium ${
                      page === meta.page
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-300 bg-white text-slate-700"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <EmptyState
          title="No matching properties"
          message="Try widening the budget range or removing a location filter."
        />
      )}
    </div>
  );
}
