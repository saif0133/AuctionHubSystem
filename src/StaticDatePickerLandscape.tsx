// import * as React from "react";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
// import dayjs, { Dayjs } from "dayjs";
// import 'dayjs/locale/en-gb'; // Import locale for formatting

// interface DatePickerProps {
//   type: string; // Type to be appended to the date
//   onDateChange: (formattedDate: string) => void; // Callback to pass the formatted date to the parent
// }

// const formatDate = (date: Dayjs | null): string => {
//   if (!date) return '';
//   return date.format('DD-MM-YYYY HH:mm'); // Format the date as '30-08-2024 23:00'
// };

// export default function StaticDatePickerLandscape({ type, onDateChange }: DatePickerProps) {
//   const [value, setValue] = React.useState<Dayjs | null>(dayjs());

//   const today = dayjs();

//   const handleDateChange = (newValue: Dayjs | null) => {
//     if (newValue) {
//       const formatted = `${formatDate(newValue)}`;
//       onDateChange(formatted); // Pass the formatted date to the parent
//     }
//     setValue(newValue); // Update state if needed
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <StaticDatePicker
//         orientation="landscape"
//         openTo="day"
//         value={value}
//         onChange={handleDateChange}
//         shouldDisableDate={(date) => date.isBefore(today, 'day')} // Disable past dates
//       />
//     </LocalizationProvider>
//   );
// }

import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/en-gb'; // Import locale for formatting
import { makeStyles } from '@mui/styles';
import { Height } from "devextreme-react/cjs/chart";

interface DatePickerProps {
  type: string; // Type to be appended to the date
  onDateChange: (formattedDate: string) => void; // Callback to pass the formatted date to the parent
  locked: boolean; // Indicates whether the date picker is locked or not
}

const formatDate = (date: Dayjs | null): string => {
  if (!date) return '';
  return date.format('DD-MM-YYYY HH:mm'); // Format the date as '30-08-2024 23:00'
};

const useStyles = makeStyles({
  container: {
    position: 'relative',
    '&:hover $overlay': {
      opacity: 1,
    },
  },
  overlay: {
    display:"flex",
    flexDirection:"column",
    position: 'absolute',
    top: -40,
            left: -15,
            right: -15,
            bottom: -15,
    borderRadius: '50px',
    backgroundColor: 'rgba(100, 100, 100, 0.6)', // 60% opacity
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    opacity: 0,
    transition: 'opacity 0.3s',
    pointerEvents: 'none',
  },
});

export default function StaticDatePickerLandscape({ type, onDateChange, locked }: DatePickerProps) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const today = dayjs();
  const classes = useStyles();

  const handleDateChange = (newValue: Dayjs | null) => {
    if (!locked && newValue) {
      const formatted = `${formatDate(newValue)}`;
      onDateChange(formatted); // Pass the formatted date to the parent
      setValue(newValue); // Update state if needed
    }
  };

  return (
    <div className={classes.container}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          orientation="landscape"
          openTo="day"
          value={value}
          onChange={handleDateChange}
          shouldDisableDate={(date) => date.isBefore(today, 'day')} // Disable past dates
          disabled={locked} // Disable date picker if locked
        />
      </LocalizationProvider>

      {locked && (
        <div className={classes.overlay}>
          <img
  src="https://cdn-icons-png.flaticon.com/512/3649/3649801.png"
  alt=""
  style={{ height: '150px' , width:'150px' , marginBottom:"50px" }} // Correct usage of inline style in React
/>

          This feature is for premium accounts only
        </div>
      )}
    </div>
  );
}
