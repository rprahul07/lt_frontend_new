import { FaChevronRight } from "react-icons/fa6";
import { LuCalendarClock } from "react-icons/lu";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsThreadsFill } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io";
import Earth from "./HomeEarth";
import { FaFacebook } from "react-icons/fa6";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import TreeWithFallingLeaves from "./animations/FallingLeaves";
import TeamHalfCircle from "./TeamHalfCircle";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
function AboutNew() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [overlayExpanded, setOverlayExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isEarthLoaded, setIsEarthLoaded] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [active, setActive] = useState("About");

  const mainRef = useRef(null);
  const earthRef = useRef(null);
  const journeyPointsRef = useRef([]);
  const heroSectionRef = useRef(null);
  const eventSectionRef = useRef(null);
  const journeyRef = useRef(null);
  const teamRef = useRef(null);
  const svgRef = useRef(null);
  const stateHeadRef = useRef(null);
  const connectRef = useRef(null);
  const footerRef = useRef(null);
  const teamPinRef = useRef(null);
  const logoRef = useRef(null);

  const [startHalfCircle, setStartHalfCircle] = useState(false);

  useEffect(() => {
    let timeout;
    if (menuOpen) {
      // Wait for the clip-path expansion (700ms) before showing links
      timeout = setTimeout(() => setOverlayExpanded(true), 300); // start links slightly after overlay
    } else {
      // Immediately hide links when menu closes
      setOverlayExpanded(false);
    }

    return () => clearTimeout(timeout);
  }, [menuOpen]);

  useEffect(() => {
    const path = document.querySelector("#journeyPath");
    if (!path) return;

    const total = path.getTotalLength();
    const samples = 300;
    const pts = [];

    for (let i = 0; i <= samples; i++) {
      const p = path.getPointAtLength((i / samples) * total);
      pts.push({ x: p.x, y: p.y });
    }

    journeyPointsRef.current = pts;
  }, []);

  useEffect(() => {
    const minDuration = 3000;
    const maxDuration = 8000;

    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        setLoading(false);
        setExiting(false);
        setShowContent(true);
      }, 500);
    }, minDuration);

    const maxTimer = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setExiting(false);
        setShowContent(true);
      }
    }, maxDuration);

    return () => {
      clearTimeout(timer);
      clearTimeout(maxTimer);
    };
  }, []);

  useEffect(() => {
    if (!teamRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: teamRef.current,
        start: "top top",
        onEnter: () => setStartHalfCircle(true),
        onLeaveBack: () => setStartHalfCircle(false),
      });

      return () => {
        trigger.kill();
      };
    });

    return () => mm.revert(); // very important cleanup
  }, []);

  useEffect(() => {
    if (loading || exiting) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Restore scroll
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading, exiting]);

  useLayoutEffect(() => {
    if (!heroSectionRef.current) return;
    if (!eventSectionRef.current) return;
    if (!journeyRef.current) return;
    if (!teamRef.current) return;
    if (!stateHeadRef.current) return;
    if (!connectRef.current) return;
    if (!footerRef.current) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      if (heroSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top 80%",
            // toggleActions: "play none none none",
            // scrub: 0.5 ,
          },
        });

        tl.fromTo(
          heroSectionRef.current.querySelector("img"),
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            // delay: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
          },
        ).fromTo(
          heroSectionRef.current.querySelector(".text-hero"),
          { opacity: 0, y: -50 },
          {
            opacity: 1,
            // delay : 1,
            y: 0,
            z: 23,
            duration: 1,
            ease: "power2.out",
          },
        );
      }

      if (eventSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: eventSectionRef.current,
            start: "top bottom",
            end: "bottom 80%",
            // toggleActions: "play none none none",
            scrub: 0.5,
          },
        });

        tl.fromTo(
          eventSectionRef.current.querySelector(".text-event"),
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
          },
        )
          .fromTo(
            eventSectionRef.current.querySelector(".event-button"),
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power2.out",
            },
          )
          .fromTo(
            eventSectionRef.current.querySelector(".event-info"),
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power2.out",
            },
          );
      }

      if (journeyRef.current) {
        const isLg = window.matchMedia("(min-width: 992px)").matches;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: journeyRef.current,
            start: "top bottom",
            end: "bottom +=600",
            scrub: 1.5,
          },
        });

        // ✅ ONLY LG: do the 3-step path animation
        if (isLg && logoRef.current) {
          // initial state (only for LG)
          gsap.set(logoRef.current, {
            opacity: 0,
            motionPath: {
              path: "#journeyPath",
              align: "#journeyPath",
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 0,
            },
          });

          // 1) opacity 0 -> 1
          tl.to(logoRef.current, {
            opacity: 1,
            duration: 1,
            delay: 1,
            ease: "none",
          });

          // 2) move along path
          tl.to(logoRef.current, {
            motionPath: {
              path: "#journeyPath",
              align: "#journeyPath",
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
              start: 0,
              end: 1,
            },
            duration: 3,
            ease: "none",
          });

          // 3) opacity 1 -> 0
          tl.to(logoRef.current, {
            opacity: 0,
            duration: 1,
            ease: "none",
          });
        } else {
          // ✅ Non-LG: no path animation, keep logo visible (or remove this if you want it unchanged)
          if (logoRef.current) gsap.set(logoRef.current, { opacity: 1 });
        }

        // ✅ ALL DEVICES: existing text animations
        tl.fromTo(
          journeyRef.current.querySelector(".journey-text"),
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0,
        )
          .fromTo(
            journeyRef.current.querySelector(".nov"),
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
            0.2,
          )
          .fromTo(
            journeyRef.current.querySelector(".jan"),
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
            0.45,
          )
          .fromTo(
            journeyRef.current.querySelector(".march"),
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
            0.7,
          );
      }

      if (teamRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: teamRef.current,
            // markers : true ,
            start: "top 70%", // Pin starts when section hits the very top
            // end: "+=500", // How long the section stays locked (in pixels)
            // pin: true, // Locks the trigger element in place
            scrub: 0.5, // Smoothly ties animation to scroll
            // anticipatePin: 1, // Prevents slight "glitches" during pin start
          },
        });

        tl.fromTo(
          teamRef.current.querySelector(".team"),
          { opacity: 0, y: -50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
        ).fromTo(
          teamRef.current.querySelector(".team-info").children,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.25,
          },
        );
      }

      if (stateHeadRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stateHeadRef.current,
            start: "top bottom",
            end: "bottom 80%",
            // toggleActions: "play none none none",
            scrub: 0.5,
          },
        });

        tl.fromTo(
          stateHeadRef.current.querySelector(".head-text"),
          { opacity: 0, y: -50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
        ).fromTo(
          stateHeadRef.current.querySelector(".head").children,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.25,
          },
        );
      }

      if (connectRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: connectRef.current,
            start: "top bottom",
            end: "bottom 80%",
            // toggleActions: "play none none none",
            scrub: 0.5,
          },
        });

        tl.from(connectRef.current.children, {
          opacity: 0,
          x: -40,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.25, // 👈 this makes them go one after another
        });
      }

      if (footerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom 80%",
            // toggleActions: "play none none none",
            scrub: 0.5,
          },
        });

        tl.from(footerRef.current.querySelector(".footer").children, {
          opacity: 0,
          x: -40,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.25, // 👈 this makes them go one after another
        }).from(footerRef.current.querySelector(".footer-text"), {
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
        });
      }

      ScrollTrigger.refresh();
    }, mainRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (loading || exiting) {
      // Block scrolling safely
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; // blocks gestures
    } else {
      // Restore scrolling
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [loading, exiting]);

  return (
    <>
      {(loading || exiting) && (
        <div
          style={{
            position: "fixed",
            inset: 0, // covers top, bottom, left, right
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            zIndex: 9999,
            transition: "transform 1s ease, opacity 0.5s ease",
            transform: exiting ? "translateY(-100%)" : "translateY(0)",
            opacity: exiting ? 0 : 1,
            pointerEvents: "all",
          }}
        >
          <TreeWithFallingLeaves />
        </div>
      )}

      {/* {!isEarthLoaded && (
       <TreeWithFallingLeaves />
      )} */}

      <div
        ref={earthRef}
        className="hidden lg:block  fixed top-[-60px] left-0 w-full h-[108vh]   overflow-hidden pointer-events-none"
      >
        {/* <StarsCanvas className="z-[45]" /> */}
        <Earth
          className="z-40"
          scrollRef={[
            eventSectionRef,
            heroSectionRef,
            journeyRef,
            teamRef,
            stateHeadRef,
            connectRef,
            journeyPointsRef,
          ]}
          onLoaded={() => setIsEarthLoaded(true)}
        />
      </div>

      <div className="fixed md:opacity-0 pointer-events-none bg-[#055b57] w-screen h-screen"></div>
      <div
        ref={mainRef}
        className={`min-h-screen   relative bg-[#003138]/0 bg-[url('./assets/star.png')]  w-screen bg-cover bg-center transition-all duration-700 ease-out transform`}
      >
        <div className="pointer-events-none fixed inset-0 z-0 bg-[#102025] bg-[url('./assets/star.png')] bg-cover bg-center opacity-15 " />
        <section className="relative">
          {/* HEADER (ABSOLUTE) */}
          <header className="absolute top-5 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2 rounded-3xl bg-[#102025]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <img src="/logo1.png" alt="logo" className="lg:h-14 h-10" />

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-20 rounded-full bg-opacity-10 bg-green-300 px-14 py-3 text-xl font-medium">
              {["Home", "Calendar", "About"].map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => setActive(item)}
                  className={`
      px-6 py-2 rounded-full transition
      ${
        active === item
          ? "bg-lime-400/20 text-lime-400"
          : "text-white hover:text-lime-700"
      }
    `}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Right Icons (Desktop stays here) */}
            <div className="hidden md:flex items-center gap-6">
              {/* Bell */}
              <div className="relative cursor-pointer">
                <svg
                  className="h-10 w-10 text-lime-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>

                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  3
                </span>
              </div>

              {/* Profile */}
              <img
                src="/profile.png"
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-slate-600 hover:border-lime-400 transition cursor-pointer"
              />
            </div>

            {/* Mobile Burger / X (only thing on the right on mobile) */}
            <button
              className="md:hidden relative h-8 w-8"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`absolute top-1/2 left-0 h-0.5 w-full bg-lime-400 transition-all duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-2"
                }`}
              />
              <span
                className={`absolute top-1/2 left-0 h-0.5 w-full bg-lime-400 transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute top-1/2 left-0 h-0.5 w-full bg-lime-400 transition-all duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-2"
                }`}
              />
            </button>
          </header>

          {/* CIRCULAR OVERLAY (Mobile: includes nav + bell + profile) */}
          <div
            className={`
    fixed inset-0 h-screen z-40 bg-[#102025]/95 
    backdrop-blur-md
    transition-[clip-path] duration-700 ease-[cubic-bezier(.22,1,.36,1)]
    ${
      menuOpen
        ? "[clip-path:circle(150%_at_92%_7%)]"
        : "[clip-path:circle(0px_at_92%_7%)] pointer-events-none"
    }
    md:hidden
  `}
          >
            {/* Center content */}
            <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl text-white">
              {/* Nav items */}
              {["Home", "Calendar", "About"].map((item, i) => (
                <a
                  key={item}
                  href="#"
                  className={`
          transition-[opacity,transform] duration-500
          ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
                  style={{
                    transitionDelay: `${menuOpen ? 300 + i * 120 : 0}ms`,
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}

              {/* Bell AFTER About */}
              <button
                type="button"
                className={`
        relative mt-2
        transition-[opacity,transform] duration-500
        ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
                style={{ transitionDelay: `${menuOpen ? 300 + 3 * 120 : 0}ms` }}
                aria-label="Notifications"
                onClick={() => setMenuOpen(false)}
              >
                <svg
                  className="h-10 w-10 text-lime-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>

                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  3
                </span>
              </button>

              {/* Profile AFTER Bell */}
              <button
                type="button"
                className={`
        transition-[opacity,transform] duration-500
        ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
                style={{ transitionDelay: `${menuOpen ? 300 + 4 * 120 : 0}ms` }}
                aria-label="Profile"
                onClick={() => setMenuOpen(false)}
              >
                <img
                  src="/profile.png"
                  alt="Profile"
                  className="h-12 w-12 rounded-full border-2 border-slate-600 hover:border-lime-400 transition"
                />
              </button>
            </div>
          </div>

          {/* HERO CONTENT (example) */}
        </section>

        <section
          ref={heroSectionRef}
          className="relative bg-transparent h-[100vh] pt-10 bg-[url(./assets/hero-bg1.png)] w-screen bg-cover bg-center bg-[#155B57]"
        >
          <img
            className="absolute z-[0] md:invisible bottom-10 scale-150
         drop-shadow-[0_50px_140px_rgba(21,128,61,0.95)]
"
            src="/hero-earth.png"
            alt="hero-section-image"
          />

          <div className="z-30 relative flex justify-center flex-col items-center pt-[250px] text-hero isolate">
            <div
              className="text-3xl lg:w-[70%]  text-left  flex gap-10 font-bold bg-gradient-to-b md:h-[10vh]  from-white from-[0%]
  via-[#f7ffe4] via-[50%]
  to-[#cfef80] to-[100%]
  bg-clip-text text-transparent lg:text-6xl lg:text-left lg:pr-44 
 md:text-5xl "
            >
              <div className="flex items-center justify-start">
                <h1>Professional</h1>
              </div>
              <div className="flex items-end">
                <h1>event linking</h1>
              </div>
            </div>
            <div
              className="z-30 text-3xl font-bold bg-gradient-to-b
  from-white from-[0%]
  via-[#f7ffe4] via-[50%]
  to-[#cfef80] to-[100%]
  bg-clip-text text-transparent flex gap-1"
            >
              <div className="flex items-start md:pt-5">
                <h1 className=" via text-lg lg:text-xl">via</h1>
              </div>
              <div className="flex items-end">
                <h1 className=" tree text-6xl lg:text-[14rem] md:text-9xl">
                  Lenient tree
                </h1>
              </div>
            </div>
          </div>
        </section>

        <section ref={eventSectionRef} className=" bg-[#102025] z-20  py-10 ">
          <div className="flex max-w-[1281px] mx-auto relative flex-col md:flex-row-reverse gap-4 md:gap-5">
            <div className="flex flex-col mx-5 lg:mx-0 md:w-1/2">
              {/* Image 1 - full width but cropped */}
              <div className="w-full h-64 md:h-full lg:w-[630px] lg:h-[366px] overflow-hidden">
                <img
                  src="./hero-img.png"
                  alt="hero-img"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Images 2 & 3 - 40% / 40% and cropped */}
              <div className="flex gap-4 mt-4">
                <div className="w-[49%] h-48 lg:h-[324px] lg:w-[307px] overflow-hidden">
                  <img
                    src="./hero-img.png"
                    alt="hero-img"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="w-[49%] h-48 lg:h-[324px] lg:w-[307px] overflow-hidden">
                  <img
                    src="./hero-img.png"
                    alt="hero-img"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="flex  flex-col gap-12 lg:mx-0 md:w-1/2 mx-auto">
              <div className="text-event flex flex-col gap-3 md:gap-8">
                <h1 className="flex flex-col text-5xl lg:text-8xl font-bold text tracking-wide">
                  <span>Lenient Tree</span>
                  <span>and our team</span>
                </h1>
                <h1 className="lg:text-xl">
                  Lenient Tree is your go-to platform for career growth offering
                  hands-on workshops, portfolio help, hackathon prep, startup
                  support and guidance. We connect students and professionals to
                  real-world skills and innovation, making the leap from
                  classroom to career smoother, smarter, and more exciting.
                  Learn, build, and grow with us!
                </h1>
              </div>
              <div>
                <div className=" flex flex-col lg:gap-6">
                  <div className="event-button flex bg-slate-400 bg-opacity-15 rounded-full py-2 gap-8 md:gap-4  md:w-full  md:mx-auto lg:gap-16 lg:px-2">
                    <div className="flex gap-3 pl-3  ">
                      <img
                        className="w-16 h-16  lg:w-32 lg:h-32  rounded-full border-2 border-solid border-green-800 "
                        src="/event.png"
                        alt="event logo"
                      />
                      <img
                        className="w-16 h-16  lg:w-32 lg:h-32 rounded-full border-2 border-solid border-green-800"
                        src="/event.png"
                        alt="event logo"
                      />
                      <img
                        className="w-16 h-16  lg:w-32 lg:h-32 rounded-full border-2 border-solid border-green-800"
                        src="/event.png"
                        alt="event logo"
                      />
                    </div>
                    <div className="w-16 h-16  lg:w-32 lg:h-32 rounded-full flex items-center justify-center border-4 bg-[#9AE600] border-solid border-green-100">
                      <FaChevronRight className="w-12 h-12 lg:w-20 lg:h-20" />
                    </div>
                  </div>
                  <div className="event-info flex text-black gap-6 text-base lg:text-lg py-5 md:p-5">
                    <div className="flex flex-col shadow-[inset_0_-2px_6px_rgba(0,0,0,0.4)] bg-white text-black p-2 md:w-1/3 rounded-2xl relative lg:text-2xl lg:p-5 ">
                      <h1 className="mx-1">
                        See Events
                        <span>
                          <FaChevronRight className="inline w-4 h-4 mb-1" />
                        </span>
                      </h1>
                      <LuCalendarClock className="font-bold mx-1 " />
                    </div>
                    <div className=" flex flex-col shadow-[inset_0_-2px_6px_rgba(0,0,0,0.4)] bg-white p-2 rounded-2xl md:w-2/3 lg:text-3xl lg:p-5 ">
                      <h1 className="mx-1">No. of Events conducted</h1>
                      <h2 className="mx-1 font-bold">200+</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={journeyRef} className="bg-[#102025] bg-transparent z-20 ">
          <div className="  relative max-width-[1281px] py-10 lg:pb-20 h-full lg:h-[1280px] w-full ">
            <img
              ref={logoRef}
              src="/earth-about.png"
              alt="logo"
              className="lg:block hidden w-24 h-24 absolute top-0 left-0 z-20 pointer-events-none"
            />
            <svg
              className="absolute hidden lg:block top-0 left-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 1000 1200"
              preserveAspectRatio="none"
            >
              <path
                id="journeyPath"
                d="M 374 5 C 568 35 698 220 560 344 C 280 403 244 488 448 631 C 877 818 403 1147 321 1176 C 184 1288 164 1292 76 1407
      "
                fill="none"
                stroke="#3FA9A3"
                strokeWidth="4"
                opacity="0.4"
                strokeDasharray="10 10"
              />
            </svg>

            <div className="bg-[#102025] journey-text md:absolute lg:top-[150px] lg:left-[150px] w-[50%] md:w-[35%] md:py-2 lg:w-[29%]  rounded-full border-2 border-[#102025] ml-10 flex items-center justify-center">
              <h1 className="pt-1 px-4 text-xl md:text-3xl  font-bold">
                OUR JOURNEY{" "}
                <span>
                  <FaChevronRight className="inline w-4 h-4 mb-1 font-bold" />
                </span>
              </h1>
            </div>
            <div className=" md:flex md:flex-col md:relative md:px-20">
              <div className="nov flex flex-col rounded-[3rem] mt-10 mx-4 md:w-[25%] md:self-end  gap-5 p-4 bg-[#102025] bg-opacity-70 ">
                <div className="flex items-center justify-center gap-6">
                  <img
                    className="w-24 h-24"
                    src="/earth-about.png"
                    alt="earth logo"
                  />
                  <span className=" text-3xl font-bold">12 Nov, 2024</span>
                </div>
                <h1 className="text-xl px-3">
                  {" "}
                  <span>Lenient Tree</span>bridges the education-industry gap,
                  empowering learners with practical, real-world skills to take
                  control of their careers.
                </h1>
              </div>
              <div className="jan flex flex-col rounded-[3rem] mt-10 mx-4 md:w-[25%] md:self-start gap-5 p-4 bg-[#102025] bg-opacity-70">
                <div className="flex items-center justify-center gap-6 lg:gap-2">
                  <span className=" text-3xl font-bold">30 Jan, 2025</span>
                  <img
                    className="w-24 h-24 inline"
                    src="/earth-about.png"
                    alt="earth logo"
                  />
                </div>
                <h1 className="text-xl px-3">
                  {" "}
                  <span>Lenient Tree</span>bridges the education-industry gap,
                  empowering learners with practical, real-world skills to take
                  control of their careers.
                </h1>
              </div>
              <div className="march flex flex-col rounded-[3rem] mt-10 md:w-[25%] mx-4 md:self-end  gap-5 p-4 bg-[#102025] bg-opacity-70">
                <h1 className="text-xl px-3">
                  {" "}
                  <span>Lenient Tree</span>bridges the education-industry gap,
                  empowering learners with practical, real-world skills to take
                  control of their careers.
                </h1>
                <div className="flex items-center justify-center gap-6">
                  <img
                    className="w-24 h-24"
                    src="/earth-about.png"
                    alt="earth logo"
                  />
                  <span className=" text-3xl font-bold">19 March, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={teamRef}
          className="bg-[#055B57] bg-transparent py-10 lg:pt-20 w-full relative "
        >
          <div className="bg-[#102025] lg:absolute lg:top-[30px] lg:right-[100px] team w-[70%] md:mt-32 md:mx-auto md:w-[30%] md:text-4xl rounded-full border-2  border-[#102025] ml-10 flex items-center justify-center">
            <h1 className=" py-1  text-xl md:text-3xl font-bold tracking-wider ">
              OUR TEAM
            </h1>
          </div>
          <div className="block md:hidden team-info">
            <div className=" mt-10 flex gap-3 md:w-2/5 items-center justify-center">
              <img
                className="border-[5px] border-[#9AE600] w-[40%] rounded-full"
                src="/event.png"
                alt="team-image"
              />
              <div className="flex flex-col gap-2">
                <div className="text-xl font-bold">
                  <h1>Augustine</h1>
                  <h2>Vadakumchery</h2>
                </div>
                <div className="bg-[#022F2E] w-[100%] rounded-full border-2  border-[#102025]  flex items-center justify-center">
                  <h1 className=" py-1 text-xl font-bold tracking-wider">
                    Founder
                  </h1>
                </div>
              </div>
            </div>
            <div className=" mt-10 flex gap-7 md:w-3/5 items-center justify-center">
              <img
                className="border-[5px] border-[#9AE600] w-[40%] rounded-full"
                src="/event.png"
                alt="team-image"
              />
              <div className="flex flex-col gap-2">
                <div className="text-xl font-bold">
                  <h1>Akhil</h1>
                  <h2>Kumar S</h2>
                </div>
                <div className="bg-[#022F2E] w-[105px] rounded-full border-2  border-[#102025]  flex  justify-center">
                  <h1 className=" py-1 text-xl font-bold tracking-wider">
                    CDO
                  </h1>
                </div>
              </div>
            </div>
            <div className=" mt-10 flex gap-7 md:w-3/5 items-center justify-center">
              <img
                className="border-[5px] border-[#9AE600] w-[40%] rounded-full"
                src="/event.png"
                alt="team-image"
              />
              <div className="flex flex-col gap-2">
                <div className=" text-xl font-bold">
                  <h1>Akhil</h1>
                  <h2>Kumar S</h2>
                </div>
                <div className="bg-[#022F2E] w-[105px] rounded-full border-2  border-[#102025]  flex items-center justify-center">
                  <h1 className=" py-1 text-xl font-bold tracking-wider">
                    CDO
                  </h1>
                </div>
              </div>
            </div>
            <div className=" mt-10 flex gap-7 md:w-3/5 items-center justify-center">
              <img
                className="border-[5px] border-[#9AE600] w-[40%] rounded-full"
                src="/event.png"
                alt="team-image"
              />
              <div className="flex flex-col gap-2">
                <div className="text-xl font-bold">
                  <h1>Akhil</h1>
                  <h2>Kumar S</h2>
                </div>
                <div className="bg-[#022F2E] w-[105px] rounded-full border-2  border-[#102025]  flex  justify-center">
                  <h1 className=" py-1 text-xl font-bold tracking-wider">
                    CDO
                  </h1>
                </div>
              </div>
            </div>
            <div className=" mt-10 flex gap-7 md:w-3/5 items-center justify-center">
              <img
                className="border-[5px] border-[#9AE600] w-[40%] rounded-full"
                src="/event.png"
                alt="team-image"
              />
              <div className="flex flex-col gap-2">
                <div className=" text-xl font-bold">
                  <h1>Akhil</h1>
                  <h2>Kumar S</h2>
                </div>
                <div className="bg-[#022F2E] w-[105px] rounded-full border-2  border-[#102025]  flex items-center justify-center">
                  <h1 className=" py-1 text-xl font-bold tracking-wider">
                    CDO
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block h-[90vj]">
            <TeamHalfCircle teamPinRef={teamPinRef} />
          </div>
        </section>

        <section
          ref={stateHeadRef}
          className="bg-[#055B57] bg-transparent py-15 lg:pt-56 pb-20 w-full h-full overflow-x-hidden"
        >
          <div className="bg-[#102025] head-text w-[70%] md:w-[40%] mx-auto rounded-full border-2 border-[#102025] flex items-center justify-center">
            <h1 className="py-1 md:p-1.5 text-xl md:text-3xl font-bold tracking-wider">
              STATE HEADS
            </h1>
          </div>

          <div className="head flex flex-wrap flex-col md:flex-row justify-center items-center mx-auto">
            <div className="flex flex-wrap gap-14 mt-10 px-10 text-black">
              <div className=" flex flex-col bg-gradient-to-tr from-slate-50 to-green-100 w-[332px] h-full rounded-[30px] gap-3 p-5">
                <div className=" flex  gap-10">
                  <img
                    className=" w-24 rounded-[30px] border-2 border-slate-600"
                    src="/event.png"
                    alt="state head images"
                  />
                  <div className=" text-xl text-right">
                    <h1>Meera Surendran</h1>
                    <h1>Kerala</h1>
                  </div>
                </div>
                <div className="flex gap-10 items-center justify-center">
                  <FaLinkedin className=" text-2xl" />
                  <IoLogoGithub className=" text-2xl" />
                  <FaSquareXTwitter className=" text-2xl" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-14 mt-10 px-10 text-black">
              <div className=" flex flex-col bg-gradient-to-tr from-slate-50 to-green-100 w-[332px] h-full rounded-[30px] gap-3 p-5">
                <div className=" flex  gap-10">
                  <img
                    className=" w-24 rounded-[30px] border-2 border-slate-600"
                    src="/event.png"
                    alt="state head images"
                  />
                  <div className=" text-xl text-right">
                    <h1>Meera Surendran</h1>
                    <h1>Kerala</h1>
                  </div>
                </div>
                <div className="flex gap-10 items-center justify-center">
                  <FaLinkedin className=" text-2xl" />
                  <IoLogoGithub className=" text-2xl" />
                  <FaSquareXTwitter className=" text-2xl" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-14 mt-10 px-10 text-black">
              <div className=" flex flex-col bg-gradient-to-tr from-slate-50 to-green-100 w-[332px] h-full rounded-[30px] gap-3 p-5">
                <div className=" flex  gap-10">
                  <img
                    className=" w-24 rounded-[30px] border-2 border-slate-600"
                    src="/event.png"
                    alt="state head images"
                  />
                  <div className=" text-xl text-right">
                    <h1>Meera Surendran</h1>
                    <h1>Kerala</h1>
                  </div>
                </div>
                <div className="flex gap-10 items-center justify-center">
                  <FaLinkedin className=" text-2xl" />
                  <IoLogoGithub className=" text-2xl" />
                  <FaSquareXTwitter className=" text-2xl" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-14 mt-10 px-10 text-black">
              <div className=" flex flex-col bg-gradient-to-tr from-slate-50 to-green-100 w-[332px] h-full rounded-[30px] gap-3 p-5">
                <div className=" flex  gap-10">
                  <img
                    className=" w-24 rounded-[30px] border-2 border-slate-600"
                    src="/event.png"
                    alt="state head images"
                  />
                  <div className=" text-xl text-right">
                    <h1>Meera Surendran</h1>
                    <h1>Kerala</h1>
                  </div>
                </div>
                <div className="flex gap-10 items-center justify-center">
                  <FaLinkedin className=" text-2xl" />
                  <IoLogoGithub className=" text-2xl" />
                  <FaSquareXTwitter className=" text-2xl" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-14 mt-10 px-10 text-black">
              <div className=" flex flex-col bg-gradient-to-tr from-slate-50 to-green-100 w-[332px] h-full rounded-[30px] gap-3 p-5">
                <div className=" flex  gap-10">
                  <img
                    className=" w-24 rounded-[30px] border-2 border-slate-600"
                    src="/event.png"
                    alt="state head images"
                  />
                  <div className=" text-xl text-right">
                    <h1>Meera Surendran</h1>
                    <h1>Kerala</h1>
                  </div>
                </div>
                <div className="flex gap-10 items-center justify-center">
                  <FaLinkedin className=" text-2xl" />
                  <IoLogoGithub className=" text-2xl" />
                  <FaSquareXTwitter className=" text-2xl" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-14 mt-10 px-10 text-black">
              <div className=" flex flex-col bg-gradient-to-tr from-slate-50 to-green-100 w-[332px] h-full rounded-[30px] gap-3 p-5">
                <div className=" flex  gap-10">
                  <img
                    className=" w-24 rounded-[30px] border-2 border-slate-600"
                    src="/event.png"
                    alt="state head images"
                  />
                  <div className=" text-xl text-right">
                    <h1>Meera Surendran</h1>
                    <h1>Kerala</h1>
                  </div>
                </div>
                <div className="flex gap-10 items-center justify-center">
                  <FaLinkedin className=" text-2xl" />
                  <IoLogoGithub className=" text-2xl" />
                  <FaSquareXTwitter className=" text-2xl" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-14 mt-10 px-10 text-black">
              <div className=" flex flex-col bg-gradient-to-tr from-slate-50 to-green-100 w-[332px] h-full rounded-[30px] gap-3 p-5">
                <div className=" flex  gap-10">
                  <img
                    className=" w-24 rounded-[30px] border-2 border-slate-600"
                    src="/event.png"
                    alt="state head images"
                  />
                  <div className=" text-xl text-right">
                    <h1>Meera Surendran</h1>
                    <h1>Kerala</h1>
                  </div>
                </div>
                <div className="flex gap-10 items-center justify-center">
                  <FaLinkedin className=" text-2xl" />
                  <IoLogoGithub className=" text-2xl" />
                  <FaSquareXTwitter className=" text-2xl" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-14 mt-10 px-10 text-black">
              <div className=" flex flex-col bg-gradient-to-tr from-slate-50 to-green-100 w-[332px] h-full rounded-[30px] gap-3 p-5">
                <div className=" flex  gap-10">
                  <img
                    className=" w-24 rounded-[30px] border-2 border-slate-600"
                    src="/event.png"
                    alt="state head images"
                  />
                  <div className=" text-xl text-right">
                    <h1>Meera Surendran</h1>
                    <h1>Kerala</h1>
                  </div>
                </div>
                <div className="flex gap-10 items-center justify-center">
                  <FaLinkedin className=" text-2xl" />
                  <IoLogoGithub className=" text-2xl" />
                  <FaSquareXTwitter className=" text-2xl" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-14 mt-10 px-10 text-black">
              <div className=" flex flex-col bg-gradient-to-tr from-slate-50 to-green-100 w-[332px] h-full rounded-[30px] gap-3 p-5">
                <div className=" flex  gap-10">
                  <img
                    className=" w-24 rounded-[30px] border-2 border-slate-600"
                    src="/event.png"
                    alt="state head images"
                  />
                  <div className=" text-xl text-right">
                    <h1>Meera Surendran</h1>
                    <h1>Kerala</h1>
                  </div>
                </div>
                <div className="flex gap-10 items-center justify-center">
                  <FaLinkedin className=" text-2xl" />
                  <IoLogoGithub className=" text-2xl" />
                  <FaSquareXTwitter className=" text-2xl" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-14 mt-10 px-10 text-black">
              <div className=" flex flex-col bg-gradient-to-tr from-slate-50 to-green-100 w-[332px] h-full rounded-[30px] gap-3 p-5">
                <div className=" flex  gap-10">
                  <img
                    className=" w-24 rounded-[30px] border-2 border-slate-600"
                    src="/event.png"
                    alt="state head images"
                  />
                  <div className=" text-xl text-right">
                    <h1>Meera Surendran</h1>
                    <h1>Kerala</h1>
                  </div>
                </div>
                <div className="flex gap-10 items-center justify-center">
                  <FaLinkedin className=" text-2xl" />
                  <IoLogoGithub className=" text-2xl" />
                  <FaSquareXTwitter className=" text-2xl" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-14 mt-10 px-10 text-black">
              <div className=" flex flex-col bg-gradient-to-tr from-slate-50 to-green-100 w-[332px] h-full rounded-[30px] gap-3 p-5">
                <div className=" flex  gap-10">
                  <img
                    className=" w-24 rounded-[30px] border-2 border-slate-600"
                    src="/event.png"
                    alt="state head images"
                  />
                  <div className=" text-xl text-right">
                    <h1>Meera Surendran</h1>
                    <h1>Kerala</h1>
                  </div>
                </div>
                <div className="flex gap-10 items-center justify-center">
                  <FaLinkedin className=" text-2xl" />
                  <IoLogoGithub className=" text-2xl" />
                  <FaSquareXTwitter className=" text-2xl" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-14 mt-10 px-10 text-black">
              <div className=" flex flex-col bg-gradient-to-tr from-slate-50 to-green-100 w-[332px] h-full rounded-[30px] gap-3 p-5">
                <div className=" flex  gap-10">
                  <img
                    className=" w-24 rounded-[30px] border-2 border-slate-600"
                    src="/event.png"
                    alt="state head images"
                  />
                  <div className=" text-xl text-right">
                    <h1>Meera Surendran</h1>
                    <h1>Kerala</h1>
                  </div>
                </div>
                <div className="flex gap-10 items-center justify-center">
                  <FaLinkedin className=" text-2xl" />
                  <IoLogoGithub className=" text-2xl" />
                  <FaSquareXTwitter className=" text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={connectRef}
          className="bg-[#102025] z-[20] py-14 -mt-5 pb-20 h-full w-full relative rounded-t-3xl"
        >
          <img
            src="./earth-about.png"
            alt="footer image"
            className="absolute hidden lg:block z-[-10] -bottom-[250px] w-[800px] -right-[150px]"
          />
          <div className="mx-auto z-20 lg:mx-20 w-[90%] md:w-[50%] flex justify-start pb-10 flex-col md:items-start items-center gap-3">
            <div className=" flex flex-col gap-2 ">
              <h1 className="text-left text-2xl font-bold lg:text-6xl">
                Partner With{" "}
                <span className=" text-[#9AE600]">Lenient Tree</span>
              </h1>
              <h1 className="w-[90%] text-slate-400 lg:text-xl">
                Connect with high-potential talent and drive industry
                innovation. We bridge the gap between academic foundation and
                professional excellence.
              </h1>
            </div>
            <button className="text-center mt-2 bg-[#9AE600] w-[90%] lg:text-2xl  text-black p-1 rounded-3xl">
              Get in touch
            </button>
          </div>
          <div className="bg-[#022F2E] z-20 w-[90%] flex flex-col md:flex-row md:text-left items-center md:justify-center md:gap-20 text-center rounded-3xl mx-auto p-7 gap-10 text-lg tracking-wider">
            <div>
              <h1 className="lg:text-sm text-[#A1A1A1]">Email</h1>
              <h1>lenienttree@gmail.com</h1>
            </div>
            <div>
              <h1 className="lg:text-sm text-[#A1A1A1]">Phone</h1>
              <h1>+91 1234567890</h1>
            </div>
            <div>
              <h1 className="lg:text-sm text-[#A1A1A1]">Website</h1>
              <h1>www.lenienttree.com</h1>
            </div>
          </div>
          
        </section>

        <section
          ref={footerRef}
          className="bg-[#022F2e] relative pt-15 z-[22] px-15 w-full mx-auto rounded-t-3xl -mt-6 overflow-hidden"
        >
          <div className="footer w-full text-center md:text-left md:items-start items-center mx-auto text-2xl flex flex-col gap-10 pt-10 md:flex-row md:justify-around md:text-lg">
            <div className=" ">
              <div className="flex  flex-col ">
                <h1 className="pb-2">Lenient Tree</h1>
                <h1 className=" pb-2 text-lg">Access to events are easy</h1>
                <h1 className=" text-lg"> &copy; 2025 The Lenient Tree</h1>
                <h1 className=" text-lg">All rights reserved</h1>
              </div>
              <div className="flex  md:justify-normal  md:gap-4 gap-8 pt-5">
                <BsThreadsFill className="text-2xl" />
                <IoLogoInstagram className=" text-2xl" />
                <FaFacebook className="text-2xl" />
                <FaSquareXTwitter className=" text-2xl" />
                <FaLinkedin className=" text-2xl" />
              </div>
            </div>
            <div className="flex  flex-col gap-3 text-[#D8F999]">
              <h1>Quick Links</h1>
              <h1>Home</h1>
              <h1>Calendar</h1>
              <h1>About</h1>
              <h1>Subcriptions</h1>
            </div>
            <div className="flex  flex-col gap-3 text-[#D8F999]">
              <h1>Essentials</h1>
              <h1>Terms & Conditions</h1>
              <h1>Privacy Policy</h1>
              <h1>Blogs</h1>
            </div>
            <div className="flex  flex-col gap-3 text-[#D8F999]">
              <h1>Partners</h1>
              <h1>UK Limited</h1>
              <h1>Degraph</h1>
              <h1>Anony events</h1>
            </div>
          </div>
          <div className="text-center overflow-hidden">
            <h1 className="text-[#102025] text-8xl md:text-[13rem] lg:text-[23rem] lg:-mt-44 md:-mt-20 font-bold leading-none translate-y-1/2">
              LENIENT
            </h1>
          </div>
        </section>
      </div>
    </>
  );
}
export default AboutNew;
