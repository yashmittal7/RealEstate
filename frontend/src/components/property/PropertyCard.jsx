import { FiMapPin, FiMaximize2 } from "react-icons/fi";
import { Link } from "react-router-dom";

import { formatPrice, getPropertyImage, pluralize } from "../../utils/format";

export default function PropertyCard({ property, actions }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link to={`/property/${property._id}`} className="block">
        <div className="relative h-56 overflow-hidden bg-slate-200">
          <img
            src={getPropertyImage(property)}
            alt={property.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-md bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800">
            {property.propertyType}
          </span>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              to={`/property/${property._id}`}
              className="line-clamp-1 text-lg font-semibold text-slate-950 hover:text-slate-700"
            >
              {property.title}
            </Link>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <FiMapPin />
              <span className="line-clamp-1">{property.location}</span>
            </p>
          </div>
          <p className="whitespace-nowrap text-lg font-semibold text-slate-950">
            {formatPrice(property.price)}
          </p>
        </div>

        <div className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
          <span>{property.bedrooms || 0} {pluralize(property.bedrooms || 0, "bed")}</span>
          <span>{property.bathrooms || 0} {pluralize(property.bathrooms || 0, "bath")}</span>
          <span className="flex items-center gap-1">
            <FiMaximize2 />
            Listed
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Link
            to={`/property/${property._id}`}
            className="flex-1 rounded-md bg-slate-950 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-slate-800"
          >
            View Details
          </Link>
          {actions}
        </div>
      </div>
    </article>
  );
}
