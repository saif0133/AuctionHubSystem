import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  img: string;
  title: string;
  description: string;
  currentPrice: number;
  endDate: Date;
  id: number;
  message: String;
}

function ProductCard({
  img,
  title,
  description,
  currentPrice,
  endDate,
  id,
  message,
}: CardProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const navigate = useNavigate();
  const handleClick = (id: number) => {
    navigate(`/Product/${id}`);
    console.log("card id is " + id);
  };

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
        setTimeLeft(String(message));
      }
    };

    const timerId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, [endDate]);

  return (
    <div className="products">
      <div className="card" onClick={() => handleClick(id)}>
        <img src={img} />
        <div className="product-title">{title}</div>
        <div className="product-description">{description}</div>
        <div className="product-current-price">{currentPrice} JDs</div>
        <div
          className={`product-count-down ${
            message === "time out" ? "" : "win"
          }`}
        >
          {timeLeft}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
