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
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap JavaScript
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BalloonContainer from "./components/BalloonContainer";
import { Width } from "devextreme-react/cjs/chart";


interface ProductData {
  id: number;
  status: string;
  beginDate: string;
  expireDate: string;
  item: {
    name: string;
    description: string;
    auctionImages: {
      id: number;
      name: string;
      type: string;
      imageUrl: string;
    }[];
    itemStatus: string;
    category: {
      id: number;
      name: string;
      description: string;
      attributes: string[];
    };
    categoryAttributes: {
      [key: string]: string; // Dynamic category attributes
    };
  };
  address: string;
  seller: {
    id: number;
    firstName: string;
    lastName: string;
    email: string; // Email is already included
    phone: string;
  };
  minBid: number;
  initialPrice: number;
  currentPrice: number;
  bids: any[]; // Assuming bids is an array, you can add the structure if needed
  joined: boolean;
  winner: {
    id: number
  }
}

interface userdata {
  firstName: string;
  image: string;
  lastName: string;
  sub: string;
}

interface User {
  name: string;
  userID: number;
  bid: number;
  pic: string;
  id: number;
}


function Product() {


  const [amount, setAmount] = useState(0);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [isPopupOpen4, setIsPopupOpen4] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const[removeFees,setRemoveFees]=useState("");
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [formattedExpireDate, setFormattedExpireDate] = useState<string | null>(null);
  const userPayment = true;
  const [userData, setUserData] = useState<userdata | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  //const [usersa, setUsersa] = useState<{ name: string |""; bid: number; pic: string, id: number }[]>([]);
  const token = localStorage.getItem("authToken") || "";

  const [usersa, setUsersa] = React.useState<User[]>([]);

const logBids = (product: ProductData) => {
//  console.log(`Bids for ${product.item.name}:`);

  product.bids.forEach(bid => {
    const newUser = {
      name: `${bid.bidder.firstName} ${bid.bidder.lastName}`,
      userID: bid.bidder.id,
      bid: bid.amount,
      pic: `https://via.placeholder.com/40?text=${bid.bidder.firstName[0]}`, // Generates pic URL with the first letter
      id: bid.id || 0,
    };

   // console.log("New User: " + JSON.stringify(newUser)); // Clear log for newUser

    // Check if a user with the same id already exists in usersa
    const exists = usersa.some(user => user.id === newUser.id);

    // If the user does not exist, push the new user
    if (!exists) {
      usersa.push(newUser);
    }

   // console.log("Updated usersa array:", JSON.stringify(usersa)); // Clear log for usersa
  });
};



  const formatDateToISO = (dateString: string): string => {
    const [day, month, year, time] = dateString.split(/[-\s:]/);
    return new Date(`${year}-${month}-${day}T${time}:00Z`).toISOString();
  };

  const calculateReservedAmount = (price: number): string => {
    let amount: number;

    if (price >= 1 && price <= 100) {
      amount = price * 0.10; // 10%
    } else if (price >= 101 && price <= 1000) {
      amount = price * 0.07; // 7%
    } else if (price >= 1001 && price <= 5000) {
      amount = price * 0.05; // 5%
    } else if (price >= 5001 && price <= 10000) {
      amount = price * 0.03; // 3%
    } else if (price > 10000) {
      amount = price * 0.02; // 2%
    } else {
      amount = 0; // Default case, if needed
    }

    // Return the amount formatted to 2 decimal places
    return amount.toFixed(2);
  };

  const rmv = async () => {
    try {
      const response = await fetch(`http://localhost:8080/auctions/isDeleteFree/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const info = await response.json();

      if (info == true) {
        message.info("free")
        setRemoveFees("FREE");
        //deletAuction();
      }
      else {
        setRemoveFees("NOTFREE");
        message.info("Not free")
       // deletAuction();
      }

      setIsPopupOpen4(true);
    } catch (error) {
      console.error("Failed to delete auction:", error);
    }
  };



   const deletAuction = async () => {
     try {
       const response = await fetch(`http://localhost:8080/auctions/${id}`, {
         method: 'DELETE',
         headers: {
           'Authorization': `Bearer ${token}`,
         },
       })
       if(!response.ok)
       {
        message.info(`error : ${response.json()}`);
        throw new Error(`HTTP error! Status: ${response}`);
       }
       message.info('Auction deleted successfully');
       // Redirect to "My Auction" page
       window.location.href = "/My-Auction";
     } catch (error) {
      message.info("Failed to delete auction:");
     }
   };

  const receive = async () => {
    const url = `http://localhost:8080/auctions/${id}/receive`; 
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          //'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Await the json data
        await message.info(`${errorData.message || 'An error occurred'}`); // Display the error message
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json(); // Await the result data
      console.log('Response:', result);
      await message.info(`Congrats!`); // Display success message
    } catch (error) {
      console.error('Error:', error);
      //await message.info('An unexpected error occurred.'); // Display generic error message
     
    }
  };
  
  
  

  useEffect(() => {


    const fetchProduct = async () => {
      try {
        const link = token ? `http://localhost:8080/auctions/user/${id}` : `http://localhost:8080/auctions/guest/${id}`;
        const response = await fetch(`${link}`, {
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
        if(token){
        const Userdata = extractDataFromToken(token);
        if (Userdata?.sub == data.seller.email) {
          setIsOwner(true);
          setIsJoined(true);

        }
        if (data?.winner?.id == Userdata?.id)
          setIsWinner(true);
        if (data.joined) {
          setIsJoined(true);

        }
      }
        logBids(data);
console.log(data);
        // setIsOwner(true);
        // setIsJoined(true);
        // console.log(userData?.sub + "///" + data.seller.email);


        // Set the default image to the first image in the array
        if (data.item.auctionImages.length > 0) {
          setSelectedImage(data.item.auctionImages[0].imageUrl);
        }

        const currentDate = new Date();
        const auctionEndDate = new Date(formatDateToISO(data.expireDate));
        setFormattedExpireDate(formatDateToISO(data.expireDate));
        setIsAuctionEnded(currentDate > auctionEndDate);
     //   console.log(data.bids);

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

    if (product)
      if (bidValue < product.minBid || 0) {
        alert(`${bidValue} is not acceptable, min available bid is ${product.minBid + product.currentPrice}`);
      } else {
        setIsPopupOpen(true);
      }
  };
  const openPopup2 = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    setIsPopupOpen2(true);

  };

  const closePopup = () => {
    setIsPopupOpen(false);
    const elements = document.getElementsByClassName("input__field") as HTMLCollectionOf<HTMLInputElement>;
    Array.from(elements).forEach((element) => {
      element.value = ""; // Clear the input field
    });

  };
  const closePopup2 = () => {
    setIsPopupOpen2(false);
  };
  const closePopup4 = () => {
    setIsPopupOpen4(false);
  };

  const order = () => {
    return userPayment ? "bidFees" : "noPayment";
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const [bgPosition, setBgPosition] = useState("center");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const nativeEvent = e.nativeEvent as MouseEvent;
    const target = e.target as HTMLDivElement; // Type assertion to HTMLDivElement
    const { offsetX, offsetY } = nativeEvent;

    const x = (offsetX / target.clientWidth) * 100;
    const y = (offsetY / target.clientHeight) * 100;

    setBgPosition(`${x}% ${y}%`);
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
                    backgroundImage: `url(${`https://via.placeholder.com/40?text=${product.seller.firstName.charAt(0)}`})`,
                  }}
                ></div>
                <div className="owner-name">
                  <h2>{`${product.seller.firstName} ${product.seller.lastName}`}</h2>
                </div>
              </div>
              {isOwner && product.status!="CANCELLED" && (<div className="icons">
                <div className="ted">
                  <div className="description">Remove your auction</div>
                  <i className="bi bi-trash3" onClick={rmv}></i>
                </div>
              </div>)}
              {isPopupOpen4 && (
                    <PopupMMessage
                      closePopup={closePopup4}
                      order={"RemoveFees"}
                      amount={amount.toString()}
                      description={removeFees}
                      customFunction={deletAuction}
                    />
                  )}
              {isJoined && !isOwner &&product.status=="ACTIVE" && (
                <div className="joined">You Joined this Auction</div>
              )}
              {product.status=="CANCELLED"&& isOwner &&  ( <div className="joined deleted">You Deleted this Auction</div>)}

              {isWinner && (
                <div className="joined">You Won this Auction</div>
              )}
            </div>

            <div className="product-info">
              <div className="left">

              <div
      className="first-pic"
      style={{
        backgroundImage: `url(${selectedImage || product.item.auctionImages[0].imageUrl})`,
        backgroundPosition: bgPosition,
      }}
      onMouseMove={handleMouseMove}
    ></div>

                {/* Additional Images - Clicking on them updates the main image */}
                <div className="additional-pics">
                  {product.item.auctionImages.map((image, index) => (
                    <div
                      key={index}
                      className={`pic-${index + 1} pro-pic`}
                      style={{ backgroundImage: `url(${image.imageUrl})` }}
                      onClick={() => handleImageClick(image.imageUrl)}
                    ></div>
                  ))}
                </div>




                <div className="form">
                  {!isOwner && isJoined && !isAuctionEnded && (
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
                        <div className="note">Min available bid is : {product.minBid + product.currentPrice} $</div>
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


                  {!isJoined && !isOwner && (
                    <div>
                      <button
                        type="submit"
                        className="btn-secondary btn bid"
                        onClick={openPopup2}
                      >
                        Join Auction
                      </button></div>
                  )}
                  {isPopupOpen2 && (
                    <PopupMMessage
                      closePopup={closePopup2}
                      order={"JoinAuction"}
                      amount={calculateReservedAmount(product.initialPrice)}
                      description={product.id.toString()}
                    />
                  )}
                  {isAuctionEnded && !isWinner && (<div className="Auction-message">

                    <img src="https://github.com/saif0133/deploy-sec/blob/main/imgs/time%20out.png?raw=true" alt="" className="mess-img" />

                    <div className="mess">Time Out</div>


                  </div>)}

                  {isWinner && product.status!="complete" && (
                    <div>
                      <BalloonContainer />
                      <div>


                      </div>

                      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Contact With the seller</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              Now you must contact the seller to agree on a date and method of delivery that suits both of you using one of these methods.
                              <br />
                              <br />
                              <div>Email : <b>{product.seller.email}</b></div>
                              <div>Phone Number : <b>{product.seller.phone}</b></div>
                            </div>
                            <div className="modal-footer">
                              <button className="btn btn-danger" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Second Step</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">Confirmation upon receipt</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              You must click the button below to confirm receipt of your order.
                              <br />
                              <br />
                              <button className="btn btn-success" onClick={receive}>I have Picked my order</button>
                            </div>
                            <div className="modal-footer">
                              <button className="btn btn-danger" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Back to first step</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-danger" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Show the next Step ➤</button>

                    </div>
                  )}
                  {product.status==="complete" &&(
                    <div className="AuctionCompleted">Auction Completed Successfully</div>
                  )}

                  {isPopupOpen && (
                    <PopupMMessage
                      closePopup={closePopup}
                      order={order()}
                      amount={amount.toString()}
                      description={product.id.toString()}
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
                      <div className="curPrice"><h4 >{`Current Price is : `}</h4><div className="currentPrice"><h2> ${product.currentPrice} JDs</h2></div></div>
                      <h5>{`Initial Price is : ${product.initialPrice} JDs`}</h5>
                    </div>

                  </div>
                  <div className="location">
                    <h4>{product.address}</h4>
                    <div className="min-bid">Min Bid : {product.minBid} JDs</div>
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
                    {(product.status!="CANCELLED")&&( <Timer endDate={new Date(formatDateToISO(product.expireDate))} sentMessage="Auction Ended" />)}
                     {(product.status=="CANCELLED")&& (<><br></br> "You have deleted this auction"</>)}
                    
                  </div>
                </div>

                <div className="drop">
                  <DropdownComponent users={usersa} status={product.status} />
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
