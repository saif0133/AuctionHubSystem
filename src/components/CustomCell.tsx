import React from "react";

export function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function getCellCssClass({ date, view }: { date: Date; view: string }) {
  let cssClass = "";
  const holidays = [
    [1, 0], // January 1
    [4, 6], // July 4
    [25, 11], // December 25
  ];

  if (view === "month") {
    if (!date) {
      cssClass = "week-number";
    } else {
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

function CustomCell({ data: cell }: { data: any }) {
  const { text } = cell;

  const className = getCellCssClass(cell);

  return <span className={className}>{text}</span>;
}

export default CustomCell;
