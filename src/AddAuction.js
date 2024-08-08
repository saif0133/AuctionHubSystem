import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
//import DatePicker from "./components/DatePicker";
//import DatePickerComponent from "./DatePickerComponent";
import StaticDatePickerLandscape from "./StaticDatePickerLandscape";
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
        if (userPayment)
            return "publishFees";
        else
            return "noPayment";
    };
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = (event) => {
        event.preventDefault();
        setIsPopupOpen(true);
    };
    const closePopup = () => {
        setIsPopupOpen(false);
    };
    const [Title, setTitle] = useState(Title1);
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    const test = (e) => {
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
            }
            else {
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
                const target = event.target;
                const file = target.files?.[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const parentWrapper = target.closest(".upload-btn-wrapper");
                        if (parentWrapper) {
                            const img = parentWrapper.querySelector(".upload");
                            if (img) {
                                img.src = e.target?.result;
                                img.alt = "Uploaded Image";
                                console.log("Image source updated:", img.src);
                            }
                            else {
                                console.error("Image element not found.");
                            }
                        }
                    };
                    reader.readAsDataURL(file);
                }
                else {
                    console.error("No file selected.");
                }
            });
        });
    }, []);
    return (_jsxs("div", { className: "testmain", children: [_jsxs("div", { className: "formTitle", id: "formTitle", children: [" ", Title] }), _jsx("div", { className: "forma", children: _jsxs("form", { className: "fromPage", id: "fromPage1", children: [_jsxs("div", { className: "fromPage1", children: [_jsx("div", { className: "inp", children: _jsx("div", { className: "saif", children: _jsxs("label", { className: "input", children: [_jsx("input", { className: "input__field", type: "text", placeholder: " " }), _jsx("span", { className: "input__label", children: "Product Name" })] }) }) }), _jsx("div", { className: "inp", children: _jsx("div", { className: "saif", children: _jsxs("label", { className: "input", children: [_jsx("textarea", { className: "input__field", placeholder: " " }), _jsx("span", { className: "input__label", children: "Product Description" })] }) }) }), _jsxs("select", { name: "", id: "", defaultValue: "", className: "form-select", children: [_jsx("option", { value: "", disabled: true, children: "Category" }), _jsx("option", { value: "", children: "1" }), _jsx("option", { value: "", children: "2" }), _jsx("option", { value: "", children: "3" }), _jsx("option", { value: "", children: "4" })] }), _jsxs("div", { className: "additionalData", id: "additionalData", children: [_jsx("div", { className: "data-group", children: "Additional info" }), _jsxs("div", { className: "additionalData-input", children: [_jsxs("select", { name: "", id: "", defaultValue: "", className: "form-select", children: [_jsx("option", { value: "", disabled: true, children: "Phone Type" }), _jsx("option", { value: "iphone", children: "iphone" }), _jsx("option", { value: "samsung", children: "samsung" }), _jsx("option", { value: "hp", children: "hp" }), _jsx("option", { value: "ssd", children: "ssd" })] }), _jsx("input", { type: "text", placeholder: "test " }), _jsx("input", { type: "text", placeholder: "test " }), _jsx("input", { type: "text", placeholder: "test " }), _jsx("input", { type: "text", placeholder: "test " }), _jsx("input", { type: "text", placeholder: "test " }), _jsx("input", { type: "text", placeholder: "test " }), _jsx("input", { type: "text", placeholder: "test " }), _jsx("input", { type: "text", placeholder: "test " }), _jsx("input", { type: "text", placeholder: "test " })] })] }), _jsx("button", { className: "next btn btn-success", onClick: test, children: "Next" })] }), _jsxs("div", { className: "addImages", children: [_jsx("div", { className: "Product-Status", children: "Product Status" }), _jsxs("div", { className: "type", children: [_jsxs("div", { children: [_jsx("input", { type: "radio", className: "btn-check btn", name: "options-outlined", id: "success-outlined", autoComplete: "off", defaultChecked: true }), _jsx("label", { className: "btn btn-outline-success", htmlFor: "success-outlined", children: "New" })] }), _jsxs("div", { children: [_jsx("input", { type: "radio", className: "btn-check btn", name: "options-outlined", id: "danger-outlined", autoComplete: "off" }), _jsx("label", { className: "btn btn-outline-danger", htmlFor: "danger-outlined", children: "Used" })] })] }), _jsx("div", { className: "imageT", children: "Product Image" }), _jsxs("div", { className: "upload-btn-wrapper main", id: "upload-btn-wrapper", children: [_jsx("img", { src: "https://seekicon.com/free-icon-download/cloud-upload-o_1.svg", className: "upload", alt: "Upload Icon" }), _jsx("input", { type: "file", name: "myfile", id: "myfile", className: "myfile", "aria-errormessage": "ssa", accept: "image/*" })] }), _jsx("div", { className: "imageT", children: "Product Gallery" }), _jsxs("div", { className: "gallery", children: [_jsxs("div", { className: "upload-btn-wrapper", children: [_jsx("img", { src: "https://seekicon.com/free-icon-download/cloud-upload-o_1.svg", className: "upload", alt: "Upload Icon" }), _jsx("input", { type: "file", name: "myfile", className: "myfile", accept: "image/*" })] }), _jsxs("div", { className: "upload-btn-wrapper", children: [_jsx("img", { src: "https://seekicon.com/free-icon-download/cloud-upload-o_1.svg", className: "upload", alt: "Upload Icon" }), _jsx("input", { type: "file", name: "myfile", className: "myfile", "aria-errormessage": "ssa", accept: "image/*" })] }), _jsxs("div", { className: "upload-btn-wrapper", children: [_jsx("img", { src: "https://seekicon.com/free-icon-download/cloud-upload-o_1.svg", className: "upload", alt: "Upload Icon" }), _jsx("input", { type: "file", name: "myfile", className: "myfile", "aria-errormessage": "ssa", accept: "image/*" })] }), _jsxs("div", { className: "upload-btn-wrapper", children: [_jsx("img", { src: "https://seekicon.com/free-icon-download/cloud-upload-o_1.svg", className: "upload", alt: "Upload Icon" }), _jsx("input", { type: "file", name: "myfile", className: "myfile", "aria-errormessage": "ssa", accept: "image/*" })] })] }), _jsxs("select", { name: "", defaultValue: "", id: "", className: "form-select", children: [_jsx("option", { value: "", disabled: true, children: "Location" }), _jsx("option", { value: "Amman", children: "Amman" }), _jsx("option", { value: "Irbid", children: "Irbid" }), _jsx("option", { value: "Zarqa", children: "Zarqa" }), _jsx("option", { value: "Aqaba", children: "Aqaba" }), _jsx("option", { value: "Salt", children: "Salt" }), _jsx("option", { value: "Madaba", children: "Madaba" }), _jsx("option", { value: "Mafraq", children: "Mafraq" }), _jsx("option", { value: "Karak", children: "Karak" }), _jsx("option", { value: "Tafilah", children: "Tafilah" }), _jsx("option", { value: "Ma'an", children: "Ma'an" }), _jsx("option", { value: "Jerash", children: "Jerash" }), _jsx("option", { value: "Ajloun", children: "Ajloun" }), _jsx("option", { value: "Dead Sea", children: "Dead Sea" })] })] })] }) }), _jsxs("form", { action: "", className: "formb", id: "formb", children: [" ", _jsxs("div", { className: "setDate", children: [_jsxs("div", { className: "date-cont", children: ["Start Date", _jsx(StaticDatePickerLandscape, { type: "Start" })] }), _jsxs("div", { className: "date-cont", children: ["End Date", _jsx(StaticDatePickerLandscape, { type: "Ends" })] })] }), _jsx("div", { className: "inp", children: _jsx("div", { className: "saif", children: _jsxs("label", { className: "input", children: [_jsx("input", { className: "input__field", type: "number", placeholder: " " }), _jsx("span", { className: "input__label", children: "Initial Price" })] }) }) }), _jsx("div", { className: "inp", children: _jsx("div", { className: "saif", children: _jsxs("label", { className: "input", children: [_jsx("input", { className: "input__field", type: "number", placeholder: " " }), _jsx("span", { className: "input__label", children: "Min Bid" })] }) }) }), _jsxs("div", { className: "fs", children: [_jsx("button", { className: "next back btn btn-danger", onClick: test, children: "Back" }), _jsx("button", { className: "next back btn btn-success", onClick: openPopup, children: "Publish" }), isPopupOpen && (_jsx(PopupMMessage, { closePopup: closePopup, order: order(), amount: 0 }))] })] })] }));
}
export default AddAuction;
