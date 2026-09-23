import { useMemo, useState } from "react";
import { FiImage, FiPlusCircle } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { generateDescription } from "../../services/aiService";
import { createProperty } from "../../services/propertyService";

const initialForm = {
  title: "",
  description: "",
  propertyType: "",
  bedrooms: 0,
  bathrooms: 0,
  price: "",
  location: "",
};

export default function AddProperty() {
  const [formData, setFormData] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const imageNames = useMemo(
    () => Array.from(images || []).map((image) => image.name),
    [images],
  );

  const handleGenerateDescription = async () => {
    try {
      const data = await generateDescription({
        title: formData.title,
        propertyType: formData.propertyType,
        location: formData.location,
        price: formData.price,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
      });

      setFormData((prev) => ({
        ...prev,
        description: data.description,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      Array.from(images || []).forEach((image) => {
        payload.append("images", image);
      });

      await createProperty(payload);
      navigate("/owner/my-properties");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to add property. Check the details and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Owner workspace
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-950">
            Add a property
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Keep the title specific, add a clear location, and upload the best
            photos first. Buyers scan quickly.
          </p>
        </div>
        <Link
          to="/owner/my-properties"
          className="text-sm font-semibold text-slate-600 hover:text-slate-950"
        >
          View my listings
        </Link>
      </div>

      <form
        onSubmit={submitHandler}
        className="grid gap-6 lg:grid-cols-[1fr_320px]"
      >
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          {error && (
            <p className="mb-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">Title</span>
              <input
                name="title"
                value={formData.title}
                required
                onChange={handleChange}
                placeholder="3 BHK apartment near Civil Lines"
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-slate-950"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Price</span>
              <input
                name="price"
                value={formData.price}
                required
                min="0"
                type="number"
                onChange={handleChange}
                placeholder="7500000"
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-slate-950"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Property type
              </span>
              <select
                name="propertyType"
                value={formData.propertyType}
                required
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-slate-950"
              >
                <option value="">Select type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">
                Location
              </span>
              <input
                name="location"
                value={formData.location}
                required
                onChange={handleChange}
                placeholder="City, locality, landmark"
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-slate-950"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Bedrooms
              </span>
              <input
                name="bedrooms"
                value={formData.bedrooms}
                min="0"
                type="number"
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-slate-950"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                Bathrooms
              </span>
              <input
                name="bathrooms"
                value={formData.bathrooms}
                min="0"
                type="number"
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-slate-950"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">
                Description
              </span>
              <br/>
              <button
                type="button"
                onClick={handleGenerateDescription}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                ✨ Generate AI Description
              </button>
              <textarea
                name="description"
                value={formData.description}
                required
                rows="6"
                onChange={handleChange}
                placeholder="Mention layout, nearby roads, society amenities, parking, documents, and anything buyers should know."
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm leading-6 outline-none focus:border-slate-950"
              />
            </label>
          </div>
        </section>

        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-slate-100 text-slate-700">
            <FiImage />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-slate-950">Photos</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Upload up to 5 JPG or PNG images. The first image becomes the
            listing cover.
          </p>

          <label className="mt-5 block cursor-pointer rounded-lg border border-dashed border-slate-300 p-5 text-center text-sm text-slate-500 hover:border-slate-950">
            <span className="font-medium text-slate-950">Choose images</span>
            <input
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png"
              className="sr-only"
              onChange={(event) => setImages(event.target.files)}
            />
          </label>

          {imageNames.length > 0 && (
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {imageNames.map((name) => (
                <li
                  key={name}
                  className="truncate rounded-md bg-slate-100 px-3 py-2"
                >
                  {name}
                </li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            <FiPlusCircle />
            {isSubmitting ? "Adding property..." : "Add property"}
          </button>
        </aside>
      </form>
    </div>
  );
}
