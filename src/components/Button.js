import { jsx as _jsx } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Button({ icon, onClick2 }) {
    return (_jsx("button", { className: "search-button", onClick: () => onClick2(""), children: _jsx(FontAwesomeIcon, { icon: icon }) }));
}
export default Button;
