import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ eventDateRange }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Parse the eventDateRange to get the end date
        const parseEventDate = (dateRange) => {
            try {
                // Extract the end date from "29 Jul - 30 Jul, 2025" format
                const parts = dateRange.split('-').map(s => s.trim());
                if (parts.length >= 2) {
                    const endPart = parts[parts.length - 1].trim(); // "30 Jul, 2025"

                    // Convert "30 Jul, 2025" to "Jul 30, 2025" for better parsing
                    const dateParts = endPart.split(',').map(s => s.trim());
                    if (dateParts.length === 2) {
                        const [dayMonth, year] = dateParts;
                        const [day, month] = dayMonth.split(' ');
                        const formattedDate = `${month} ${day}, ${year} 23:59:59`;
                        return new Date(formattedDate).getTime();
                    }
                }
            } catch (error) {
                console.error('Error parsing date:', error);
            }
            return null;
        };

        const targetDate = parseEventDate(eventDateRange);

        if (!targetDate) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        // Calculate immediately
        calculateTimeLeft();

        // Update every second for real-time countdown
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [eventDateRange]);

    return (
        <div className="bg-[#0a1f1f] border-2 border-[#00ff88]/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <p className="text-gray-400 text-sm mb-2">Event closes in:</p>
            <p className="text-[#00ff88] text-3xl font-bold tracking-wider">
                {timeLeft.days}d-{timeLeft.hours}h-{timeLeft.minutes}m-{timeLeft.seconds}s
            </p>
        </div>
    );
};

export default CountdownTimer;
