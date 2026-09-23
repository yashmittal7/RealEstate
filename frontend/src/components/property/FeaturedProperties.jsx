import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import EmptyState from "../common/EmptyState";
import LoadingGrid from "../common/LoadingGrid";
import PropertyCard from "./PropertyCard";
import { getProperties } from "../../services/propertyService";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties({ limit: 6, sort: "newest" });
        setProperties(data.properties || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Fresh listings
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            Recently added properties
          </h2>
        </div>
        <Link
          to="/properties"
          className="text-sm font-semibold text-slate-700 hover:text-slate-950"
        >
          Browse all properties
        </Link>
      </div>

      {loading ? (
        <LoadingGrid count={6} />
      ) : properties.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No properties yet"
          message="Once owners add listings, the newest homes will show up here."
          action={
            <Link
              to="/owner/add-property"
              className="rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white"
            >
              Add the first property
            </Link>
          }
        />
      )}
    </section>
  );
}
