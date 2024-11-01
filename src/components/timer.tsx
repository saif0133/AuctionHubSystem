import React, { useEffect, useState } from "react";

interface TimerProps {
  endDate: Date;
  sentMessage: string;
}

const Timer: React.FC<TimerProps> = ({ endDate ,sentMessage}) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  const message = sentMessage;

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        // Format time with leading zeros using Intl.NumberFormat
        const formattedDays = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format(days);
        const formattedHours = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format(hours);
        const formattedMinutes = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format(minutes);
        const formattedSeconds = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }).format(seconds);

        setTimeLeft(`${formattedDays}d : ${formattedHours}h : ${formattedMinutes}m : ${formattedSeconds}s`);
      } else {
        setTimeLeft(message);
      }
    };

    calculateTimeLeft(); // Calculate on mount
    const timerId = setInterval(calculateTimeLeft, 1000); // Update every second

    return () => clearInterval(timerId); // Cleanup interval on unmount
  }, [endDate]);

  return <div>{timeLeft}</div>;
};

export default Timer;
