"use client";
import { Icon } from "@iconify/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Slider } from "@nextui-org/react";

export default function SearchKist({
  placeholder1,
  placeholder2,
  yearEducation,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [additionalQuery, setAdditionalQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const uniqueYears = [...new Set(yearEducation)];

  const serchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    handleSearch();
  }, [searchQuery, additionalQuery, selectedYear]); // Added selectedYear to the dependencies

  const handleSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams(serchParams);

    const currentPage = params.get("page") || 1;

    if (searchQuery) {
      params.set("ImportHeaderNo", searchQuery);
    } else {
      params.delete("ImportHeaderNo");
    }

    if (additionalQuery) {
      params.set("CourseID", additionalQuery);
    } else {
      params.delete("CourseID");
    }

    if (selectedYear) {
      params.set("YearEducation", selectedYear);
    } else {
      params.delete("YearEducation");
    }

    params.set("page", currentPage);
    replace(`${pathname}?${params}`);
  }, 200);

  return (
    <div className="flex flex-wrap justify-center items-center">
      <div className="flex gap-2">
        <div className="relative ml-2">
          <Icon
            icon="material-symbols:search"
            width={25}
            height={25}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder={placeholder1}
            value={searchQuery}
            className="input input-bordered rounded-lg pr-10 py-2 w-full max-w-sm"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative ml-2">
          <Icon
            icon="material-symbols:search"
            width={25}
            height={25}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder={placeholder2}
            value={additionalQuery}
            className="input input-bordered rounded-lg pr-10 py-2 w-full max-w-sm"
            onChange={(e) => setAdditionalQuery(e.target.value)}
          />
        </div>
        <div className="relative ml-2">
            <select
              id="yearEducation"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="select select-bordered rounded-lg pr-10 py-2 w-full max-w-sm"
              name="yearEducation"
            >
              <option value={""}>ทุกปีการศึกษา</option>
              {uniqueYears.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
        </div>
      </div>
    </div>
  );
}
