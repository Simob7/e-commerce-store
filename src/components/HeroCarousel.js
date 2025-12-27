"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const SLIDES = [
  {
    id: 1,
    title: "Tech that Inspires.",
    subtitle: "New Season Arrival",
    description:
      "Discover the next generation of electronics and gadgets. Premium quality, unbeatable prices.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    accent: "text-blue-500",
    bg: "from-gray-900 via-gray-900 to-blue-900/20",
  },
  {
    id: 2,
    title: "Sound Perfection.",
    subtitle: "Limited Edition",
    description:
      "Experience audio like never before with our noise-cancelling collection. 30% off today.",
    image:
      "https://images.unsplash.com/photo-1518445696421-2be1e6d92e25?auto=format&fit=crop&w=800&q=80",
    accent: "text-purple-500",
    bg: "from-gray-900 via-gray-900 to-purple-900/20",
  },
  {
    id: 3,
    title: "Smart Living.",
    subtitle: "Eco-Friendly Tech",
    description:
      "Automate your world with the latest in smart home innovation and energy-saving devices.",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    accent: "text-green-500",
    bg: "from-gray-900 via-gray-900 to-green-900/20",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000); // Changes every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[600px] sm:h-[700px] w-full bg-gray-900 overflow-hidden">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}>
          {/* Background Gradient Layer */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg}`} />

          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col lg:flex-row items-center justify-between gap-12 py-16">
            <div
              className={`text-center lg:text-left transition-all duration-700 delay-300 ${
                index === current
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm font-bold mb-6">
                <Sparkles size={16} /> {slide.subtitle}
              </span>
              <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-6 tracking-tight">
                {slide.title.split(" ")[0]}{" "}
                <span className={slide.accent}>
                  {slide.title.split(" ").slice(1).join(" ")}
                </span>
              </h1>
              <p className="text-gray-400 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
                {slide.description}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 group">
                  Shop Now{" "}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>

            {/* Image Layer */}
            <div
              className={`relative w-full max-w-lg aspect-square lg:w-1/2 transition-all duration-1000 delay-500 ${
                index === current
                  ? "scale-100 opacity-100"
                  : "scale-90 opacity-0"
              }`}>
              <img
                src={slide.image}
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                alt="Product"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Progress Indicators (Dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 transition-all duration-300 rounded-full ${
              i === current ? "w-8 bg-blue-500" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
