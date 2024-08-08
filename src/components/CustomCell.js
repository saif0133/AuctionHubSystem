import { jsx as _jsx } from "react/jsx-runtime";
export function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
}
function getCellCssClass({ date, view }) {
    let cssClass = "";
    const holidays = [
        [1, 0],
        [4, 6],
        [25, 11], // December 25
    ];
    if (view === "month") {
        if (!date) {
            cssClass = "week-number";
        }
        else {
            if (isWeekend(date)) {
                cssClass = "weekend";
            }
            holidays.forEach((item) => {
                if (date.getDate() === item[0] && date.getMonth() === item[1]) {
                    cssClass = "holiday";
                }
            });
        }
    }
    return cssClass;
}
function CustomCell({ data: cell }) {
    const { text } = cell;
    const className = getCellCssClass(cell);
    return _jsx("span", { className: className, children: text });
}
export default CustomCell;
