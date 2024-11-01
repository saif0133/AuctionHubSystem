import React from "react";
import { useNavigate } from "react-router-dom";
import Timer from "./timer";

interface CardProps {
  img: string;
  title: string;
  description: string;
  currentPrice: number;
  endDate: Date;
  id: number;
  message: string;
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
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/Product/${id}`);
    console.log("card id is " + id);
  };

  return (
    <div className="products">
      <div className="card" onClick={() => handleClick(id)}>
        <img src={img} alt={title} />
        <div className="product-title">{title}</div>
        <div className="product-description">{description}</div>
        <div className="product-current-price">{currentPrice} JDs</div>
        <div
          className={`product-count-down ${
            message? "win" : ""
          }`}
        >
          <Timer endDate={endDate} sentMessage={message || "Time Out"} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
