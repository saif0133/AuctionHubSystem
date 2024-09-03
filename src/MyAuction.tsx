import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import TriangleLoader from "./components/loading";
import { Width } from "devextreme-react/cjs/chart";
import LoginWarning from "./components/loginWarning"

interface Product {
  id: number;
  item: {
    name: string;
    description: string;
    images: {
      imageUrl: string;
    }[];
  };
  currentPrice: number;
  expireDate: string;
}
const formatToISO = (dateStr: string): string => {
  const [day, month, yearTime] = dateStr.split('-');
  const [year, time] = yearTime.split(' ');
  const [hour, minute] = time.split(':');

  const formattedDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`);
  
  return formattedDate.toISOString();
};
function MyAuction() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Retrieve the token

        const response = await fetch("http://localhost:8080/auction/myAuctions", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

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
        <TriangleLoader />
      </div>
    );
  }

  if (error) {
    return <LoginWarning />;
  }

  return (
    <div className="testmain">
      <div className="products">
        {products.map((product) => {
                    const formattedEndDate = formatToISO(product.expireDate);

          // Get the first image URL for the product
          const imageUrl = product.item.images.length > 0 ? product.item.images[0].imageUrl : '';

          return (
            <>
            <ProductCard
              key={product.id}
              img={imageUrl}
              title={product.item.name}
              description={product.item.description}
              currentPrice={product.currentPrice}
              endDate={new Date(formattedEndDate)}
              id={product.id}
              message={""}
            />
         </> );
        })}
      </div>
    </div>
  );
}

export default MyAuction;
