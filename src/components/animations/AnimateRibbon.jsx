import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedBadge() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const rects = svg.querySelectorAll("rect");
    const texts = svg.querySelectorAll("text");
    const polygons = svg.querySelectorAll("polygon");
    const ribbon = svg.querySelector("path");

    gsap.set([polygons, rects, texts, ribbon], { opacity: 1, scale: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.from(polygons, {
      scale: 0,
      opacity: 0,
      transformOrigin: "center",
      duration: 0.5,
      stagger: 0.3,
      ease: "back.out(1.7)",
    });

    tl.fromTo(rects[0], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
    tl.fromTo(texts[0], { opacity: 0 }, { opacity: 1, duration: 0.3 }, "-=0.2");
    tl.fromTo(rects[1], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.1");
    tl.fromTo(texts[1], { opacity: 0 }, { opacity: 1, duration: 0.3 }, "-=0.2");
    tl.fromTo(ribbon, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "bounce.out" });

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="flex justify-center rounded-lg items-center py-5 bg-white w-full max-w-[120px] md:max-h-[155px] max-h-[98px] sm:max-w-[120px] md:max-w-[340px] mx-auto">

      <svg
        ref={svgRef}
        className="w-full h-[100px] sm:h-[100px] md:h-[160px] block"
        viewBox="0 40 340 200"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <path d="M25 0 L25 80 L37.5 60 L50 80 L50 0 Z" fill="#C62828" />
        <polygon points="85,140 120,75 155,140" fill="#E0E0E0" />
        <polygon points="110,155 165,65 220,155" fill="#BDBDBD" />
        <polygon points="130,165 215,30 300,165" fill="#616161" />

        <rect x="140" y="150" width="170" height="35" rx="18" ry="18" fill="#C0FF00" />
        <text x="225" y="173" fontFamily="Arial, sans-serif" fontSize="13" fill="#1A1A1A" textAnchor="middle" fontWeight="bold" letterSpacing="1">REGISTER</text>

        <rect x="140" y="195" width="170" height="35" rx="18" ry="18" fill="#263238" />
        <text x="225" y="218" fontFamily="Arial, sans-serif" fontSize="13" fill="#FFFFFF" textAnchor="middle" fontWeight="bold" letterSpacing="1">BOOKMARK</text>
      </svg>
    </div>
  );
}
