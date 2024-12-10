import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import TriangleLoader from "./components/loading";
import { extractDataFromToken } from "./components/tokenDecode";
import CategoryCard from "./components/CategoryCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

import Slider from "react-slick";

// Update Product interface to match the fetched data
interface Product {
  id: number;
  item: {
    name: string;
    description: string;
    auctionImages: {
      imageUrl: string;
    }[];
  };
  currentPrice: number;
  expireDate: string; // Keep this as string since you're parsing it
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const token = localStorage.getItem("authToken") || "";

  const formatDateToISO = (dateString: string): string => {
    const [day, month, year, time] = dateString.split(/[-\s:]/);
    return new Date(`${year}-${month}-${day}T${time}:00Z`).toISOString();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [
    'https://github.com/saif0133/deploy-sec/blob/main/imgs/auction.png?raw=true',
    'https://github.com/saif0133/website-deployment/blob/main/imgs/au3.png?raw=true',
    'https://github.com/saif0133/website-deployment/blob/main/imgs/au2.png?raw=true',
    'https://github.com/saif0133/website-deployment/blob/main/imgs/au1.png?raw=true',
  ];

 
  const fetchData = async (page: number) => {
    try {
      setLoading(true); // Loading state before API call

      // Body of the request
      const requestBody = {
        searchKey: "",             // Search term, empty by default
        itemStatus: "",            // Status filter, empty by default
        category: [],              // Array of categories, empty by default
        beginDate: "",             // Beginning date filter, empty by default
        expireDate: "",            // Expiry date filter, empty by default
        address: [""],             // Address array, can include multiple locations if needed
        minCurrentPrice: "",       // Minimum price filter, empty by default
        maxCurrentPrice: ""        // Maximum price filter, empty by default
      };


      const response = await fetch(
        `http://localhost:8080/auctions/all?offset=0&pageSize=10&sortBy=&sortDirection=`, // Remove query params for body data
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody), // Convert request body to JSON
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data); // Log the full API response to debug structure

      // Access the 'content' array in the response
      const formattedProducts = (data.content || []).map((product: Product) => ({
        id: product.id,
        item: {
          name: product.item.name,
          description: product.item.description,
          auctionImages: product.item.auctionImages, // Array of images
        },
        currentPrice: product.currentPrice,
        expireDate: formatDateToISO(product.expireDate), // Convert expireDate to ISO format
      }));

      setProducts(formattedProducts);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        console.log(error)
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData(1);
  }, [token]);

  if (loading) {
    return (
      <div className="testmain">
        <TriangleLoader />
      </div>
    );
  }

  if (error) {
    return <div className="testmain">
       <div className="imageContainer">
        {/* <img src="https://github.com/saif0133/deploy-sec/blob/main/imgs/auction.png?raw=true" alt="" className="imageCont" /> */}
        {/* <Slider {...settings}>
      {images.map((src, index) => (
        <div key={index}>
          <img src={src} alt={`Slide ${index + 1}`} style={{ width: "100%" }} />
        </div>
      ))}
    </Slider> */}
  <Swiper 
  loop={true}
  modules={[Autoplay]}
  autoplay={{delay:2500}}>
      <SwiperSlide><img style={{height:"105%"}} src="https://github.com/saif0133/website-deployment/blob/main/imgs/au3.png?raw=true" alt="" className="imageCont" /></SwiperSlide>
      <SwiperSlide><img style={{height:"105%"}} src="https://github.com/saif0133/deploy-sec/blob/main/imgs/auction.png?raw=true" alt="" className="imageCont" /></SwiperSlide>
      <SwiperSlide><img style={{height:"105%"}} src="https://github.com/saif0133/website-deployment/blob/main/imgs/au2.png?raw=true" alt="" className="imageCont" /></SwiperSlide>
      <SwiperSlide><img style={{height:"105%"}} src="https://github.com/saif0133/website-deployment/blob/main/imgs/au1.png?raw=true" alt="" className="imageCont" /></SwiperSlide>
      
    
      </Swiper>

      </div>
      <div className="errorpage">
        <div><img
          src="https://github.com/saif0133/deploy-sec/blob/main/imgs/warning.png?raw=true"
          alt=""
          style={{ width: "100px", marginBottom: "20px" }}
        /></div>
        <div><h4 style={{ color: "#90908F" }} >Something went wrong</h4></div>
        <div><button className="btn-danger btn bid" onClick={() => window.location.reload()}>Refresh</button></div>
      </div>
    </div>
  }

  return (
    <div className="testmain">
      <div className="imageContainer">
        {/* <img src="https://github.com/saif0133/deploy-sec/blob/main/imgs/auction.png?raw=true" alt="" className="imageCont" /> */}
        {/* <Slider {...settings}>
      {images.map((src, index) => (
        <div key={index}>
          <img src={src} alt={`Slide ${index + 1}`} style={{ width: "100%" }} />
        </div>
      ))}
    </Slider> */}
  <Swiper 
  loop={true}
  modules={[Autoplay]}
  autoplay={{delay:2500}}>
      <SwiperSlide><img style={{height:"105%"}} src="https://github.com/saif0133/website-deployment/blob/main/imgs/au3.png?raw=true" alt="" className="imageCont" /></SwiperSlide>
      <SwiperSlide><img style={{height:"105%"}} src="https://github.com/saif0133/deploy-sec/blob/main/imgs/auction.png?raw=true" alt="" className="imageCont" /></SwiperSlide>
      <SwiperSlide><img style={{height:"105%"}} src="https://github.com/saif0133/website-deployment/blob/main/imgs/au2.png?raw=true" alt="" className="imageCont" /></SwiperSlide>
      <SwiperSlide><img style={{height:"105%"}} src="https://github.com/saif0133/website-deployment/blob/main/imgs/au1.png?raw=true" alt="" className="imageCont" /></SwiperSlide>
      
    
      </Swiper>

      </div>
      <div className="category-list">

        <CategoryCard

        />

      </div>


      <div className="products">
        {products.map((product) => {
          const imageUrl = product.item.auctionImages.length > 0 ? product.item.auctionImages[0].imageUrl : '';
          //const formattedExpireDate = formatDateToISO(product.expireDate); // Format expireDate

          return (
            <ProductCard
              key={product.id}
              img={imageUrl}
              title={product.item.name}
              description={product.item.description}
              currentPrice={product.currentPrice}
              endDate={new Date(product.expireDate)}
              id={product.id}
              message={""}
              status=""
            />
          );
        })}
      </div>
      <NavLink to="/all" className={"btn-secondary btn"}>
        Next
      </NavLink>
    </div>
  );
};

export default Home;
