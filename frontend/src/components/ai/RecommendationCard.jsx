import { Link } from "react-router-dom";
import { FiMapPin, FiHome, FiGrid, FiDroplet } from "react-icons/fi";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const getImage = (property) => {
  if (property.images && property.images.length > 0) {
    return property.images[0];
  }

  return "https://placehold.co/600x400?text=EstateHub";
};

export default function RecommendationCard({ property }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      <img
        src={getImage(property)}
        alt={property.title}
        className="h-60 w-full object-cover"
      />

      <div className="p-6">
        {/* Header */}

        <div className="flex items-start justify-between">
          <div>
            <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {property.propertyType}
            </span>

            <h2 className="mt-3 text-2xl font-bold text-slate-900">
              {property.title}
            </h2>

            <p className="mt-2 flex items-center gap-2 text-slate-500">
              <FiMapPin />
              {property.location}
            </p>
          </div>

          <div className="rounded-xl bg-emerald-100 px-4 py-3 text-center">
            <p className="text-xs font-semibold uppercase text-emerald-700">
              Match
            </p>

            <p className="text-2xl font-bold text-emerald-800">
              {property.matchScore}%
            </p>
          </div>
        </div>

        {/* Price */}

        <h3 className="mt-5 text-3xl font-bold text-slate-900">
          {formatPrice(property.price)}
        </h3>

        {/* Details */}

        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-slate-50 p-3 text-center">
            <FiHome className="mx-auto text-lg text-slate-600" />

            <p className="mt-2 text-xs text-slate-500">Type</p>

            <p className="font-semibold">{property.propertyType}</p>
          </div>

          <div className="rounded-lg bg-slate-50 p-3 text-center">
            <FiGrid className="mx-auto text-lg text-slate-600" />

            <p className="mt-2 text-xs text-slate-500">Beds</p>

            <p className="font-semibold">{property.bedrooms}</p>
          </div>

          <div className="rounded-lg bg-slate-50 p-3 text-center">
            <FiDroplet className="mx-auto text-lg text-slate-600" />

            <p className="mt-2 text-xs text-slate-500">Baths</p>

            <p className="font-semibold">{property.bathrooms}</p>
          </div>
        </div>

        {/* AI Highlights */}

        <div className="mt-8">
          <h3 className="font-semibold text-slate-900">
            Why EstateHub AI recommends this
          </h3>

          <ul className="mt-3 space-y-2">
            {property.highlights?.map((item, index) => (
              <li key={index} className="flex gap-3 text-slate-600">
                <span className="text-emerald-600">✔</span>

                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Summary */}

        <div className="mt-8 rounded-lg bg-slate-50 p-5">
          <h3 className="font-semibold text-slate-900">AI Summary</h3>

          <p className="mt-3 leading-7 text-slate-600">{property.summary}</p>
        </div>

        {/* Button */}

        <Link
          to={`/property/${property._id}`}
          className="mt-8 flex items-center justify-center rounded-lg bg-slate-900 py-3 text-white transition hover:bg-slate-800"
        >
          View Property
        </Link>
      </div>
    </div>
  );
}
