import { useEffect, useState } from "react";
import { FiHeart, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import AIAdvisor from "./AIAdvisor";
import { addToFavorites } from "../services/authService";
import { getPropertyById } from "../services/propertyService";
import { formatPrice, getPropertyImage, pluralize } from "../utils/format";
import { useAuth } from "../hooks/useAuth";

export default function PropertyDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favoriteMessage, setFavoriteMessage] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getPropertyById(id);
        setProperty(data);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message || "Property could not be loaded.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const favoriteHandler = async () => {
    if (!isAuthenticated) {
      setFavoriteMessage("Login to save this property.");
      return;
    }

    try {
      const data = await addToFavorites(id);
      setFavoriteMessage(data.message || "Saved to favorites.");
    } catch (requestError) {
      setFavoriteMessage(
        requestError.response?.data?.message || "Could not save this property.",
      );
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="h-115 animate-pulse rounded-lg bg-slate-200" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-semibold text-slate-950">
          Property not found
        </h1>
        <p className="mt-3 text-slate-500">{error}</p>
        <Link
          to="/properties"
          className="mt-6 inline-block rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white"
        >
          Back to properties
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <img
            src={getPropertyImage(property)}
            alt={property.title}
            className="h-115 w-full object-cover"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {(property.images || []).slice(1, 3).map((image) => (
            <img
              key={image}
              src={image}
              alt={property.title}
              className="h-full min-h-56 rounded-lg border border-slate-200 object-cover"
            />
          ))}
          {(!property.images || property.images.length <= 1) && (
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Listed by
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">
                {property.owner?.name || "EstateHub owner"}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Contact details are shared from the owner profile.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <section>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {property.propertyType}
              </span>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950">
                {property.title}
              </h1>
              <p className="mt-3 flex items-center gap-2 text-slate-500">
                <FiMapPin />
                {property.location}
              </p>
            </div>
            <p className="text-3xl font-semibold text-slate-950">
              {formatPrice(property.price)}
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Bedrooms</p>
              <p className="mt-1 text-xl font-semibold">
                {property.bedrooms || 0} {pluralize(property.bedrooms || 0, "bed")}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Bathrooms</p>
              <p className="mt-1 text-xl font-semibold">
                {property.bathrooms || 0}{" "}
                {pluralize(property.bathrooms || 0, "bath")}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Status</p>
              <p className="mt-1 text-xl font-semibold">Available</p>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-slate-950">About this property</h2>
            <p className="mt-4 leading-7 text-slate-600">{property.description}</p>
          </div>
        </section>

        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Contact owner
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            {property.owner?.name || "Property owner"}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Ask about site visits, documents, pricing, and availability.
          </p>

          <div className="mt-6 space-y-3">
            <a
              href={`mailto:${property.owner?.email || ""}`}
              className="flex items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-medium text-white"
            >
              <FiMail />
              Email owner
            </a>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700"
            >
              <FiPhone />
              Request callback
            </button>
            <button
              type="button"
              onClick={favoriteHandler}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700"
            >
              <FiHeart />
              Save property
            </button>
          </div>

          {favoriteMessage && (
            <p className="mt-4 rounded-md bg-slate-100 p-3 text-sm text-slate-600">
              {favoriteMessage}
            </p>
          )}
        </aside>
      </div>
      <AIAdvisor propertyId={property._id} />
    </div>
  );
}
