import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import CountdownTimer from './CountdownTimer';

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-[#0d2f2f]/50 border-2 border-[#1a4d4d] rounded-2xl overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-[#1a4d4d]/30 transition-colors"
            >
                <span className="text-white font-medium text-lg">{question}</span>
                <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full bg-[#00ff88] flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const EventDetails = () => {
    const navigate = useNavigate();

    // Full form state matching the organize form
    const [eventData, setEventData] = useState({
        eventName: 'ABC Hackathon 2025',
        eventSubtitle: 'Cybersecurity Workshop',
        eventType: 'Hackathon',
        eventTheme: '',
        modeOfConduct: 'Online',
        eventLocation: 'Chennai, Tamil Nadu',
        eventAccess: 'Free',
        eventDateRange: '29 Jul - 30 Jul, 2026',
        eventTime: '7 PM to 8 PM',
        // Organizer details
        organizerName: 'Leninet Tree Team',
        collegeName: 'LT University',
        organizerEmail: 'contact@leninettree.com',
        organizerPhone: '+91 9876543210',
        // Event description
        eventDescription: 'Introduction to Cybersecurity and Pen-Testing. Learn the fundamentals of ethical hacking and understand real world attack methods. Q&A session with cybersecurity analysts included.',
        prizeType: 'Cash Prize',
        prizeDetails: '$ 2000',
        eventPoster: '/cal.png',
        // Event design (Step 2)
        eventBanner: 'event-banner.jpg',
        selectedTemplate: 'Default',
        // Event configuration
        acceptanceMode: 'Auto approval',
        participantLimit: '500',
        registerAction: 'Register',
        externalWebsiteLink: '',
        requiredFields: {
            name: true,
            phone: true,
            email: true,
            college: false
        },
        includeMealInfo: false,
        includeTshirtInfo: false,
        termsAccepted: true
    });

    const handleRegisterAction = () => {
        if (eventData.registerAction === 'Go to external site' && eventData.externalWebsiteLink) {
            window.open(eventData.externalWebsiteLink, '_blank');
        } else {
            alert('Registration logic goes here!');
        }
    };

    return (
        <div className={`min-h-screen bg-[${eventData.selectedTemplate === 'Default' ? '#0a1f1f' : '#022F2E'}]`}>
            <Header />

            <div className="container pt-24 mx-auto px-4 py-8">
                {/* Top Navigation */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 bg-[#0d2f2f] hover:bg-[#1a4d4d] text-white px-4 py-2 rounded-lg transition-colors duration-300 border-2 border-[#00ff88]"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Go Back</span>
                    </button>

                    <div className="flex gap-3">
                        {/* Eye icon */}
                        <button className="p-3 bg-[#0d2f2f] border-2 border-[#00ff88] rounded-lg hover:bg-[#1a4d4d] transition-colors">
                            <svg className="w-5 h-5 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                        {/* External link icon */}
                        <button className="p-3 bg-[#0d2f2f] border-2 border-[#00ff88] rounded-lg hover:bg-[#1a4d4d] transition-colors">
                            <svg className="w-5 h-5 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Event Banner Header */}
                <div className="rounded-3xl p-8 lg:p-12 mb-8 relative overflow-hidden min-h-[300px] lg:min-h-[500px]">
                    {/* Banner Background Image */}
                    {eventData.eventBanner && (
                        <div className="absolute inset-0 object-cover">
                            <img src={eventData.eventBanner} alt="Event Banner" className='w-full h-full' />
                        </div>
                    )}
                    {!eventData.eventBanner && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700"></div>
                    )}

                    {/* Decorative arrows */}
                    <div className="absolute left-8 lg:left-12 top-1/2 transform -translate-y-1/2 z-10">
                        <div className="text-white text-6xl lg:text-7xl font-bold opacity-80">››››</div>
                    </div>

                    {/* Date, Time, Mode - Using eventDateRange for primary display */}
                    <div className="relative z-10 text-center text-white ml-0 lg:ml-32">
                        <h1 className="text-3xl lg:text-5xl font-bold mb-4">{eventData.eventDateRange || "Event Date"}</h1>
                        <p className="text-xl lg:text-2xl mb-2">Time: {eventData.eventTime}</p>
                        <p className="text-xl lg:text-2xl">Mode: {eventData.modeOfConduct.toUpperCase()}</p>
                    </div>
                </div>

                {/* Event Details Section */}
                <div className="grid lg:grid-cols-3 gap-8 mb-8 relative z-20 mt-[-60px] lg:mt-[-150px]">
                    {/* Left: Event Poster */}
                    <div className="lg:col-span-1 ">
                        <div className="bg-blue-900 rounded-2xl overflow-hidden border-4 border-blue-700 shadow-2xl">
                            {eventData.eventPoster ? (
                                <img
                                    src={eventData.eventPoster}
                                    alt="Event Poster"
                                    className="w-full h-auto"
                                />
                            ) : (
                                <div className="aspect-[3/4] flex items-center justify-center text-white">
                                    <span className="text-gray-400">Poster not available</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Event Information */}
                    <div className="lg:col-span-2 space-y-6 pt-10 lg:pt-48 px-1 lg:px-40">
                        {/* Event Name and Subtitle */}
                        <div>
                            <h2 className="text-white text-4xl font-bold mb-2">{eventData.eventName || "Event Name"}</h2>
                            <p className="text-gray-400 text-lg">{eventData.eventSubtitle}</p>
                        </div>

                        {/* Date and Mode Info */}
                        <div className="flex flex-wrap gap-4 text-gray-400">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{eventData.eventDateRange}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                                <span>{eventData.modeOfConduct}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={handleRegisterAction}
                                className="w-full bg-[#00ff88] hover:bg-[#00cc70] text-black font-bold text-lg py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#00ff88]/30"
                            >
                                {eventData.registerAction === 'Go to external site' ? 'Go to Website' : 'Register'}
                            </button>
                            <button className="w-full bg-[#0d2f2f] border-2 border-[#1a4d4d] hover:border-[#00ff88] text-white font-medium text-lg py-4 px-6 rounded-xl transition-all duration-300">
                                Bookmark
                            </button>
                        </div>

                        {/* Participant Count - Using participantLimit if available or showing limited info */}
                        <div className="flex items-center justify-center gap-2 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-sm">
                                {eventData.participantLimit ? `${eventData.participantLimit} slots available` : 'Registrations open'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Announcements Section */}
                <div className="mb-12">
                    <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                        Announcements
                    </h3>
                    <div className="bg-[#0d2f2f]/30 border-2 border-[#1a4d4d] rounded-3xl p-6 lg:p-8 space-y-6">
                        {/* Countdown Box */}
                        <CountdownTimer eventDateRange={eventData.eventDateRange} />

                        {/* Announcement Box */}
                        <div className="bg-gradient-to-r from-[#0a1f1f] to-[#0d2f2f] border-2 border-[#1a4d4d] rounded-2xl p-6 relative overflow-hidden group">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="bg-[#1a4d4d] px-3 py-1 rounded-full flex items-center gap-2">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-gray-400 text-xs">Recently Added</span>
                                    </div>
                                </div>
                                <h4 className="text-white text-xl font-bold mb-2">Check out the event details below</h4>
                                <p className="text-gray-400 text-sm">Make sure to register before the slots fill up!</p>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#00ff88]/5 to-transparent"></div>
                        </div>
                    </div>
                </div>

                {/* Details Section (Prizes) */}
                {eventData.prizeType !== 'No prize' && (
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-8">
                            <h3 className="text-white text-xl font-semibold shrink-0">Details</h3>
                            <div className="h-[2px] bg-[#1a4d4d] w-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1].map((item) => (
                                <div key={item} className="bg-[#0d2f2f]/30 border-2 border-[#00ff88] rounded-2xl p-8 text-center group hover:bg-[#00ff88]/5 transition-all duration-300 transform hover:-translate-y-1">
                                    <p className="text-gray-400 text-sm mb-2">{eventData.prizeType}</p>
                                    <p className="text-white text-4xl font-bold">{eventData.prizeDetails || "TBA"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* About Event Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-8">
                        <h3 className="text-white text-xl font-semibold shrink-0">About Event</h3>
                        <div className="h-[2px] bg-[#1a4d4d] w-full"></div>
                    </div>
                    <div className="text-gray-300 leading-relaxed text-sm space-y-6">
                        <div className="bg-[#0d2f2f]/20 border-l-4 border-[#00ff88] p-6 rounded-r-2xl">
                            <p className="whitespace-pre-wrap">
                                {eventData.eventDescription || "No description provided."}
                            </p>
                        </div>

                        {/* Organizer Info in About Section */}
                        <div className="mt-8 pt-8 border-t border-[#1a4d4d]">
                            <h4 className="text-white font-bold mb-4">Organizer Details</h4>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
                                <div>
                                    <p className="text-gray-500">Organized by</p>
                                    <p className="text-white font-medium">{eventData.organizerName}</p>
                                    {eventData.collegeName && <p>{eventData.collegeName}</p>}
                                </div>
                                <div className="space-y-1">
                                    <p><span className="text-gray-500">Email:</span> {eventData.organizerEmail}</p>
                                    <p><span className="text-gray-500">Phone:</span> {eventData.organizerPhone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Location Section */}
                <div className="mb-12">
                    <h3 className="text-white text-2xl font-bold mb-6">Location</h3>
                    <div className="bg-[#0d2f2f]/30 border-2 border-[#1a4d4d] rounded-3xl p-6 lg:p-8 overflow-hidden">
                        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
                            {/* Google Maps Embed - Replace with actual location */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.325535837716!2d106.66427831533443!3d10.786935192314768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed23c80767d%3A0x5a981a5efee9c584!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="rounded-2xl"
                            ></iframe>
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-4 left-4 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors z-10"
                            >
                                View larger map
                            </a>
                        </div>
                    </div>
                </div>

                {/* FAQs Section */}
                <div className="mb-12">
                    <h3 className="text-white text-2xl font-bold mb-6">FAQs</h3>
                    <div className="space-y-4">
                        {[
                            { question: "How to join?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
                            { question: "Can I add a team member?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
                            { question: "Can I register after the registration stops?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." },
                            { question: "Is it free?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt." },
                            { question: "How to bookmark an event?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." }
                        ].map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </div >

            <Footer />
        </div >
    );
};

export default EventDetails;
