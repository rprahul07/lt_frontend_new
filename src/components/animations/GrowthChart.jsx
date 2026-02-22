import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const MiniGrowthChart = () => {
  const chartPathRef = useRef(null);
  const pointerDotRef = useRef(null);
  const tooltipRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const path = chartPathRef.current;
    const dot = pointerDotRef.current;
    const tooltip = tooltipRef.current;
    const container = containerRef.current;

    if (!path || !dot || !tooltip || !container) return;

    const pathLength = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    gsap.set(dot, { opacity: 0 });
    gsap.set(tooltip, { opacity: 0, y: 5 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
    });

    tl.to(
      dot,
      {
        opacity: 1,
        duration: 2,
        ease: "power2.inOut",
        motionPath: {
          path,
          align: path,
          autoRotate: false,
          alignOrigin: [0.5, 0.5],
        },
      },
      0
    );

    tl.to(
      tooltip,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.2"
    );

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
   <div
  ref={containerRef}
  className="w-full max-w-[500px] md:max-w-[500px] sm:max-w-[100px]  pl-[100px] md:pl-0 mx-auto px-5 py-5"
>
  <svg
    viewBox="0 0 285 183"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-[100px]  md:h-auto block"
    preserveAspectRatio="xMidYMid meet"
  >
        <rect
          x="2"
          y="2"
          width="281"
          height="179"
          rx="16"
          fill="#F7F7F7"
          stroke="#E3E3E3"
          strokeWidth="4"
        />

        <g stroke="#E0E0E0" strokeWidth="3">
          {[32, 65, 98, 131, 164, 197, 230, 263].map((x, i) => (
            <line key={i} x1={x} y1="18" x2={x} y2="165" />
          ))}
        </g>

        <path
          ref={chartPathRef}
          d="M25,140 L60,120 L90,108 L120,120 L160,100 L200,140 L260,44"
          fill="none"
          stroke="#20292F"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <circle ref={pointerDotRef} cx="25" cy="140" r="8" fill="#20292F" />

        <g ref={tooltipRef} transform="translate(150, 10)">
          <rect rx="7" width="135" height="26" fill="#20292F" />
          <ellipse cx="15" cy="13" rx="8" ry="5" fill="#fff" opacity="0.7" />
          <circle cx="15" cy="13" r="2" fill="#20292F" />
          <text
            x="30"
            y="18"
            fill="#fff"
            fontSize="15px"
            fontFamily="Arial, sans-serif"
          >
            10,000+ views
          </text>
        </g>
      </svg>
    </div>
  );
};

export default MiniGrowthChart;
