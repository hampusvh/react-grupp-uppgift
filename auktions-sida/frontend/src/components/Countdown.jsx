import { useState, useEffect } from "react";
import './Countdown.css';

const CountdownTimer = ({ endDate }) => {
    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const end = new Date(endDate).getTime();
        const difference = end - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    return (
        <div className="count-down">
            {timeLeft.days > 0 ?
            <p>{`${timeLeft.days}d ${timeLeft.hours}h`}</p>
            : timeLeft.hours > 0 ?
            <p>{`${timeLeft.hours}h ${timeLeft.minutes}m`}</p>
            : <p>{`${timeLeft.minutes}m ${timeLeft.seconds}s`}</p>}
        </div>
    );
};

export default CountdownTimer;