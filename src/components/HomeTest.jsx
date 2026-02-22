// Home.jsx
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HomeTest = () => {
    // Refs for animations
    const headerRef = useRef(null);
    const heroRef = useRef(null);
    const eventsRef = useRef(null);
    const ctaRef = useRef(null);
    const communityRef = useRef(null);
    const testimonialRef = useRef(null);
    const marqueeRef = useRef(null);


    // State for interactive components
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // Data
    const slides = [
        './assets/hero1.png',
        './assets/hero2.png',
        './assets/hero3.png',
        './assets/hero4.png'
    ];

    const words = ["Hackathons", "Tech Fests", "Ideathons", "Conclaves"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const eventColors = ['red', 'blue', 'purple', 'yellow'];
    // Hardcoded list of days that will have an event underline
    const eventDaysForCurrentMonth = [5, 8, 14, 22, 27];

    const events = [
        {
            id: 1,
            title: 'Hackathon @TEC20',
            prizePool: '$ 20K Prize Pool',
            location: 'TEC Grounds, Rajagiri',
            format: 'Online',
            participants: '1099',
            color: 'blue'
        },
        {
            id: 2,
            title: 'Web3 Conclave',
            prizePool: '$ 50K Prize Pool',
            location: 'Bangalore',
            participants: '5000+',
            color: 'green'
        },
        {
            id: 3,
            title: 'Startup Challenge',
            prizePool: 'Ideathon',
            format: 'Online',
            participants: '250 Teams',
            color: 'red'
        },
        {
            id: 4,
            title: 'Game Jam 2024',
            prizePool: '$ 10K Prize Pool',
            location: 'Mumbai',
            participants: '800',
            color: 'green'
        }
    ];


    const logos = [
        'https://i.imgur.com/gYf2m2i.png',
        'https://i.imgur.com/vHqJ97i.png',
        'https://i.imgur.com/6U1eY5j.png'
    ];

    const testimonials = [
        {
            name: 'Mark Zhong',
            company: 'aCCUTARY',
            companyIcon: 'a',
            image: 'https://i.imgur.com/jUNh2tK.png',
            quote: 'Hi, I am happy with Lenient Tree and hope to work with them more often.'
        },
        {
            name: 'Henry Dockson',
            company: 'Bilency',
            companyIcon: 'B',
            image: 'https://i.imgur.com/y1fwp0d.png',
            quote: 'Lenient Tree is growing everyday, and I want to be part of it. Investment such as this is always a great option in my opinion.'
        },
        {
            name: 'Arnav Ghani',
            company: 'Artystry H&C',
            companyIcon: '@',
            image: 'https://i.imgur.com/8QpJaQy.png',
            quote: 'Creativity is not limited for Lenient Tree, they help us get the best results. It\'s their ART.'
        }
    ];

    // Effects for animations and intervals
    useEffect(() => {
        // Header animation
        gsap.fromTo(headerRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );

        // Hero slider interval
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        // Rotating text interval
        const textInterval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);

        // Marquee animation
        if (marqueeRef.current) {
            gsap.to(marqueeRef.current, {
                x: '-50%',
                duration: 30,
                ease: 'none',
                repeat: -1
            });
        }

        return () => {
            clearInterval(slideInterval);
            clearInterval(textInterval);
        };
    }, [slides.length, words.length]);

    // Scroll trigger animations
    useEffect(() => {
        // Hero animation
        gsap.fromTo(heroRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }
        );

        // Events section animation
        gsap.fromTo(eventsRef.current.children,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: eventsRef.current,
                    start: "top 80%"
                }
            }
        );

        // CTA section animation
        gsap.fromTo(ctaRef.current,
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: "top 80%"
                }
            }
        );

        // Community section animation
        gsap.fromTo(communityRef.current.children,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: communityRef.current,
                    start: "top 80%"
                }
            }
        );

        // Testimonial section animation
        gsap.fromTo(testimonialRef.current.children,
            { x: -100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: testimonialRef.current,
                    start: "top 80%"
                }
            }
        );
    }, []);

    // Calendar functions
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
        const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === currentDate.getDate() &&
                selectedMonth === currentDate.getMonth() &&
                selectedYear === currentDate.getFullYear();

            // Replaced random logic with a check against the hardcoded array
            const hasEvent = eventDaysForCurrentMonth.includes(day) && !isToday;
            // The color can still be random for visual variety, or you could hardcode this too
            const eventColor = eventColors[day % eventColors.length]; // Use modulo for a predictable color pattern

            days.push(
                <div key={day} className="relative p-2 text-center">
                    <span
                        className={`block w-8 h-8 leading-8 rounded-full mx-auto ${isToday
                            ? 'bg-gradient-to-r from-green-300 to-green-400 text-slate-900 font-bold'
                            : 'text-white'
                            }`}
                    >
                        {day}
                    </span>
                    {hasEvent && (
                        <div
                            className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3/5 h-1 rounded-full ${eventColor === 'red' ? 'bg-red-500' :
                                eventColor === 'blue' ? 'bg-blue-500' :
                                    eventColor === 'purple' ? 'bg-purple-500' :
                                        'bg-yellow-500'
                                }`}
                        />
                    )}
                </div>
            );
        }

        return days;
    };

    // Navigation functions
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        if (currentIndex < events.length - 4) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const CollaborationEventCard = ({ event }) => {
        const cardRef = useRef(null);
        const topElementsRef = useRef(null);
        const bottomCardRef = useRef(null);
        const frontCardRef = useRef(null);
        const [isHovered, setIsHovered] = useState(false);
        const hoverTimeoutRef = useRef(null);
        const isAnimatingRef = useRef(false);

        // Color schemes for different cards
        const getCardColors = (color) => {
            switch (color) {
                case 'green':
                    return {
                        bgColor: 'bg-green-700',
                        borderColor: 'border-green-400',
                        glowColor: 'shadow-[0_0_20px_rgba(34,197,94,0.8)]',
                        logoColor: 'text-white'
                    };
                case 'blue':
                    return {
                        bgColor: 'bg-blue-800',
                        borderColor: 'border-blue-400',
                        glowColor: 'shadow-[0_0_20px_rgba(59,130,246,0.8)]',
                        logoColor: 'text-white'
                    };
                case 'red':
                    return {
                        bgColor: 'bg-red-600',
                        borderColor: 'border-red-400',
                        glowColor: 'shadow-[0_0_20px_rgba(239,68,68,0.8)]',
                        logoColor: 'text-yellow-300'
                    };
                default:
                    return {
                        bgColor: 'bg-green-700',
                        borderColor: 'border-green-400',
                        glowColor: 'shadow-[0_0_20px_rgba(34,197,94,0.8)]',
                        logoColor: 'text-white'
                    };
            }
        };

        const colors = getCardColors(event.color);

        useEffect(() => {
            // Set initial positions for animated elements
            if (topElementsRef.current && bottomCardRef.current) {
                gsap.set(topElementsRef.current, { y: '-100%', opacity: 0 });
                gsap.set(bottomCardRef.current, { y: '100%', opacity: 0 });
            }

            // Cleanup timeout on unmount
            return () => {
                if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                }
            };
        }, []);

        const triggerHoverAnimation = () => {
            if (isAnimatingRef.current) return;

            isAnimatingRef.current = true;

            // Animate card lift and glow
            gsap.to(cardRef.current, {
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });

            // Fade out front card
            gsap.to(frontCardRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: "power2.out"
            });

            // Animate top elements from top
            gsap.fromTo(
                topElementsRef.current,
                { y: '-100%', opacity: 0 },
                {
                    y: '0%',
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                    delay: 0.1,
                    onComplete: () => {
                        isAnimatingRef.current = false;
                    }
                }
            );

            // Animate bottom card from bottom
            gsap.fromTo(
                bottomCardRef.current,
                { y: '100%', opacity: 0 },
                { y: '0%', opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.1 }
            );
        };

        const triggerLeaveAnimation = () => {
            if (isAnimatingRef.current) return;

            isAnimatingRef.current = true;

            // Reset card position
            gsap.to(cardRef.current, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });

            // Fade in front card
            gsap.to(frontCardRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });

            // Hide top elements
            gsap.to(topElementsRef.current, {
                y: '-100%',
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    isAnimatingRef.current = false;
                }
            });

            // Hide bottom card
            gsap.to(bottomCardRef.current, {
                y: '100%',
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
            });
        };

        const handleMouseEnter = () => {
            // Clear any existing timeout
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }

            if (!isHovered) {
                setIsHovered(true);
                triggerHoverAnimation();
            }
        };

        const handleMouseLeave = () => {
            // Use a small timeout to prevent flickering when moving between child elements
            hoverTimeoutRef.current = setTimeout(() => {
                setIsHovered(false);
                triggerLeaveAnimation();
            }, 50);
        };

        return (
            <div
                ref={cardRef}
                className={`flex-shrink-0 w-80 h-96 relative rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${colors.bgColor} ${isHovered
                    ? `${colors.borderColor} ${colors.glowColor}`
                    : 'border-white/20'
                    }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Front Card - Collaboration Design */}
                <div
                    ref={frontCardRef}
                    className="absolute inset-0 flex flex-col justify-between p-8 text-center"
                    style={{ pointerEvents: isHovered ? 'none' : 'auto' }}
                >
                    <div>
                        <p className="text-lg font-medium text-white/90 mb-8">In collaboration with</p>
                    </div>

                    {/* Lenient Tree Logo */}
                    <div className="flex-1 flex items-center justify-center">
                        <div className={`text-8xl font-bold ${colors.logoColor}`}>
                            <svg className="w-32 h-32 mx-auto mb-4" viewBox="0 0 100 100" fill="currentColor">
                                {/* Simplified Lenient Tree Logo */}
                                <path d="M20 20 L20 80 L40 80 L40 60 L50 60 C60 60 65 55 65 45 C65 35 60 30 50 30 L40 30 L40 50 L50 50 C52 50 54 48 54 45 C54 42 52 40 50 40 L30 40 L30 20 Z" />
                                {/* Tree leaves */}
                                <circle cx="70" cy="25" r="3" fill="currentColor" />
                                <circle cx="75" cy="30" r="2.5" fill="currentColor" />
                                <circle cx="72" cy="35" r="2" fill="currentColor" />
                                <circle cx="78" cy="28" r="2" fill="currentColor" />
                                <circle cx="76" cy="22" r="2" fill="currentColor" />
                            </svg>
                        </div>
                    </div>

                    <div>
                        <h3 className={`text-2xl font-bold mb-4 ${colors.logoColor}`}>Lenient Tree</h3>
                        <p className="text-lg text-white/80">Community Partner</p>
                    </div>
                </div>

                {/* Top Elements - Slides from top */}
                <div
                    ref={topElementsRef}
                    className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start opacity-0"
                    style={{
                        transform: 'translateY(-100%)',
                        pointerEvents: isHovered ? 'auto' : 'none'
                    }}
                >
                    <span className="bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
                        {event.prizePool}
                    </span>
                    <div className={`w-4 h-4 rounded-full ${event.color === 'blue' ? 'bg-blue-400' :
                        event.color === 'green' ? 'bg-green-400' :
                            event.color === 'red' ? 'bg-red-400' :
                                'bg-green-400'
                        }`}></div>
                </div>

                {/* Bottom Card - Slides from bottom */}
                <div
                    ref={bottomCardRef}
                    className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm p-6 rounded-b-2xl opacity-0"
                    style={{
                        transform: 'translateY(100%)',
                        pointerEvents: isHovered ? 'auto' : 'none'
                    }}
                >
                    {/* Event Title */}
                    <h4 className="text-2xl font-bold text-white mb-6">{event.title}</h4>

                    {/* Event Details */}
                    <div className="space-y-3 mb-6">
                        {event.location && (
                            <div className="flex items-center gap-3 text-white/90">
                                <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span>: {event.location}</span>
                            </div>
                        )}

                        {event.format && (
                            <div className="flex items-center gap-3 text-white/90">
                                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                    <line x1="8" y1="21" x2="16" y2="21"></line>
                                    <line x1="12" y1="17" x2="12" y2="21"></line>
                                </svg>
                                <span>: {event.format}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-3 text-white/90">
                            <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                            </svg>
                            <span>: {event.participants}</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-green-400 text-black py-3 rounded-xl flex justify-center items-center gap-2 font-bold transition-all hover:bg-green-300">
                        <span>Click to know more</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M13 17l5-5-5-5"></path>
                        </svg>
                    </button>
                </div>
            </div>
        );
    };


    return (
        <div className="bg-slate-900 text-white min-h-screen font-sans">
            {/* Header */}
            <header ref={headerRef} className="pt-4 pb-4">
                <div className="max-w-7xl mx-auto px-10">
                    <div className="flex justify-between items-center">
                        <div className="logo">
                            <a href="#">
                                <img src="./assets/logo.png" alt="Logo" className="h-12" />
                            </a>
                        </div>

                        <nav className="bg-slate-700 rounded-full p-2 shadow-lg">
                            <ul className="flex gap-2">
                                {[
                                    { name: 'Home', href: '#', active: true },
                                    { name: 'Calendar', href: '#' },
                                    { name: 'About', href: '#' },
                                    { name: 'Leaderboards', href: '#' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className={`block px-6 py-2 rounded-full transition-all duration-300 ${item.active
                                                ? 'bg-teal-800 text-green-400 font-bold shadow-inner'
                                                : 'text-white hover:bg-white hover:bg-opacity-10'
                                                }`}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="flex items-center gap-6">
                            <div className="relative cursor-pointer">
                                <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                                <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border-2 border-slate-900">
                                    3
                                </span>
                            </div>
                            <div className="profile-picture">
                                <img src="./assets/profile.png" alt="User Profile" className="h-11 w-11 rounded-full object-cover border-2 border-white border-opacity-80 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <div className="max-w-7xl mx-auto px-10">
                    {/* Hero Section */}
                    <section className="pt-8">
                        <div ref={heroRef} className="relative h-96 lg:h-[500px] w-full rounded-3xl overflow-hidden bg-gray-800">
                            {slides.map((slide, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    style={{
                                        backgroundImage: `url(${slide})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />
                            ))}

                            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-50">
                                {slides.map((_, index) => (
                                    <div
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3.5 h-3.5 rounded-full cursor-pointer relative overflow-hidden border-2 border-green-400 ${index === currentSlide ? 'bg-green-400' : ''
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    <section ref={eventsRef} className="py-16">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-4xl font-bold text-white">Upcoming Events</h2>
                        </div>

                        <div className="relative">
                            <div className="overflow-hidden">
                                <div
                                    className="flex gap-8 transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${currentIndex * 25}%)` }}
                                >
                                    {events.map((event) => (
                                        <CollaborationEventCard key={event.id} event={event} />
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={prevSlide}
                                disabled={currentIndex === 0}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 w-12 h-12 rounded-full bg-slate-700/70 backdrop-blur border border-white/20 text-white hover:bg-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed z-10"
                            >
                                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>

                            <button
                                onClick={nextSlide}
                                disabled={currentIndex >= events.length - 4}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 w-12 h-12 rounded-full bg-slate-700/70 backdrop-blur border border-white/20 text-white hover:bg-slate-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed z-10"
                            >
                                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>

                        <a href="#" className="block w-fit mx-auto mt-12 bg-green-400 text-slate-900 px-8 py-3 rounded-full font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-400/40">
                            View Calendar
                        </a>
                    </section>

                    {/* CTA Section */}
                    <section
                        ref={ctaRef}
                        className="relative mt-16 py-20 bg-slate-800 rounded-3xl text-center overflow-hidden border-t-4 border-green-400"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3e%3cdefs%3e%3cpath fill='none' stroke-width='1.5' stroke-opacity='0.2' stroke='%236fff54' id='a' d='M0-115.5c214.4 0 410.8 40.3 567.4 115.5 156.6 75.2 274.9 181.3 336.1 303.3 61.2 122 65.2 258.1 5.4 384.8-59.8 126.7-163.4 240.3-294.5 321.3-131.1 81-285.8 126.4-444.9 126.4-159.1 0-313.8-45.4-444.9-126.4-131.1-81-234.7-194.6-294.5-321.3-59.8-126.7-55.8-262.8 5.4-384.8 61.2-122 179.5-228.1 336.1-303.3C-410.8-75.2-214.4-115.5 0-115.5Z'/%3e%3c/defs%3e%3cg transform='translate(1000 750)'%3e%3cuse href='%23a' transform='scale(0.96)'/%3e%3cuse href='%23a' transform='scale(0.81)'/%3e%3cuse href='%23a' transform='scale(0.66)'/%3e%3cuse href='%23a' transform='scale(0.51)'/%3e%3cuse href='%23a' transform='scale(0.36)'/%3e%3cuse href='%23a' transform='scale(0.21)'/%3e%3c/g%3e%3c/svg%3e")`,
                            backgroundSize: 'cover'
                        }}
                    >
                        <div className="absolute bottom-0 left-12 w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-800 transform -skew-x-12 -mb-8"></div>
                        <div className="absolute bottom-0 right-12 w-32 h-32 bg-red-600 transform skew-x-12 -mb-8"></div>

                        <div className="relative z-10">
                            <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-4">
                                Your Gateway to{' '}
                                <div>

                                    <span className="inline-block h-16 overflow-hidden align-bottom ml-2">
                                        <span
                                            key={currentWordIndex}
                                            className="block h-16 leading-none pt-1"
                                        >
                                            {words[currentWordIndex]}
                                        </span>
                                    </span>
                                </div>
                            </h2>

                            <p className="italic text-xl text-white/70 mb-8">& much more....</p>

                            <a
                                href="#"
                                className="inline-block bg-green-400 text-black font-bold px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-400/50"
                            >
                                Know More
                            </a>
                        </div>
                    </section>

                    {/* Community Section */}
                    <section
                        ref={communityRef}
                        className="py-32 mt-16 relative"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3e%3cdefs%3e%3cpath fill='none' stroke-width='1.5' stroke-opacity='0.1' stroke='%236fff54' id='b' d='M0-115.5c214.4 0 410.8 40.3 567.4 115.5 156.6 75.2 274.9 181.3 336.1 303.3 61.2 122 65.2 258.1 5.4 384.8-59.8 126.7-163.4 240.3-294.5 321.3-131.1 81-285.8 126.4-444.9 126.4-159.1 0-313.8-45.4-444.9-126.4-131.1-81-234.7-194.6-294.5-321.3-59.8-126.7-55.8-262.8 5.4-384.8 61.2-122 179.5-228.1 336.1-303.3C-410.8-75.2-214.4-115.5 0-115.5Z'/%3e%3c/defs%3e%3cg transform='translate(1000 750)'%3e%3cuse href='%23b' transform='scale(0.96)'/%3e%3cuse href='%23b' transform='scale(0.81)'/%3e%3cuse href='%23b' transform='scale(0.66)'/%3e%3cuse href='%23b' transform='scale(0.51)'/%3e%3cuse href='%23b' transform='scale(0.36)'/%3e%3cuse href='%23b' transform='scale(0.21)'/%3e%3c/g%3e%3c/svg%3e")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {/* Floating Elements */}
                        <div className="absolute top-1/4 left-12 w-64 transform -rotate-12 z-20">
                            <img src="https://i.imgur.com/vHqY1aD.png" alt="Ticket" className="w-full" />
                        </div>
                        <div className="absolute bottom-1/4 right-24 w-48 transform rotate-12 z-20">
                            <img src="https://i.imgur.com/G9Lq2dC.png" alt="Envelope" className="w-full" />
                        </div>
                        <div className="absolute bottom-1/4 left-24 w-24 h-24 bg-yellow-500 transform rotate-45"></div>
                        <div className="absolute top-24 right-32 w-24 h-24 bg-red-600 transform rotate-12"></div>
                        <div className="absolute bottom-1/5 right-1/4 w-24 h-24 bg-blue-500 transform -rotate-45"></div>

                        <div className="flex flex-col items-center gap-8">
                            <div className="w-3/5 bg-slate-800/70 backdrop-blur-lg rounded-3xl p-4 border-t-4 border-green-400 relative z-10">
                                <img
                                    src="https://via.placeholder.com/450x150.png?text=About+Us+Graphic"
                                    alt="About Us Graphic"
                                    className="w-full rounded-2xl"
                                />
                            </div>

                            <div className="w-full max-w-3xl bg-slate-800/70 backdrop-blur-lg rounded-3xl p-6 border-2 border-green-400/50 shadow-2xl shadow-green-400/20 relative z-10">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="text-xl font-bold">
                                        {monthNames[selectedMonth]} {selectedYear}
                                    </h4>
                                </div>

                                <div className="grid grid-cols-7 gap-2 text-center mb-2">
                                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                                        <div key={day} className="text-white/60 text-sm py-2">{day}</div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 gap-2">
                                    {renderCalendar()}
                                </div>
                            </div>

                            <div className="flex gap-8 relative z-10">
                                {[
                                    { number: '01+', label: 'Members' },
                                    { number: '01+', label: 'Students' },
                                    { number: '01+', label: 'Sponsors' }
                                ].map((stat, index) => (
                                    <div key={index} className="bg-slate-800/70 backdrop-blur-lg rounded-3xl px-10 py-6 text-center border border-green-400/50 shadow-xl shadow-green-400/10">
                                        <span className="block text-3xl font-bold font-mono">{stat.number}</span>
                                        <span className="block text-white/70 mt-1">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Testimonial Section */}
                    <section ref={testimonialRef} className="py-24 relative overflow-hidden">
                        <div className="relative grid grid-cols-1 lg:grid-cols-3 items-center gap-8 p-8">
                            <div className="lg:col-span-2 bg-white/60 backdrop-blur-2xl rounded-3xl p-10 relative z-10">
                                <svg className="w-12 h-12 text-teal-700 mb-4" viewBox="0 0 448 512" fill="currentColor">
                                    <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V216z" />
                                </svg>
                                <blockquote className="text-2xl leading-relaxed text-gray-800 font-medium mb-8">
                                    Lenient Tree is bringing events from all over the world at your fingertips, all you have to do is join and show your skills. We value student's satisfaction and joy more than anything.
                                </blockquote>
                                <div className="flex justify-end items-center gap-4 text-gray-700">
                                    <span className="font-bold uppercase">Augustine Vadakumcherry</span>
                                    <img className="w-6 h-6" src="https://i.imgur.com/G5Ogs2E.png" alt="Lenient Tree Logo" />
                                    <span>Lenient Tree</span>
                                </div>
                            </div>
                            <div className="bg-teal-700 rounded-3xl p-4 -ml-20 relative z-5">
                                <img src="https://i.imgur.com/Jj0a1He.png" alt="Augustine Vadakumcherry" className="w-full rounded-2xl grayscale" />
                            </div>
                        </div>
                    </section>

                    {/* Testimonials Grid */}
                    <section className="py-24 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-full h-1/2 z-1 bg-gradient-radial from-green-100/10 to-transparent"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-2">
                            {testimonials.map((testimonial, index) => (
                                <article key={index} className="bg-teal-900 rounded-3xl p-10 text-white">
                                    <header className="flex justify-between items-center mb-8">
                                        <img className="w-16 h-16 rounded-2xl object-cover" src={testimonial.image} alt={testimonial.name} />
                                        <div className="text-right">
                                            <span className="font-bold uppercase block mb-2">{testimonial.name}</span>
                                            <div className="flex items-center justify-end gap-2 text-sm opacity-80">
                                                <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center font-bold">
                                                    {testimonial.companyIcon}
                                                </div>
                                                <span>{testimonial.company}</span>
                                            </div>
                                        </div>
                                    </header>
                                    <div className="mt-6">
                                        <svg className="w-10 h-10 text-teal-600 mb-4" viewBox="0 0 448 512" fill="currentColor">
                                            <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V216z" />
                                        </svg>
                                        <blockquote className="text-lg leading-relaxed opacity-90">
                                            {testimonial.quote}
                                        </blockquote>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Logo Marquee */}
                <section className="bg-teal-800 py-8 overflow-hidden whitespace-nowrap">
                    <div ref={marqueeRef} className="flex items-center gap-24">
                        {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                            <img
                                key={index}
                                src={logo}
                                alt={`Logo ${index}`}
                                className="h-10 max-w-48 flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity"
                            />
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-teal-950 py-20 relative overflow-hidden">
                    <div className="absolute bottom-[-10%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-8xl lg:text-9xl text-black/15 z-1 font-mono">
                        LENIENT
                    </div>
                    <div className="max-w-7xl mx-auto px-10 relative z-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div>
                                <h4 className="text-xl font-bold mb-4">Lenient Tree</h4>
                                <p className="mb-4 opacity-70 leading-relaxed">Access to events are now easy</p>
                                <p className="text-sm opacity-70">© 2025 The Lenient Tree<br />All rights reserved</p>
                                <div className="flex gap-3 mt-6">
                                    {[
                                        { icon: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9 26.3 26.2 58 34.4 93.9 36.2 37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z", label: "Instagram" },
                                        { icon: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z", label: "Facebook" },
                                        { icon: "M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z", label: "Twitter" },
                                        { icon: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z", label: "LinkedIn" }
                                    ].map((social, index) => (
                                        <a key={index} href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-green-400 hover:text-slate-900 transition-colors">
                                            <svg className="w-5 h-5" viewBox="0 0 512 512" fill="currentColor">
                                                <path d={social.icon} />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {[
                                {
                                    title: 'Quick Links',
                                    links: ['Home', 'Calendar', 'About', 'Subscriptions']
                                },
                                {
                                    title: 'Essentials',
                                    links: ['Terms & Conditions', 'Privacy Policy', 'Blogs']
                                },
                                {
                                    title: 'Partners',
                                    links: ['Paid Promotion', 'Collaboration', 'Organize an event']
                                }
                            ].map((column, index) => (
                                <div key={index}>
                                    <h4 className="text-green-300 font-bold text-lg mb-6">{column.title}</h4>
                                    <ul className="space-y-4">
                                        {column.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <a href="#" className="text-white/80 hover:text-green-300 transition-colors">
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default HomeTest;