import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import PopupMMessage from "./components/PopupMessage";

const minBid = 100;

interface ProductData {
  name: string;
  images: string[]; // Assuming images are URLs
  owner: {
    name: string;
    pic: string;
  };
}

function Product() {
  let [Amount, setAmount] = useState(0);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const userPayment = true;

  // Fetch product data when component mounts or id changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://mocki.io/v1/181c6318-2259-463a-a14d-24facb1df32c`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ProductData = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const openPopup = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const elements = document.getElementsByClassName("input__field");
    var bidValue = 0;

    if (elements.length > 0) {
      const inputElement = elements[0] as HTMLInputElement;
      bidValue = Number(inputElement.value);
      setAmount(bidValue);
    }

    if (bidValue < minBid) {
      alert(`${bidValue} is not acceptable, min available bid is ${minBid}`);
    } else {
      setIsPopupOpen(true);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const order = () => {
    return userPayment ? "bidFees" : "noPayment";
  };

  return (
    <div className="testmain">
      <div className="prod">
        {product ? (
          <>
            <div className="owner">
              <div
                className="owner-pic"
                style={{ backgroundImage: `url(${product.owner.pic})` }}
              ></div>
              <div className="owner-name">
                <h2>{product.owner.name}</h2>
              </div>
            </div>
            <div className="product-info">
              <div className="left">
                <div
                  className="first-pic"
                  style={{ backgroundImage: `url(${product.images[0]})` }}
                ></div>
                <div className="additional-pics">
                  {product.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className={`pic-${index + 1} pro-pic`}
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  ))}
                </div>
                <div className="form">
                  <div className="saif ssa">
                    <label className="input">
                      <input
                        className="input__field"
                        type="text"
                        placeholder=" "
                      />
                      <span className="input__label">Bid Amount</span>
                    </label>
                  </div>
                  <div className="note">Min available bid is : {minBid} $</div>
                  <button
                    type="submit"
                    className="btn-secondary btn bid"
                    onClick={openPopup}
                  >
                    Bid
                  </button>
                  {isPopupOpen && (
                    <PopupMMessage
                      closePopup={closePopup}
                      order={order()}
                      amount={Amount}
                    />
                  )}
                </div>
              </div>
              <div className="right"></div>
            </div>
          </>
        ) : (
          <div className="testmain">
            <h1>Loading Product Data...</h1>{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
