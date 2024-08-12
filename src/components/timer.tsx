import React, { useEffect, useState } from "react";

interface TimerProps {
  endDate: Date;
}

const Timer: React.FC<TimerProps> = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const message = "Auction Ended";

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h : ${minutes}m : ${seconds}s`);
      } else {
        setTimeLeft(message);
      }
    };

    const timerId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, [endDate, message]);

  return <div>{timeLeft}</div>;
};

export default Timer;
