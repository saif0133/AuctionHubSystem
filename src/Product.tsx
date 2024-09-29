import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import PopupMMessage from "./components/PopupMessage";
import TriangleLoader from "./components/loading";
import DropdownComponent from "./components/dropDown";
import Timer from "./components/timer";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { DecodedToken, extractDataFromToken } from "./components/tokenDecode";
import { message } from "antd";

const minBid = 100;

interface ProductData {
  id(id: any): void;
  item: {
    name: string;
    images: { imageUrl: string }[];
    description: string;
    categoryAttributes: {
      [key: string]: string; // Dynamic category attributes
    };
  };
  seller: {
    firstName: string;
    lastName: string;
    pic: string;
    email: string; // Added email property
  };
  currentPrice: number;
  minBid: number;
  address: string;
  beginDate: string;
  expireDate: string;
}

const usersa = [
  { name: "Saif", bid: 500, pic: "https://via.placeholder.com/40?text=S" },
  { name: "Ahmed", bid: 300, pic: "https://via.placeholder.com/40?text=A" },
  { name: "Layla", bid: 150, pic: "https://via.placeholder.com/40?text=L" },
  { name: "Hadi", bid: 700, pic: "https://via.placeholder.com/40?text=H" },
];

function Product() {
  const [amount, setAmount] = useState(0);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [isJoined, setIsJoined] = useState(true);
  const [formattedExpireDate, setFormattedExpireDate] = useState<string | null>(null);
  const userPayment = true;
  const [userData, setUserData] = useState<DecodedToken | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const token = localStorage.getItem("authToken") || "";

  const formatToISO = (dateStr: string): string => {
    const [day, month, yearTime] = dateStr.split('-'); // Split DD-MM-YYYY HH:mm
    const [year, time] = yearTime.split(' ');
    const [hour, minute] = time.split(':');

    const formattedDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute)
    );
    return formattedDate.toISOString();
  };

  const rmv = async () => {
    try {
      const response = await fetch(`http://localhost:8080/auctions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });


      console.log('Auction deleted successfully');
      // Redirect to "My Auction" page
      window.location.href = "/My-Auction";
    } catch (error) {
      console.error("Failed to delete auction:", error);
    }
  };


  useEffect(() => {
    const data = extractDataFromToken(token);
    setUserData(data);
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auctions/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data: ProductData = await response.json();
        setProduct(data);
  
        // Set the default image to the first image in the array
        if (data.item.images.length > 0) {
          setSelectedImage(data.item.images[0].imageUrl);
        }
  
        const currentDate = new Date();
        const auctionEndDate = new Date(formatToISO(data.expireDate));
        setFormattedExpireDate(formatToISO(data.expireDate));
        setIsAuctionEnded(currentDate > auctionEndDate);
  
        if (userData?.sub === data.seller.email) {
          setIsOwner(true);
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };
  
    if (id) {
      fetchProduct();
      const intervalId = setInterval(fetchProduct, 5000);
      return () => clearInterval(intervalId);
    }
  }, [id, token]);
  
  const openPopup = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const elements = document.getElementsByClassName("input__field");
    let bidValue = 0;

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

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };
  

  return (
    <div className="testmain">
      <div className="prod">
        {product ? (
          <>
            <div className="owner">
              <div className="owner-cont">
                <div
                  className="owner-pic"
                  style={{
                    backgroundImage: `url(${product.seller.pic || `https://via.placeholder.com/40?text=${product.seller.firstName.charAt(0)}`})`,
                  }}
                ></div>
                <div className="owner-name">
                  <h2>{`${product.seller.firstName} ${product.seller.lastName}`}</h2>
                </div>
              </div>
              {isOwner && (<div className="icons">
                <div className="ted">
                  <div className="description">Remove your auction</div>
                  <i className="bi bi-trash3" onClick={rmv}></i> {/* Ensure product.id contains the correct auction ID */}
                </div>
              </div>)}
            </div>

            <div className="product-info">
  <div className="left">
    {/* Main Image Container */}
    <div
      className="first-pic"
      style={{
        backgroundImage: `url(${selectedImage || product.item.images[0].imageUrl})`,
      }}
    ></div>

    {/* Additional Images - Clicking on them updates the main image */}
    <div className="additional-pics">
      {product.item.images.map((image, index) => (
        <div
          key={index}
          className={`pic-${index + 1} pro-pic`}
          style={{ backgroundImage: `url(${image.imageUrl})` }}
          onClick={() => handleImageClick(image.imageUrl)}
        ></div>
      ))}
    </div>




                <div className="form">
                  {!isAuctionEnded && isJoined && (
                    <>
                    <div>
                      <div className="saif ssa">
                        <label className="input">
                          <input
                            className="input__field"
                            type="text"
                            placeholder=" "
                            disabled={isAuctionEnded}
                          />
                          <span className="input__label">Bid Amount</span>
                        </label>
                      </div>
                      <div className="note">Min available bid is : {product.minBid} $</div>
                    </div>
                 

                  
                    <button
                      type="submit"
                      className="btn-secondary btn bid"
                      onClick={openPopup}
                    >
                      Bid
                    </button>
                    </>
                  )}


{!isJoined && (
  <div>
  <button
    type="submit"
    className="btn-secondary btn bid"
    onClick={openPopup}
  >
    Join Auction
  </button></div>
)}
{isAuctionEnded && (<div className="Auction-message">
  
<img src="https://github.com/saif0133/deploy-sec/blob/main/imgs/time%20out.png?raw=true" alt="" className="mess-img" />

<div className="mess">Time Out</div>


</div> )}
                  
                  {isPopupOpen && (
                    <PopupMMessage
                      closePopup={closePopup}
                      order={order()}
                      amount={amount.toString()}
                      description=""
                    />
                  )}
                </div>
                
              </div>

              <div className="right">
                <div className="product-name">
                  <div className="name">
                    <h1>{product.item.name}</h1>
                  </div>
                  <div className="name-spacer"></div>
                </div>

                <div className="prc-container">
                  <div className="auction-price">
                    <div className="prc">
                      <h2>{`${product.currentPrice} JDs`}</h2>
                    </div>
                    <div className="min-bid">Min Bid : {product.minBid} JDs</div>
                  </div>
                  <div className="location">
                    <h4>{product.address}</h4>
                  </div>
                </div>

                <div className="desc">
                  <div className="spc"></div>
                  <div className="info">{product.item.description}</div>
                </div>

                {/* New Table for Category Attributes */}
                <div className="tester">
                  <table className="table table-striped table-hover">
                    <tbody>
                      {Object.entries(product?.item.categoryAttributes || {}).map(
                        ([key, value], index) => (
                          <tr key={index}>
                            <th scope="row">{key.trim()}</th> {/* Trim to remove unwanted whitespace */}
                            <td>{value}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="dates-container">
                  <div className="dates">
                    <div className="start-date">
                      <div className="date-title">Start Date</div>
                      <div className="date">{product.beginDate}</div>
                    </div>
                    <div className="end-date">
                      <div className="date-title">End date</div>
                      <div className="date">{product.expireDate}</div>
                    </div>
                  </div>
                  <div className="timer">
                    {formattedExpireDate && (
                      <Timer endDate={new Date(formattedExpireDate)} />
                    )}
                  </div>
                </div>

                <div className="drop">
                  <DropdownComponent users={usersa} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="testmain">
            <div className="cut">
              <TriangleLoader />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
