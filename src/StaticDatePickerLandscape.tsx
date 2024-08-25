import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs, { Dayjs } from "dayjs";
interface DatePickerProps {
  type: String;
}

export default function StaticDatePickerLandscape({ type }: DatePickerProps) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={value}
        onChange={(newValue: Dayjs | null) => {
          console.log(newValue?.toDate().toDateString() + " " + type);
        }}
      />
    </LocalizationProvider>
  );
}
