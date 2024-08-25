import { useEffect, useState } from "react";
import StaticDatePickerLandscape from "./StaticDatePickerLandscape";
import PopupMMessage from "./components/PopupMessage";

let count = 1;

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
  const [startDate, setStartDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [location, setLocation] = useState("");
  const [minBid, setMinBid] = useState("");
  const [initialPrice, setInitialPrice] = useState("");
  const [attributeValues, setAttributeValues] = useState<Record<string, string>>({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [Title, setTitle] = useState("Product Info");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const userToken = localStorage.getItem('authToken') || '';
  const userPayment = true;

  const order = () => {
    return userPayment ? "bidFees" : "noPayment";
  };

  const postData = async () => {
    const url = 'http://localhost:8080/auction/create'; // Replace with your API endpoint
  
    // Data to be sent in the POST request
    const data = {
      expireDate:"30-08-2024 23:00",
      item: {
        name: productTitle,
        description: "",
        images: [
          {
            name: "imgName",
            type: "jpg",
            imageUrl: "www.kbb.com/wp-content/uploads/2022/08/2022-mercedes-amg-eqs-front-left-3qtr.jpg?w=918"
          }
        ],
        itemStatus,
        category: {
          id: "1"
        },
        // categoryAttributes: attributeValues
        color: "red",
        model: "asp"
      },
      location,
      minBid: parseFloat(minBid),
      initialPrice: parseFloat(initialPrice)
    };
  
 
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}` // Add Authorization header
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Response:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
  
    // Update the list of files
    setImageFiles(prevFiles => [...prevFiles, ...files]);
  
    // Generate URLs for the new files and update the list of image URLs
    const newImageUrls = files.map(file => URL.createObjectURL(file));
    setImageUrls(prevUrls => [...prevUrls, ...newImageUrls]);
    console.log(imageUrls)
  };
  


  const openPopup = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setIsPopupOpen(true);
    postData(); // Call postData when the popup opens
  };

  const closePopup = () => {
    setIsPopupOpen(false);
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

  return (
    
    <div className="testmain">
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
                  <input className="input__field" type="text" placeholder=" " />
                  <span className="input__label">Product Name</span>
                </label>
              </div>
            </div>
            <div className="inp">
              <div className="saif">
                <label className="input">
                  <textarea className="input__field" placeholder=" " />
                  <span className="input__label">Product Description</span>
                </label>
              </div>
            </div>

            <select
              name=""
              id=""
              className="form-select"
              value={selectedCategory || ''}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>
                Category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
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
            <select name="" defaultValue={""} id="" className="form-select">
              <option value="" disabled>
                Location
              </option>
              <option value="Amman">Amman</option>
              <option value="Irbid">Irbid</option>
              <option value="Zarqa">Zarqa</option>
              <option value="Aqaba">Aqaba</option>
              <option value="Salt">Salt</option>
              <option value="Madaba">Madaba</option>
              <option value="Mafraq">Mafraq</option>
              <option value="Karak">Karak</option>
              <option value="Tafilah">Tafilah</option>
              <option value="Ma'an">Ma'an</option>
              <option value="Jerash">Jerash</option>
              <option value="Ajloun">Ajloun</option>
              <option value="Dead Sea">Dead Sea</option>
            </select>
          </div>
        </form>
      </div>
      <form action="" className="formb" id="formb">
        {" "}
        <div className="setDate">
          <div className="date-cont">
            Start Date
            <StaticDatePickerLandscape type={"Start"} />
          </div>
          <div className="date-cont">
            End Date
            <StaticDatePickerLandscape type={"Ends"} />
          </div>
        </div>
        <div className="inp">
          <div className="saif">
            <label className="input">
              <input className="input__field" type="number" placeholder=" " />
              <span className="input__label">Initial Price</span>
            </label>
          </div>
        </div>
        <div className="inp">
          <div className="saif">
            <label className="input">
              <input className="input__field" type="number" placeholder=" " />
              <span className="input__label">Min Bid</span>
            </label>
          </div>
        </div>
        <div className="fs">
          <button className="next back btn btn-danger" onClick={test}>
            Back
          </button>
          <button className="next back btn btn-success" onClick={openPopup}>
            Publish
          </button>
          {isPopupOpen && (
            <PopupMMessage closePopup={closePopup} order={order()} amount={0} />
          )}
        </div>
      </form>
    </div>
  );
}

export default AddAuction;
