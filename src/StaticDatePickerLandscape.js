import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
export default function StaticDatePickerLandscape({ type }) {
    const [value, setValue] = React.useState(dayjs());
    return (_jsx(LocalizationProvider, { dateAdapter: AdapterDayjs, children: _jsx(StaticDatePicker, { orientation: "landscape", openTo: "day", value: value, onChange: (newValue) => {
                console.log(newValue?.toDate().toLocaleDateString() + " " + type);
            } }) }));
}
