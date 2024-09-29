import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import TriangleLoader from "./components/loading";
import { extractDataFromToken } from "./components/tokenDecode";
import CategoryCard from "./components/CategoryCard";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// Update Product interface to match the fetched data
interface Product {
  pId: number;
  image: string;
  title: string;
  description: string;
  price: number;
  endDate: string;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/auctions", {
          method: "GET", // Change to POST
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchKey: "",
            itemStatus: "",
            category: "",
            beginDate: "",
            expireDate: "",
            location: "",
            minCurrentPrice: "",
            maxCurrentPrice: ""
          }),
        });
    
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
    
        const data = await response.json();
    
        const formattedProducts = data.map((product: any) => ({
          pId: product.id,
          image: product.item.images[0]?.imageUrl || "", // Get the first image URL or empty string
          title: product.item.name,
          description: product.item.description,
          price: product.currentPrice,
          endDate: formatDateToISO(product.expireDate), // Convert to ISO format
        }));
    
        setProducts(formattedProducts);
        console.log(formattedProducts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    
  
    fetchData();
  }, []); // Dependency array is empty to ensure the effect runs once on component mount
  

  if (loading) {
    return (
      <div className="testmain">
        <TriangleLoader />
      </div>
    );
  }

  if (error) {
  //  return <div>Error: {error.message}</div>;
  }

  return (
    <div className="testmain">
      <div className="imageContainer">
        <img src="https://github.com/saif0133/deploy-sec/blob/main/imgs/auction.png?raw=true" alt="" className="imageCont" />
      </div>
      <div className="category-list">

      <CategoryCard 
     
      />
     
      </div>
     
      
      <div className="products">
        {products.map((product) => {
          return (
            <ProductCard
              key={product.pId}
              img={product.image}
              title={product.title}
              description={product.description}
              currentPrice={product.price}
              endDate={new Date(product.endDate)}
              id={product.pId}
              message={""}
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
