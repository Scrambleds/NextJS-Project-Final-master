"use client";
import React, { useEffect, useState } from "react";
import DateCalendar from "../../components/DateCalrendar.jsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation.js";
import { useDebouncedCallback } from "use-debounce";

export default function FormDate() {
  const [searchDatePicker, setsearchDatePicker] = useState("");
  const serchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const handleFormSubmit = (formData) => {
    setIsLoading(true);

    // Simulate an asynchronous operation with a timeout
    setTimeout(() => {
      // Hide loading spinner after the timeout
      setIsLoading(false);
    }, 2000);

    setsearchDatePicker("");
    const { DatePicker } = Object.fromEntries(formData);
    setsearchDatePicker(DatePicker);
  };

  useEffect(() => {
    handleSearch();
  }, [searchDatePicker]);

  const handleSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams(serchParams);

    if (searchDatePicker) {
      params.set("DateRange", searchDatePicker);
    } else {
      params.delete("DateRange");
    }
    replace(`${pathname}?${params}`);
  }, 400);
  return (
    <form action={handleFormSubmit}>
      <div className="flex flex-col gap-2 mt-2">
        <div className="xl:flex xl:gap-5 flex-row">
          <div className="flex items-center mb-2 gap-4">
            <div className="flex items-center">
              <label
                htmlFor="courseName"
                className="text-black text-lg flex-shrink-0 ml-5"
              >
                เลือกปีการศึกษา
              </label>
            </div>
            <div className="flex items-center">
              <DateCalendar />
            </div>
          </div>
          <div className="flex items-center mb-2 gap-4">
            <button
              className="btn btn-primary w-full text-white px-4 py-2 rounded-lg xl:w-32 xl:max-w-md"
              type="submit"
              disabled={isLoading} // Disable the button while loading
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner bg-black"></span>
                  <p className="text-black">loading</p>
                </>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
