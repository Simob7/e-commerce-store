"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    title: "Tech that Inspires.",
    subtitle: "New Season Arrival",
    description:
      "Discover the next generation of electronics and gadgets. Premium quality.",
    image: "https://picsum.photos/id/180/800/800",
    accent: "text-blue-400",
    gradient: "from-blue-600/20",
  },
  {
    id: 2,
    title: "Sound Perfection.",
    subtitle: "Limited Edition",
    description:
      "Experience audio like never before with our noise-cancelling collection.",
    image: "https://picsum.photos/id/29/800/800",
    accent: "text-purple-400",
    gradient: "from-purple-600/20",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] lg:h-[600px] w-full bg-[#0a0a0c] overflow-hidden">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-105 z-0"
          }`}>
          {/* SMART BACKGROUND: Animated Glow */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} to-transparent opacity-50`}
          />
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full" />

          <div className="max-w-7xl mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 py-20 lg:py-0">
            {/* CONTENT LAYER */}
            <div className="text-center lg:text-left z-20 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/90 text-xs font-bold mb-6 backdrop-blur-md">
                <Sparkles size={14} className={slide.accent} /> {slide.subtitle}
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                {slide.title.split(" ")[0]} <br className="hidden lg:block" />
                <span className={`${slide.accent} drop-shadow-sm`}>
                  {slide.title.split(" ").slice(1).join(" ")}
                </span>
              </h1>

              <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed">
                {slide.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 group">
                  Explore Now
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>

            {/* IMAGE LAYER: Floating Effect */}
            <div className="relative z-20 order-1 lg:order-2 w-[280px] sm:w-[400px] lg:w-[450px] aspect-square">
              {/* Decorative Ring */}
              <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_20s_linear_infinite]" />

              <img
                src={slide.image}
                alt="Feature"
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float"
              />
            </div>
          </div>
        </div>
      ))}

      {/* SMART NAVIGATION: Vertical or Horizontal Dots */}
      <div className="absolute bottom-10 lg:bottom-auto lg:right-10 lg:top-1/2 lg:-translate-y-1/2 z-30 flex lg:flex-col gap-3 justify-center w-full lg:w-auto">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${
              i === current
                ? "w-10 lg:w-3 lg:h-10 bg-white"
                : "w-3 h-3 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
