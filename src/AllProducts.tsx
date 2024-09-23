import React, { useState, useEffect } from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ListGroup from "./components/ListGroup";
import "./script";
import ProductCard from "./components/ProductCard";
import TriangleLoader from "./components/loading";
import Pagination from '@mui/material/Pagination';
import { Stack } from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Product {
  pId: number;
  image: string;
  title: string;
  description: string;
  price: number;
  endDate: string;
}

const AllProducts: React.FC = () => {
  const [fromValue, setFromValue] = useState(10);
  const [toValue, setToValue] = useState(1000);
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");

  const [inpDay, setInpDay] = useState(day);
  const [inpMon, setInpMon] = useState(month);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    console.log("Selected page:", value);
  };
  const handleChangeD = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.target.value, 10) < 10 && event.target.value.length < 2)
      setInpDay("0" + event.target.value);
    else if (
      parseInt(event.target.value) >= 10 &&
      parseInt(event.target.value) < 32
    )
      setInpDay(event.target.value);
    else {
      setInpDay(day);
    }
  };
  const handleChangeM = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = parseInt(event.target.value, 10);
  
    // Ensure the input is a valid number between 1 and 12
    if (inputVal >= 1 && inputVal <= 9 && event.target.value.length < 2) {
      setInpMon("0" + inputVal); // Pad single digits with a leading zero
    } else if (inputVal >= 10 && inputVal <= 12) {
      setInpMon(event.target.value); // Set the value for months 10 to 12
    } else {
      setInpMon(month); // Reset to current month if the input is invalid
    }
  };
  

  // Fetch Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/auction/all");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        const formattedProducts = data.map((product: any) => ({
          pId: product.id,
          image: product.item.images[0]?.imageUrl || "", // First image URL
          title: product.item.name,
          description: product.item.description,
          price: product.currentPrice,
          endDate: formatDateToISO(product.expireDate), // Convert to ISO format
        }));

        setProducts(formattedProducts);
      } catch (error) {
        if (error instanceof Error) setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format date to ISO
  const formatDateToISO = (expireDate: any): string => {
    const date = new Date(expireDate);
    return date.toISOString().split("T")[0];
  };

  const handleFromInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < toValue) setFromValue(value);
  };

  const handleToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > fromValue) setToValue(value);
  };


  
  const updateSliderBackground = () => {
    const rangeDistance = 1000 - 10;
    const fromPosition = ((fromValue - 10) / rangeDistance) * 100;
    const toPosition = ((toValue - 10) / rangeDistance) * 100;

    const sliders = document.querySelectorAll<HTMLInputElement>('.sliders_control input[type="range"]');
    sliders.forEach((slider) => {
      slider.style.background = `linear-gradient(to right, #C6C6C6 ${fromPosition}%, #740000 ${fromPosition}%, #740000 ${toPosition}%, #C6C6C6 ${toPosition}%)`;
    });
  };

  useEffect(() => {
    updateSliderBackground();
  }, [fromValue, toValue]);

  if (loading) {
    return (
      <div className="testmain">
        <TriangleLoader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const items = [{ text: "Home", icon: faHome, link: "/" }];
  const logo = "https://saifsamplewebsite.netlify.app/imgs/hublogo-2.png";

  return (
    <>
      <div className="menu">
        <ListGroup items={items} logo={logo} isMenuCollapsed={false} />

        <div className="filter">Filter</div>
        <div className="filter-container">
          <div className="r_container list-group-item">
            <div className="range-title">Price Range</div>
            <div className="sliders_control">
              <input
                id="fromSlider"
                type="range"
                value={fromValue}
                min="10"
                max="1000"
                step={10}
                onChange={(e) => setFromValue(Number(e.target.value))}
              />
              <input
                id="toSlider"
                type="range"
                value={toValue}
                min="10"
                max="1000"
                step={10}
                onChange={(e) => setToValue(Number(e.target.value))}
              />
            </div>
            <div className="form_control">
              <div className="form_control_container">
                <div className="form_control_container__time">Min</div>
                <input
                  className="form_control_container__time__input"
                  type="number"
                  value={fromValue}
                  min="10"
                  max={toValue - 10}
                  onChange={handleFromInputChange}
                />
              </div>
              <div className="form_control_container">
                <div className="form_control_container__time">Max</div>
                <input
                  className="form_control_container__time__input"
                  type="number"
                  value={toValue}
                  min={fromValue + 10}
                  max="1000"
                  onChange={handleToInputChange}
                />
              </div>
            </div>
          </div>
          {/* <div className="r_container">
            <div className="input-date">
              <input
                type="text"
                maxLength={2}
                value={inpDay}
                onBlur={handleChangeD}
                onChange={(e) => setInpDay(e.target.value)}
              />
            </div>
          </div> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
  label="Start Date"
  value={value}
  onChange={(newValue) => setValue(newValue)}
/>
</LocalizationProvider>
        </div>
        <div className="footer">
          <p>
            <a href="legal.html">Legal</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
            <a href="privacy.html">Privacy Policy</a>
          </p>
          <p>© 2024 Auction Hub. All Rights Reserved.</p>
        </div>
      </div>

      <div className="testmain">
        <div className="products">
          {products.map((product) => (
            <ProductCard
              key={product.pId}
              img={product.image}
              title={product.title}
              description={product.description}
              currentPrice={product.price}
              endDate={new Date(product.endDate)}
              id={product.pId}
              message=""
            />
          ))}
        </div>
        <Stack spacing={6}>
        <Pagination count={10} variant="outlined" shape="rounded"  page={currentPage} // Controlled page number
        onChange={handlePageChange}  />
        </Stack>
      </div>
    </>
  );
};

export default AllProducts;
