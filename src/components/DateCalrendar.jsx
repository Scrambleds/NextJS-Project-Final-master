"use client"
import React, { useState,forwardRef } from 'react'
import { registerLocale, setDefaultLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from '@iconify/react';
import th from 'date-fns/locale/th';
registerLocale('th', th)

function CustomInput({ value, onClick }, ref) {
  return (
    <div className="join">
      <input
        type="text"
        className="join-item input input-bordered w-[230px] ml-5 xl:ml-1 lg:ml-5 md:ml-5 sm:ml-5"
        value={value}
        onClick={onClick}
        name='DatePicker'
        readOnly
        ref={ref}
      />
      <div className="join-item input input-bordered inline-flex items-center align-middle">
        <Icon icon="mdi:calendar" width={35} height={35} />
      </div>
    </div>
  );
}

// Wrap the CustomInput component with forwardRef
const ForwardedCustomInput = forwardRef(CustomInput);

export default function DateCalendar() {
  const currentYear = new Date().getFullYear() + 543;
  const [startDate, setStartDate] = useState(new Date(currentYear - 5, 0, 1));
  const [endDate, setEndDate] = useState(new Date(currentYear, 0, 1));

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <DatePicker
      selectsRange={true}
      onChange={onDateChange}
      dateFormat="yyyy"
      placeholderText='เลือกปีการศึกษา'
      startDate={startDate}
      endDate={endDate}
      locale='th'
      yearDropdownItemNumber={10} // Optional: Number of years to display in the year dropdown
      customInput={<ForwardedCustomInput />}
      showYearPicker={true}
      showYearDropdown={true} // Optional: Display a dropdown for selecting the year
    />
  );
}