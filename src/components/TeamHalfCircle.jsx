import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Observer, ScrollTrigger);

const teamMembers = [
  {
    name: "Augustine",
    surname: "Vadakumchery",
    role: "Founder",
    img: "/event.png",
  },
  { name: "Akhil", surname: "Kumar S", role: "CDO", img: "/event.png" },
  { name: "John", surname: "Doe", role: "CTO", img: "/event.png" },
  { name: "Jane", surname: "Smith", role: "COO", img: "/event.png" },
  { name: "Alex", surname: "Brown", role: "CMO", img: "/event.png" },
];

/**
 * How many items (above/below) should be visible around the active one.
 * Example: 3 => total visible = 1 (active) + 3 above + 3 below = 7
 */
const VISIBLE_RADIUS = 3;

/**
 * Dynamic style for any offset.
 * offset = 0 is active; negative = above; positive = below
 */
const getItemStyle = (offset) => {
  const abs = Math.abs(offset);

  // hide far-away items
  if (abs > VISIBLE_RADIUS) {
    return {
      opacity: 0,
      scale: 0.6,
      pointerEvents: "none",
    };
  }

  // tweak these values to match your design
  const yStep = 220;
  const xStep = 50;
  const rotateStep = 12;
  const scaleDrop = 0.12;
  const opacityDrop = 0.2;

  return {
    y: offset * yStep,
    x: -abs * xStep,
    rotate: offset * rotateStep,
    scale: 1 - abs * scaleDrop,
    // opacity: 1 - abs * opacityDrop,
    zIndex: 10 - abs,
    pointerEvents: abs === 0 ? "auto" : "none",
  };
};

/**
 * Circular offset so edges wrap smoothly for multiple visible items
 */
const getVisualOffset = (index, activeIndex, length) => {
  let offset = index - activeIndex;

  // wrap to shortest distance around the circle
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;

  return offset;
};

export default function TeamHalfCircle({ teamPinRef }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);
  const itemRefs = useRef([]);
  const observerRef = useRef(null);

  // Animate left half circle items
  useEffect(() => {
    if (!itemRefs.current.length) return;

    isAnimating.current = true;

    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power3.out" },
      onComplete: () => (isAnimating.current = false),
    });

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const offset = getVisualOffset(index, activeIndex, teamMembers.length);
      tl.to(el, getItemStyle(offset), 0);
    });

    return () => tl.kill();
  }, [activeIndex]);

  // Scroll observer
  useEffect(() => {
    observerRef.current = Observer.create({
      target: window,
      type: "wheel,touch",
      enabled: false,
      wheelSpeed: -1,
      tolerance: 20,
      scrub: 0.7,
      onUp: () => {
        if (isAnimating.current) return;
        setActiveIndex((prev) =>
          prev < teamMembers.length - 1 ? prev + 1 : prev,
        );
      },
      onDown: () => {
        if (isAnimating.current) return;
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
      },
    });

    return () => observerRef.current?.kill();
  }, []);

  // Pin the section
  useLayoutEffect(() => {
    if (!teamPinRef?.current) return;

    const trigger = ScrollTrigger.create({
      trigger: teamPinRef.current,
      start: "top top",
      end: () => "+=" + teamPinRef.current.offsetHeight,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      markers: true,
      anticipatePin: 1,
      onEnter: () => observerRef.current?.enable(),
      onEnterBack: () => observerRef.current?.enable(),
      onLeave: () => observerRef.current?.disable(),
      onLeaveBack: () => observerRef.current?.disable(),
    });

    return () => trigger.kill();
  }, [teamPinRef]);

  return (
    <>
      <div className="relative h-screen w-screen flex items-center">
        {/* Left Half Circle */}
        <svg
          className="absolute top-1/2 -translate-y-1/2 z-0 pointer-events-none"
          width="680"
          height="1818"
          viewBox="0 0 773 1818"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-136 0C366.027 0 773 406.973 773 909C773 1411.03 366.027 1818 -136 1818C-638.027 1818 -1045 1411.03 -1045 909C-1045 406.973 -638.027 0 -136 0ZM-139.5 6C-625.234 6 -1019 399.766 -1019 885.5C-1019 1371.23 -625.234 1765 -139.5 1765C346.234 1765 740 1371.23 740 885.5C740 399.766 346.234 6 -139.5 6Z"
            fill="#0F5E5C"
          />
        </svg>

        {/* Left Items */}
        {/* increase height to fit multiple visible items */}
        <div className="relative w-full h-[min(80vh,800px)] ml-[36rem]">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-4 items-center"
              style={{ transformOrigin: "left center" }}
            >
              <img
                src={member.img}
                className="w-52 h-52 rounded-full border-[5px] border-[#9AE600]"
                alt=""
              />
              <div className="text-left">
                <h1 className="text-xl font-bold">{member.name}</h1>
                <h2 className="text-lg">{member.surname}</h2>
                <div className="mt-1 px-4 py-1 rounded-full bg-[#022F2E] border border-[#102025] inline-block">
                  <span className="font-bold">{member.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Featured Member */}
        <div className="absolute right-24 top-1/2 -translate-y-1/2 w-[420px]">
          <RightMember activeIndex={activeIndex} />
        </div>
      </div>
    </>
  );
}

// Right Member shows ONLY the active member
function RightMember({ activeIndex }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
    );
  }, [activeIndex]);

  const member = teamMembers[activeIndex];

  return (
    <div ref={ref} className="flex gap-6 items-center">
      <img
        src={member.img}
        className="w-56 h-56 rounded-full border-[6px] border-[#9AE600]"
        alt=""
      />
      <div>
        <h1 className="text-2xl font-bold">{member.name}</h1>
        <h2 className="text-xl">{member.surname}</h2>
        <div className="mt-2 px-5 py-1 rounded-full bg-[#022F2E] inline-block">
          <span className="font-bold">{member.role}</span>
        </div>
      </div>
    </div>
  );
}
