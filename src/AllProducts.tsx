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
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

interface Product {
  pId: number;
  image: string;
  title: string;
  description: string;
  price: number;
  endDate: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  attributes: string[];
}

const AllProducts: React.FC = () => {
  const [fromValue, setFromValue] = useState(10);
  const [toValue, setToValue] = useState(1000);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedstatus, setSelectedstatus] = useState<string[]>([]);
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // To store total pages
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs(''));
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(''));
  const token = localStorage.getItem("authToken") || "";
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]);

  const [allAddresses] = useState([
    'Amman',
    'Aqaba',
    'Al-Mafraq',
    'Irbid',
    'Jarash',
    'Karak',
    'Madaba',
    'Tafila',
    'Zarqa',
    'Balqa',
    "Ma'an",
    'Ajloun',
  ]);

  const handleCheckboxChange2 = (name: string) => {
    setSelectedAddresses((prevSelected) => {
      // If the address is already selected, remove it
      if (prevSelected.includes(name)) {
        return prevSelected.filter((address) => address !== name);
      } else {
        // Otherwise, add the address to the selected list
        return [...prevSelected, name];
      }
    });
  };
  const handleCheckboxChange3 = (name: string) => {
    setSelectedstatus((prevSelected) => {
      if (prevSelected.includes(name)) {
        return prevSelected.filter((address) => address !== name);
      } else {
        // Otherwise, add the address to the selected list
        return [...prevSelected, name];
      }
    });
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };


  // Function to handle checkbox change
  const handleCheckboxChange = (name: string) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(name)) {
        console.log(selectedCategories)
        return prevSelected.filter((category) => category !== name); // Uncheck
      } else {
        console.log(selectedCategories)
        return [...prevSelected, name]; // Check
      }
    });
  };


  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/auctions?offset=${(page - 1) * 10}&pageSize=10&sortBy=&sortDirection=&searchKey=&itemStatus=&category=&beginDate=&expireDate&address=&minCurrentPrice=&maxCurrentPrice=`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      const formattedProducts = (data.content || []).map((product: any) => ({
        pId: product.id,
        image: product.item.images[0]?.imageUrl || "",
        title: product.item.name,
        description: product.item.description,
        price: product.currentPrice,
        endDate: formatDateToISO(product.expireDate),
      }));

      setProducts(formattedProducts);
      setTotalPages(data.totalPages);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/category/all', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: Category[] = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setLoading(false);
    }
  };




  useEffect(() => {
    fetchCategories();
    fetchData(currentPage); // Pass the current page to fetchData
  }, [currentPage, token]);

  const formatDateToISO = (dateString: string): string => {
    const [day, month, year, time] = dateString.split(/[-\s:]/);
    return new Date(`${year}-${month}-${day}T${time}:00Z`).toISOString();
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
    //return <div>Error: {error.message}</div>;
  }

  const items = [{ text: "Home", icon: faHome, link: "/" }];
  const logo = "https://saifsamplewebsite.netlify.app/imgs/hublogo-2.png";

  return (
    <>
      <div className="menu">
        <ListGroup items={items} logo={logo} isMenuCollapsed={false} />
        <div className="spacer"></div>
        <div className="filter">Filter</div>

        <div className="filter-container">


          <SimpleTreeView>
            <TreeItem itemId="grid" label="Price">

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

            </TreeItem>

          </SimpleTreeView>

          <SimpleTreeView>
            <TreeItem itemId="grid" label="Date">
              <div className="back">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                  />
                </LocalizationProvider>
                <br />
                <br />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    label="ُEnd Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                  />
                </LocalizationProvider>
              </div>
            </TreeItem>

          </SimpleTreeView>

          <SimpleTreeView>
            <TreeItem itemId="grid" label="Category">
              <div className="check">
                <div className="check-cat">

                  {categories.map((category) => (
                    <label className="custom-checkbox"> <input checked={selectedCategories.includes(category.name)} type="checkbox" id={category.name} name={category.name} onChange={() => { handleCheckboxChange(category.name); }} /><span className="checkmark"></span> {category.name}</label>
                  ))}
                </div>
              </div>

            </TreeItem>

          </SimpleTreeView>

          <SimpleTreeView>
            <TreeItem itemId="grid" label="Status">
              <div className="check">
              <div className="check-cat">
                <label className="custom-checkbox" > <input  checked={selectedstatus.includes("New")} type="checkbox" id="New" onChange={() => { handleCheckboxChange3("New"); }} name="New" value="New" /><span className="checkmark"></span> New</label>

                <label className="custom-checkbox"> <input  checked={selectedstatus.includes("Used")} type="checkbox" id="Used" onChange={() => { handleCheckboxChange3("Used"); }} name="Used" value="Used" /><span className="checkmark"></span> Used</label>
              </div>
              </div>

            </TreeItem>

          </SimpleTreeView>


          <SimpleTreeView>
            <TreeItem itemId="grid" label="Address">
              <div className="check">
                <div className="check-cat">
                  {allAddresses.map((address, index) => (
                    <div key={index} className="check">

                      <label htmlFor={address} className="custom-checkbox" ><input
                        type="checkbox"
                        id={address}
                        name={address}
                        checked={selectedAddresses.includes(address)}
                        onChange={() => { handleCheckboxChange2(address); console.log(selectedAddresses) }}
                      />   <span className="checkmark"></span>
 {address} </label>
                    </div>
                  ))}
                </div>
              </div>

            </TreeItem>

          </SimpleTreeView>
          <div className="ch">
            <button className="next back btn btn-danger" >
              Reset
            </button>
            <button className="next back btn btn-success" >
              Apply
            </button>
          </div>
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

        <Stack spacing={2} sx={{ mt: 2 }}>
          <Pagination
            count={totalPages} // Use the total pages from the response
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </>
  );
};

export default AllProducts;
