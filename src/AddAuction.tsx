import { useEffect, useState } from "react";
//import DatePicker from "./components/DatePicker";
//import DatePickerComponent from "./DatePickerComponent";
import StaticDatePickerLandscape from "./StaticDatePickerLandscape";
import { ClickAwayListener } from "@mui/material";
import PopupMMessage from "./components/PopupMessage";
let count = 1;
/*async function postData() {
  const url = 'https://example.com/api/endpoint'; // Replace with your API endpoint

  // Data to be sent in the POST request
  const data = {
    name: "John Doe",
    image: "https://example.com/path/to/image.jpg"
  };

  try {
    const response = await fetch(url, {
      method: 'POST', // Specify the HTTP method
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify(data), // Convert the data to JSON format
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json(); // Parse the JSON response
    console.log('Response:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}
  */
function AddAuction() {
  let Title1 = "Product Info";
  let Title2 = "Auction Info";

  const userPayment = true;

  const order = () => {
    if (userPayment) return "publishFees";
    else return "noPayment";
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [Title, setTitle] = useState<string>(Title1);
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  const test = (e: React.MouseEvent) => {
    const a = document.getElementById("fromPage1");
    const b = document.getElementById("formb");
    const c = document.getElementById("formTitle");

    console.log(count);
    e.preventDefault();

    if (a && b && c) {
      console.log("test" + count);
      if (count % 2 === 0) {
        a.style.display = "flex";
        b.style.display = "none";
        a.style.transition = "1s";
        b.style.transition = "1s";
        setTitle(Title1);
        scrollToTop();
        count++;
      } else {
        a.style.display = "none";
        b.style.display = "flex";
        a.style.transition = "1s";
        b.style.transition = "1s";
        setTitle(Title2);
        scrollToTop();
        count++;
      }
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
              const img = parentWrapper.querySelector(
                ".upload"
              ) as HTMLImageElement;
              if (img) {
                img.src = e.target?.result as string;
                img.alt = "Uploaded Image";
                console.log("Image source updated:", img.src);
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

            <select name="" id="" defaultValue={""} className="form-select">
              <option value="" disabled>
                Category
              </option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
            </select>

            <div className="additionalData" id="additionalData">
              <div className="data-group">Additional info</div>
              <div className="additionalData-input">
                <select name="" id="" defaultValue={""} className="form-select">
                  <option value="" disabled>
                    Phone Type
                  </option>
                  <option value="iphone">iphone</option>
                  <option value="samsung">samsung</option>
                  <option value="hp">hp</option>
                  <option value="ssd">ssd</option>
                </select>

                <input type="text" placeholder="test " />
                <input type="text" placeholder="test " />
                <input type="text" placeholder="test " />
                <input type="text" placeholder="test " />
                <input type="text" placeholder="test " />
                <input type="text" placeholder="test " />
                <input type="text" placeholder="test " />
                <input type="text" placeholder="test " />
                <input type="text" placeholder="test " />
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
                  type="file"
                  name="myfile"
                  className="myfile"
                  accept="image/*"
                />
              </div>
              <div className="upload-btn-wrapper">
                <img
                  src="https://seekicon.com/free-icon-download/cloud-upload-o_1.svg"
                  className="upload"
                  alt="Upload Icon"
                />
                <input
                  type="file"
                  name="myfile"
                  className="myfile"
                  aria-errormessage="ssa"
                  accept="image/*"
                />
              </div>
              <div className="upload-btn-wrapper">
                <img
                  src="https://seekicon.com/free-icon-download/cloud-upload-o_1.svg"
                  className="upload"
                  alt="Upload Icon"
                />
                <input
                  type="file"
                  name="myfile"
                  className="myfile"
                  aria-errormessage="ssa"
                  accept="image/*"
                />
              </div>
              <div className="upload-btn-wrapper">
                <img
                  src="https://seekicon.com/free-icon-download/cloud-upload-o_1.svg"
                  className="upload"
                  alt="Upload Icon"
                />
                <input
                  type="file"
                  name="myfile"
                  className="myfile"
                  aria-errormessage="ssa"
                  accept="image/*"
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
