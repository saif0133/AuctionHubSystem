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
//import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { useNavigate } from "react-router-dom";
import { TreeItem } from "@mui/x-tree-view";


interface Product {
  id: number;
  status: string;
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

interface Category {
  id: number;
  name: string;
  description: string;
  attributes: string[];
}

interface SearchParams {
  searchKey: string;
  itemStatus: string;
  category: string[];
  beginDate: string;
  expireDate: string;
  address: string[];
  minCurrentPrice: string;
  maxCurrentPrice: string;
}


const AllProducts: React.FC = () => {
  const [fromValue, setFromValue] = useState(10);
  const [toValue, setToValue] = useState(10000);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedstatus, setSelectedstatus] = useState<string[]>([]);
  const [deafultExpand, setDeafultExpand] = useState<string[]>([]);
  const today = new Date();
  const day = today.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // To store total pages
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs(''));
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(''));
  const token = localStorage.getItem("authToken") || "";
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]);

  const [searchParams, setSearchParams] = useState<SearchParams>({
    searchKey: "",
    itemStatus: "",
    category: [],
    beginDate: "",
    expireDate: "",
    address: [],
    minCurrentPrice: "",
    maxCurrentPrice: ""
  });



  const navigate = useNavigate();
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

  const updateSearchParams = async () => {
    console.log(searchParams);
    
    await navigate("/all");
    console.log("def" + deafultExpand);
    const params = new URLSearchParams(window.location.search); // Initialize with current search parameters
if(params.get("searchKey")=="")
      await navigate("/all");

    // Log current parameters for debugging
    console.log('Current URL Parameters:', Array.from(params.entries()));

    // Add the range values if they are valid
    if (fromValue != null) {
      params.set('fromValue', fromValue.toString());
    }
    if (toValue != null) {
      params.set('toValue', toValue.toString());
    }

    // Clear existing categories and add selected categories only if not empty
    if (selectedCategories.length > 0) {
      params.delete('categories'); // Clear existing categories
      selectedCategories.forEach((category) => {
        params.append('categories', category); // Use append for multiple categories
      });
    }

    // Add selected statuses only if not empty and ensure we don't duplicate existing values
    if (selectedstatus.length > 0 && selectedstatus.length < 2) {
      const existingStatuses = params.getAll('status');
      const newStatuses = selectedstatus.filter(status => !existingStatuses.includes(status)); // Filter out existing statuses
      newStatuses.forEach((status) => {
        params.append('status', status);
      });
    }

    // Add current page if it has a valid value
    if (currentPage != null) {
      params.set('currentPage', currentPage.toString());
    }

    // Add date range only if they are valid
    if (startDate && startDate.isValid()) { // Ensure startDate is valid
      params.set('startDate', startDate.format('YYYY-MM-DD')); // Adjust format as needed
    }
    if (endDate && endDate.isValid()) { // Ensure endDate is valid
      params.set('endDate', endDate.format('YYYY-MM-DD'));
    }

    // Add selected addresses only if there are any
    if (selectedAddresses.length > 0) {
      params.delete('addresses'); // Clear existing addresses
      selectedAddresses.forEach((address) => {
        params.append('addresses', address);
      });
    }

    // Update the URL
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);

    // Set searchParams state with the current values from URLSearchParams
    setSearchParams({
      searchKey: searchParams.searchKey || "", // Default to empty string if null
      itemStatus: params.get("status") || "", // Default to empty string if null
      category: params.getAll("categories"), // Use getAll for multiple categories
      beginDate: params.get("startDate") || "", // Default to empty string if null
      expireDate: params.get("endDate") || "", // Default to empty string if null
      address: params.getAll("addresses"), // Use getAll for multiple addresses
      minCurrentPrice: params.get("fromValue") || "", // Default to empty string if null
      maxCurrentPrice: params.get("toValue") || "" // Default to empty string if null
    });

    // Log searchParams for debugging
    console.log('Updated searchParams:', {
      searchKey: params.get("searchKey"),
      itemStatus: params.get("status"),
      category: params.getAll("categories"),
      beginDate: params.get("startDate"),
      expireDate: params.get("endDate"),
      address: params.getAll("addresses"),
      minCurrentPrice: params.get("fromValue"),
      maxCurrentPrice: params.get("toValue")
    });
    console.log(searchParams);
    // fetchData(currentPage);
  };
  // Handle TreeItem expansion/collapse
  const handleItemExpansionToggle = (id: string) => (event: React.SyntheticEvent, itemId: string, isExpanded: boolean) => {
    if (isExpanded) {
      // Add the item ID to the expanded items array when expanded
      setDeafultExpand(prevState => [...prevState, id]);
    } else {
      // Remove the item ID from the expanded items array when collapsed
      setDeafultExpand(prevState => prevState.filter(item => item !== id));
    }
  };
  // UseEffect to fetch data when searchParams change
  useEffect(() => {
    fetchData(currentPage);
  }, [searchParams]); // This will trigger fetchData whenever searchParams change


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
      setLoading(true); // Loading state before API call

      // Body of the request
      const requestBody = searchParams;
      //  {
      //   searchKey: "",             // Search term, empty by default
      //   itemStatus: "",            // Status filter, empty by default
      //   category: [],              // Array of categories, empty by default
      //   beginDate: "",             // Beginning date filter, empty by default
      //   expireDate: "",            // Expiry date filter, empty by default
      //   address: [""],             // Address array, can include multiple locations if needed
      //   minCurrentPrice: "",       // Minimum price filter, empty by default
      //   maxCurrentPrice: ""        // Maximum price filter, empty by default
      // };


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
    //updateSearchParams();

      const params = new URLSearchParams(window.location.search);
    if (params.get("searchKey")) {
      setSearchParams(prev => ({
        ...prev, // Spread the existing searchParams
        searchKey: params.get("searchKey") || "" // Update only the "searchKey"
      }));}

    fetchCategories();
    //fetchData(currentPage); // Pass the current page to fetchData
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
    const rangeDistance = 10000 - 10;
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


          <SimpleTreeView defaultExpandedItems={deafultExpand} onItemExpansionToggle={handleItemExpansionToggle("tree1")}  >
            <TreeItem itemId="tree1" label="Price" >

              <div className="r_container list-group-item">
                <div className="range-title">Price Range</div>
                <div className="sliders_control">
                  <input
                    id="fromSlider"
                    type="range"
                    value={fromValue}
                    min="10"
                    max="10000"
                    step={10}
                    onChange={(e) => {
                      setFromValue(Number(e.target.value)); // Update the slider value
                      setDeafultExpand(prevState => [...prevState, "tree1"]); // Add "grid" to the array
                    }} />
                  <input
                    id="toSlider"
                    type="range"
                    value={toValue}
                    min="10"
                    max="10000"
                    step={10}
                    onChange={(e) => {
                      setToValue(Number(e.target.value));
                      setDeafultExpand(prevState => [...prevState, "tree1"]);
                    }}
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
                      max="10000"
                      onChange={handleToInputChange}
                    />
                  </div>
                </div>
              </div>

            </TreeItem>

          </SimpleTreeView>

          <SimpleTreeView defaultExpandedItems={deafultExpand} onItemExpansionToggle={handleItemExpansionToggle("tree2")}  >
            <TreeItem itemId="tree2" label="Date">
              <div className="back">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                      setDeafultExpand(prevState => [...prevState, "tree2"]);
                    }}
                  />
                </LocalizationProvider>
                <br />
                <br />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    label="ُEnd Date"
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                      setDeafultExpand(prevState => [...prevState, "tree2"]); // Add "grid" to the array

                    }}
                  />
                </LocalizationProvider>
              </div>
            </TreeItem>

          </SimpleTreeView>

          <SimpleTreeView defaultExpandedItems={deafultExpand} onItemExpansionToggle={handleItemExpansionToggle("tree3")}  >
            <TreeItem itemId="tree3" label="Category">
              <div className="check">
                <div className="check-cat">

                  {categories.map((category) => (
                    <label className="custom-checkbox"> <input checked={selectedCategories.includes(category.name)} type="checkbox" id={category.name} name={category.name} onChange={() => {
                      handleCheckboxChange(category.name); setDeafultExpand(prevState => [...prevState, "tree3"]); // Add "grid" to the array
                    }} /><span className="checkmark"></span> {category.name}</label>
                  ))}
                </div>
              </div>

            </TreeItem>

          </SimpleTreeView>

          <SimpleTreeView defaultExpandedItems={deafultExpand} onItemExpansionToggle={handleItemExpansionToggle("tree4")}  >
            <TreeItem itemId="tree4" label="Status">
              <div className="check">
                <div className="check-cat">
                  <label className="custom-checkbox" > <input checked={selectedstatus.includes("New")} type="checkbox" id="New" onChange={() => {
                    handleCheckboxChange3("New"); setDeafultExpand(prevState => [...prevState, "tree4"]); // Add "grid" to the array
                  }} name="New" value="New" /><span className="checkmark"></span> New</label>

                  <label className="custom-checkbox"> <input checked={selectedstatus.includes("Used")} type="checkbox" id="Used" onChange={() => {
                    handleCheckboxChange3("Used"); setDeafultExpand(prevState => [...prevState, "tree4"]); // Add "grid" to the array
                  }} name="Used" value="Used" /><span className="checkmark"></span> Used</label>
                </div>
              </div>

            </TreeItem>

          </SimpleTreeView>


          <SimpleTreeView defaultExpandedItems={deafultExpand} onItemExpansionToggle={handleItemExpansionToggle("tree5")}  >
            <TreeItem itemId="tree5" label="Address">
              <div className="check">
                <div className="check-cat">
                  {allAddresses.map((address, index) => (
                    <div key={index} className="check">

                      <label htmlFor={address} className="custom-checkbox" ><input
                        type="checkbox"
                        id={address}
                        name={address}
                        checked={selectedAddresses.includes(address)}
                        onChange={() => {
                          handleCheckboxChange2(address); console.log(selectedAddresses); setDeafultExpand(prevState => [...prevState, "tree4"]); // Add "grid" to the array
                        }}
                      />   <span className="checkmark"></span>
                        {address} </label>
                    </div>
                  ))}
                </div>
              </div>

            </TreeItem>

          </SimpleTreeView>
          <div className="ch">
            <button className="next back btn btn-danger" onClick={() => { window.location.href = "/all" }} >
              Reset
            </button>
            <button className="next back btn btn-success" onClick={updateSearchParams} >
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
        {searchParams.searchKey && (<div className="searchResult">Showing results for <b>{searchParams.searchKey}</b> - Page {currentPage+1} <hr /></div>)}
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
                status={product.status}
              />
            );
          })}
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
