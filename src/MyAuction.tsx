import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import TriangleLoader from "./components/loading";
import LoginWarning from "./components/loginWarning";

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
  status: string;

}

const formatDateToISO = (dateString: string): string => {
  const [day, month, year, time] = dateString.split(/[-\s:]/);
  return new Date(`${year}-${month}-${day}T${time}:00Z`).toISOString();
};

function MyAuction() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let productCards;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log(token);
        const response = await fetch("http://localhost:8080/auctions/myAuctions", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Product[] = await response.json();

        // Set products state directly with the new data
        setProducts(data);
        productCards = data;
      } catch (error) {
        if (error instanceof Error) {
          // setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);  // Empty dependency array means this effect runs once when the component mounts


  if (loading) {
    return (
      <div className="testmain">
        <TriangleLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="testmain">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!localStorage.getItem("authToken")) {
    return <LoginWarning />;
  }

  return (
    <div className="testmain">
      <div className="formTitle" id="formTitle">
        My Auction
      </div>
      <div className="products">
        {// Filter out cancelled products and map the remaining ones
          productCards = products
            .filter((product) => product.status !== "CANCELLED") // Filter out CANCELLED products
            .map((product) => {
              // Get the first image URL for the product
              const imageUrl = product.item.auctionImages.length > 0 ? product.item.auctionImages[0].imageUrl : '';
              const formattedExpireDate = formatDateToISO(product.expireDate); // Format expireDate

              return (
                <ProductCard
                  key={product.id}
                  img={imageUrl}
                  title={product.item.name}
                  description={product.item.description}
                  currentPrice={product.currentPrice}
                  endDate={new Date(formattedExpireDate)} // Pass the formatted date
                  id={product.id}
                  message={""}
                  status={product.status}
                />
              );
            })};
      </div>
      <div className="formTitle" id="formTitle">
        Deleted Auctions
      </div>
      <div className="products">
        {// Filter out cancelled products and map the remaining ones
          productCards = products
            .filter((product) => product.status == "CANCELLED") // Filter out CANCELLED products
            .map((product) => {
              // Get the first image URL for the product
              const imageUrl = product.item.auctionImages.length > 0 ? product.item.auctionImages[0].imageUrl : '';
              const formattedExpireDate = formatDateToISO(product.expireDate); // Format expireDate

              return (
                <ProductCard
                  key={product.id}
                  img={imageUrl}
                  title={product.item.name}
                  description={product.item.description}
                  currentPrice={product.currentPrice}
                  endDate={new Date(formattedExpireDate)} // Pass the formatted date
                  id={product.id}
                  message={""}
                  status={product.status}
                />
              );
            })};
      </div>

    </div>
  );
}

export default MyAuction;
