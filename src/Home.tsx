import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProductCard from "./components/ProductCard";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mocki.io/v1/9ba55466-347b-4308-ad06-6b5465f7b7f0"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="testmain">
        <h1>Loading...</h1>{" "}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="testmain">
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
