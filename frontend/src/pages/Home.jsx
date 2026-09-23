import { FiCheckCircle, FiClock, FiShield } from "react-icons/fi";

import FeaturedProperties from "../components/property/FeaturedProperties";
import Hero from "../components/common/Hero";

const highlights = [
  {
    icon: FiShield,
    title: "Owner-led listings",
    copy: "Useful details stay visible, so buyers can compare without guesswork.",
  },
  {
    icon: FiCheckCircle,
    title: "Shortlist faster",
    copy: "Filter by budget, location, and property type before opening details.",
  },
  {
    icon: FiClock,
    title: "Built for repeat visits",
    copy: "Owners get a simple dashboard and buyers get clean, scannable pages.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:px-6 md:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-6">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-slate-100 text-slate-700">
                <Icon />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.copy}</p>
            </div>
          );
        })}
      </section>
      <FeaturedProperties />
    </>
  );
}
