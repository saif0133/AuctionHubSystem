import { useEffect, useState } from "react";
import StaticDatePickerLandscape from "./StaticDatePickerLandscape";
import PopupMMessage from "./components/PopupMessage";
import LoginWarning from "./components/loginWarning";
import { fetchPaymentId, getPaymentDetails } from "./components/paymentId";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';


let count = 1;
let userNotIn=true;
interface Category {
  id: number;
  name: string;
  description: string;
  attributes: string[];
}

function AddAuction() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>('');
  const [categoryAttributes, setCategoryAttributes] = useState<string[]>([]);
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [startDate, setStartDate] = useState("");
 const [expireDate, setExpireDate] = useState("");

const [itemStatusa, setItemStatusa] = useState("NEW");
  const [ProductLocation, setProductLocation] = useState("");
  const [minBida, setMinBid] = useState("");
  const [initialPricea, setInitialPrice] = useState("");
  const [attributeValues, setAttributeValues] = useState<Record<string, string>>({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [Title, setTitle] = useState("Product Info");
  const [images, setImageFiles] = useState<File[]>([]);
  const [imageMetadata, setImageMetadata] = useState<{ name: string, type: string, imageUrl: string }[]>([]);
  const [hasPaymentDetails, setHasPaymentDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate
  const userToken = localStorage.getItem('authToken') || null;
  const [userPayment, srtUserPayment] = useState(false);
  const [showAlert, serShowAlert] = useState(false);
  const order = () => {
    return "PublishFees";
  };

  const  [isPopupOpen5,setIsPopupOpen5] = useState(false);

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
  
  let reservedAmount="";
  reservedAmount = calculateReservedAmount(Number(initialPricea)).toString();


 
 

  const postData = async (): Promise<string | null> => {
    setIsPopupOpen5(true);
    const url = 'http://localhost:8080/auctions'; 
  
    const data = {
      expireDate: expireDate,
      item: {
        name: productTitle,
        description: productDescription,
        auctionImages: imageMetadata,
        itemStatus: itemStatusa,
        category: {
          id: category
        },
        categoryAttributes: attributeValues
      },
      address: ProductLocation,
      minBid: minBida,
      initialPrice: initialPricea
    };
  
    console.log('Data being sent:', JSON.stringify(data, null, 2));
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(data, null, 2)
      });
  
      if (!response.ok) {
        setIsPopupOpen5(false);
        await  message.info(response.json().toString())
        throw new Error('Network response was not ok');
        
      }
  
      const result = await response.json();
      console.log('Response:', result);
      await  message.info(`Transition Done Successfully`)
      navigate(`/Product/${result.id}`); // Navigate to a route with the ID
      return result.id || null;
    } catch (error) {
      setIsPopupOpen5(false);
      console.error('Error:', error);
      return null;
    }
  };
  
  

    
  useEffect(() => {
    const initializePaymentId = async () => {
      await fetchPaymentId();
      const details = getPaymentDetails(); // Get the details from the fetchPaymentId function
      setHasPaymentDetails(false);

      if (details.paymentId) {
       
        srtUserPayment(true);
      }
      else{
        serShowAlert(true);
      }

      setIsLoading(false); // Set loading to false after data is fetched
    };

    initializePaymentId();
  }, []);


  useEffect(() => {
    const fileInputs = document.querySelectorAll(".myfile");
  
    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const parentWrapper = target.closest(".upload-btn-wrapper");
          if (parentWrapper) {
            const img = parentWrapper.querySelector(".upload") as HTMLImageElement;
            if (img) {
              img.src = e.target?.result as string;
              img.alt = "Uploaded Image";
            } else {
              console.error("Image element not found.");
            }
          }
        };
        reader.readAsDataURL(file);
      } else {
        console.error("No file selected.");
      }
    };
  
    fileInputs.forEach((fileInput) => {
      fileInput.addEventListener("change", handleFileChange);
    });
  
    // Cleanup function to remove event listeners
    return () => {
      fileInputs.forEach((fileInput) => {
        fileInput.removeEventListener("change", handleFileChange);
      });
    };
  }, []);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/category/all',
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userToken}`, // Include the token
              "Content-Type": "application/json", // If you're dealing with JSON data
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Category[] = await response.json();
        setCategories(data); // Update state with fetched data
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [userToken]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const category = categories.find(cat => cat.id === selectedId);
    if (category) {
      setSelectedCategory(selectedId);
      setCategoryAttributes(category.attributes);
      // Initialize attribute values for new category
      const initialValues: Record<string, string> = {};
      category.attributes.forEach(attr => {
        initialValues[attr] = "";
      });
      setAttributeValues(initialValues);
    }
  };

  const handleAttributeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAttributeValues(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const getImageMetadata = (file: File): { name: string, type: string, imageUrl: string } => {
    return {
        name: file.name,
        type: file.type.split('/')[1], // Extract type from MIME type (e.g., 'image/jpeg' => 'jpeg')
        imageUrl: URL.createObjectURL(file)
    };
};

const uploadImage = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch('https://api.imgbb.com/1/upload?key=6167fd267a246964648eae8b1c642dfb', {
      method: 'POST',
      body: formData,
  });

  const data = await response.json();
  return data.data.url; // URL of the uploaded image
};

const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files ? Array.from(e.target.files) : [];

  // Update the list of files
  setImageFiles(prevFiles => [...prevFiles, ...files]);

  // Upload each file and collect the URLs
  const newImageMetadata = await Promise.all(files.map(async (file) => {
      const imageUrl = await uploadImage(file);
      return {
          name: file.name,
          type: file.type.split('/')[1], // Extract file extension
          imageUrl
      };
  }));

  // Update the metadata state
  setImageMetadata(prevMetadata => [...prevMetadata, ...newImageMetadata]);
};


  const openPopup = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
     
    event.preventDefault();
   // postData(event);
    setIsPopupOpen(true);
    
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

const doPayment=()=>{
  console.log("Transition done");
}


const validateAndProcessData = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  event.preventDefault();

  // Create an array to hold the names of missing fields
  const missingFields: string[] = [];
  const newErrors = {
    expireDate: false,
    productTitle: false,
    productDescription: false,
    imageMetadata: false,
    itemStatusa: false,
    category: false,
    attributeValues: false,
    ProductLocation: false,
    minBida: false,
    initialPricea: false
  };

  // Check for missing or invalid fields and add to the array
  if (!expireDate) {
    missingFields.push("Expiration Date");
    newErrors.expireDate = true;
  } else {
    const expireDateTime = new Date(expireDate);
    const currentTime = new Date();
    const timeDifference = expireDateTime.getTime() - currentTime.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert milliseconds to hours
/*
    if (hoursDifference < 24) {
      missingFields.push("Expiration Date must be at least 24 hours from now");
      newErrors.expireDate = true;
    }*/
  }

  if (!productTitle) {
    missingFields.push("Product Title");
    newErrors.productTitle = true;
  }
  if (!productDescription) {
    missingFields.push("Product Description");
    newErrors.productDescription = true;
  }
  if (!imageMetadata || imageMetadata.length === 0) {
    missingFields.push("Images");
    newErrors.imageMetadata = true;
  }
  if (!itemStatusa) {
    missingFields.push("Item Status");
    newErrors.itemStatusa = true;
  }
  if (!category) {
    missingFields.push("Category");
    newErrors.category = true;
  }
  if (!attributeValues || Object.keys(attributeValues).length === 0) {
    missingFields.push("Category Attributes");
    newErrors.attributeValues = true;
  }
  if (!ProductLocation) {
    missingFields.push("Product Location");
    newErrors.ProductLocation = true;
  }
  if (minBida == null) {
    missingFields.push("Minimum Bid");
    newErrors.minBida = true;
  }
  if (initialPricea == null) {
    missingFields.push("Initial Price");
    newErrors.initialPricea = true;
  }




  // If there are missing fields, show an alert with the details
  if (missingFields.length > 0) {
    alert("Please fill in the following required fields:\n" + missingFields.join(", "));
  } else {
    // Call openPopup if all values are valid
    openPopup(event);
  }
};

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const test = (e: React.MouseEvent) => {
    e.preventDefault();
    const a = document.getElementById("fromPage1");
    const b = document.getElementById("formb");
    const c = document.getElementById("formTitle");

    if (a && b && c) {
      if (count % 2 === 0) {
        a.style.display = "flex";
        b.style.display = "none";
        setTitle("Product Info");
        count++;
      } else {
        a.style.display = "none";
        b.style.display = "flex";
        setTitle("Auction Info");
        count++;
      }
      scrollToTop();
    }
  };

  useEffect(() => {
    const fileInputs = document.querySelectorAll(".myfile");

    fileInputs.forEach((fileInput) => {
      fileInput.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];

        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const parentWrapper = target.closest(".upload-btn-wrapper");
            if (parentWrapper) {
              const img = parentWrapper.querySelector(".upload") as HTMLImageElement;
              if (img) {
                img.src = e.target?.result as string;
                img.alt = "Uploaded Image";
              } else {
                console.error("Image element not found.");
              }
            }
          };
          reader.readAsDataURL(file);
        } else {
          console.error("No file selected.");
        }
      });
     
    });

    return () => {
      fileInputs.forEach((fileInput) => {
        fileInput.removeEventListener("change", () => {});
      });
    };
  }, []);
  if(!userToken)
    return <LoginWarning />;

  return (
    
    <div className="testmain">
     {!userPayment &&showAlert &&(
        <Alert
          startDecorator={<WarningIcon />}
          variant="solid"
          color="danger"
          endDecorator={
            <React.Fragment>
               <Button variant="outlined" color="neutral" sx={{ mr: 1 }} onClick={()=>navigate("../AddCard")}>
                Add Payment Method
              </Button> 
              <IconButton variant="solid" size="sm" color="danger" onClick={()=>serShowAlert(false)}>
                <CloseIcon />
              </IconButton> 
            </React.Fragment>
          }
        >
          Payment is missing! Please add to be able to create auction without adding payment method.
        </Alert>
      )}
      <div className="formTitle" id="formTitle">
        {" "}
        {Title}
      </div>

      <div className="forma">
        <form className="fromPage" id="fromPage1">
          <div className="fromPage1">
            <div className="inp">
              <div className="saif">
                <label className="input">
                  <input className="input__field" type="text" placeholder=" " onChange={(e ) => setProductTitle((e.target as HTMLInputElement).value)} />
                  <span className="input__label" >Product Name</span>
                </label>
              </div>
            </div>
            <div className="inp">
              <div className="saif">
                <label className="input">
                  <textarea className="input__field" placeholder=" "  onChange={(e) => setProductDescription((e.target as HTMLTextAreaElement).value)} />
                  <span className="input__label">Product Description</span>
                </label>
              </div>
            </div>

            <select 
              name=""
              id=""
              className="form-select"
              value={selectedCategory || ''}
              onChange={(e) => {
                handleCategoryChange(e);
                setCategory(e.target.value);
              }}
            >
              <option value="" disabled>
                Category
              </option>
              {categories.map((cat) => (
                <option  key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div className="additionalData" id="additionalData">
              <div className="data-group">Additional info</div>
              <div className="additionalData-input">
                {categoryAttributes.map((attr) => (
                  <input
                    key={attr}
                    type="text"
                    placeholder={attr}
                    name={attr}
                    value={attributeValues[attr] || ''}
                    onChange={handleAttributeChange}
                  />
                ))}
              </div>
            </div>
            <button className="next btn btn-success" onClick={test}>
              Next
            </button>
          </div>
          <div className="addImages">
            <div className="Product-Status">Product Status</div>
            <div className="type">
              <div>
                <input
                  type="radio"
                  className="btn-check btn"
                  name="options-outlined"
                  id="success-outlined"
                  autoComplete="off"
                  defaultChecked
                  
                  onChange={(e)=>{if(e.target.value="on")setItemStatusa("NEW")}}
                />
                <label
                  className="btn btn-outline-success"
                  htmlFor="success-outlined"
                >
                  New
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="btn-check btn"
                  name="options-outlined"
                  id="danger-outlined"
                  autoComplete="off"
                  onChange={(e)=>{if(e.target.value="on")setItemStatusa("USED")}}
                />
                <label
                  className="btn btn-outline-danger"
                  htmlFor="danger-outlined"
                >
                  Used
                </label>
              </div>
            </div>
            <div className="imageT">Product Image</div>
            <div className="upload-btn-wrapper main" id="upload-btn-wrapper">
              <img
                src="https://seekicon.com/free-icon-download/cloud-upload-o_1.svg"
                className="upload"
                alt="Upload Icon"
              />
              <input
                type="file"
                name="myfile"
                id="myfile"
                className="myfile"
                aria-errormessage="ssa"
                accept="image/*"
                onChange={handleImageChange}

              />
            </div>
            <div className="imageT">Product Gallery</div>
            <div className="gallery">
              <div className="upload-btn-wrapper">
                <img
                  src="https://seekicon.com/free-icon-download/cloud-upload-o_1.svg"
                  className="upload"
                  alt="Upload Icon"
                />
                 <input
                id="upload-images"
                type="file"
                className="myfile"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              </div>
              <div className="upload-btn-wrapper">
                <img
                  src="https://seekicon.com/free-icon-download/cloud-upload-o_1.svg"
                  className="upload"
                  alt="Upload Icon"
                />
                 <input
                id="upload-images"
                type="file"
                className="myfile"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              </div>
              <div className="upload-btn-wrapper">
                <img
                  src="https://seekicon.com/free-icon-download/cloud-upload-o_1.svg"
                  className="upload"
                  alt="Upload Icon"
                />
                 <input
                id="upload-images"
                type="file"
                className="myfile"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              </div>
              <div className="upload-btn-wrapper">
                <img
                  src="https://seekicon.com/free-icon-download/cloud-upload-o_1.svg"
                  className="upload"
                  alt="Upload Icon"
                />
                 <input
                id="upload-images"
                type="file"
                className="myfile"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              </div>
            </div>
            <select name="" defaultValue={""} id="" className="form-select" onChange={(e)=>setProductLocation(e.target.value)}>
              <option value="" disabled>
                Location
              </option>
              <option value="AMMAN">Amman</option>
              <option value="IRBID">Irbid</option>
              <option value="ZARQA">Zarqa</option>
              <option value="AQABA">Aqaba</option>
              <option value="SALT">Salt</option>
              <option value="MADABA">Madaba</option>
              <option value="MAFRAQ">Mafraq</option>
              <option value="KARAK">Karak</option>
              <option value="TAFELAH">Tafilah</option>
              <option value="MAAN">Ma'an</option>
              <option value="JERASH">Jerash</option>
              <option value="AJLOUN">Ajloun</option>
              <option value="BALQA">Balqa</option>
            </select>
          </div>
        </form>
      </div>
      <form action="" className="formb" id="formb">
        {" "}
        <div className="setDate">
      <div className="date-cont">
        Start Date
        <StaticDatePickerLandscape 
          type={"Start"} 
          onDateChange={(date) => setStartDate(date)}
          locked={true} // Update startDate state
        />
      </div>
      <div className="date-cont">
        End Date
        <StaticDatePickerLandscape 
          type={"Ends"} 
          onDateChange={(date) => setExpireDate(date)} // Update expireDate state
          locked={false}/>
      </div>
    </div>
        <div className="inp">
          <div className="saif">
            <label className="input">
              <input className="input__field" type="number" placeholder=" " onChange={(e) =>{ setInitialPrice((e.target as HTMLInputElement).value); reservedAmount}} />
              <span className="input__label">Initial Price</span>
            </label>
          </div>
        </div>
        <div className="inp">
          <div className="saif">
            <label className="input">
              <input className="input__field" type="number" placeholder=" " onChange={(e) => setMinBid((e.target as HTMLInputElement).value)}/>
              <span className="input__label">Min Bid</span>
            </label>
          </div>
        </div>
        <div className="fs">
          <button className="next back btn btn-danger" onClick={test}>
            Back
          </button>
          <button className="next back btn btn-success" onClick={validateAndProcessData}>
            Publish
          </button>
          {isPopupOpen && (
            <PopupMMessage 
  closePopup={closePopup} 
  order={order()} 
  description={productTitle}
  amount={reservedAmount} 
  customFunction={postData} 
/>
          )}
        </div>
      </form>
      {isPopupOpen5 && (
       <PopupMMessage
                      closePopup={console.log}
                      order={"Loading"}
                      amount={"0"}
                      description={""}
                      customFunction={console.log}
                    />)}
    </div>
  );
}

export default AddAuction;
