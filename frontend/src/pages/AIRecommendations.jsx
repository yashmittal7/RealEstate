import { useState } from "react";
import { FiCpu, FiInfo } from "react-icons/fi";
import RecommendationCard from "../components/ai/RecommendationCard";
import { getRecommendations } from "../services/aiService";

export default function AIRecommendations() {
  const [formData, setFormData] = useState({
    location: "",
    propertyType: "",
    bedrooms: "",
    maxPrice: "",
    purpose: "Self Use",
    priority: "Family Friendly",
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await getRecommendations(formData);

      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.log(error);
      alert("Unable to generate AI recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">

      <div className="mx-auto max-w-3xl">

        {/* HERO */}

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-3xl text-white">
              <FiCpu />
            </div>

            <div>

              <h1 className="text-4xl font-bold text-slate-900">
                EstateHub AI Recommendation
              </h1>

              <p className="mt-2 text-slate-500">
                Tell us your requirements and EstateHub AI will
                analyze real properties from our database to find
                the best matches for you.
              </p>

            </div>

          </div>

        </div>

        {/* HOW IT WORKS */}

        <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">

          <div className="flex gap-3">

            <FiInfo className="mt-1 text-blue-700" />

            <div>

              <h2 className="font-semibold text-slate-900">
                How AI Recommendations Work
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">

                EstateHub first searches properties from our own
                database.

                Then Groq AI analyzes those properties and ranks
                them based on how well they match your preferences.

                <br />
                <br />

                <strong>Match Score</strong> shows how closely a
                property fits your requirements.

              </p>

            </div>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
        >

          <h2 className="mb-8 text-2xl font-semibold">
            Tell us about your dream property
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium">
                Preferred Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 p-3"
                placeholder="Patna"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Maximum Budget (₹)
              </label>

              <input
                type="number"
                name="maxPrice"
                value={formData.maxPrice}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 p-3"
                placeholder="5000000"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Property Type
              </label>

              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 p-3"
              >

                <option value="">Any</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Plot</option>
                <option>Commercial</option>

              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Bedrooms
              </label>

              <select
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 p-3"
              >

                <option value="">Any</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>

              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Buying Purpose
              </label>

              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 p-3"
              >

                <option>Self Use</option>
                <option>Investment</option>

              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 p-3"
              >

                <option>Family Friendly</option>
                <option>Luxury</option>
                <option>Lowest Price</option>
                <option>Best Investment</option>

              </select>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-lg bg-slate-900 py-4 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
          >

            {loading
              ? "Finding the best properties..."
              : "✨ Get AI Recommendations"}

          </button>

        </form>

        {/* RESULTS */}

        <div className="mt-12">

          {!loading &&
            recommendations.length > 0 && (
              <>
                <h2 className="mb-8 text-3xl font-bold">
                  AI Recommended Properties
                </h2>

                <div className="space-y-8">

                  {recommendations.map((property) => (
                    <RecommendationCard
                      key={property._id}
                      property={property}
                    />
                  ))}

                </div>
              </>
            )}

          {!loading &&
            recommendations.length === 0 && (
              <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">

                <h2 className="text-xl font-semibold text-slate-700">
                  No recommendations yet
                </h2>

                <p className="mt-3 text-slate-500">
                  Fill in your preferences above and let
                  EstateHub AI find the most suitable
                  properties for you.
                </p>

              </div>
            )}

        </div>

      </div>

    </div>
  );
}