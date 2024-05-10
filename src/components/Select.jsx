import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function CustomSelect({handleOnChange, data }) {
  return (
    <Select
      id="courseName"
      items={data}
      placeholder="เลือกวิชา"
      className="xl:w-[350px]"
      onChange={handleOnChange}
      labelPlacement="outside"
      classNames={{
        base: "max-w-xs",
        trigger:
          "h-12 bg-base-100 border border-gray-400 rounded-md px-4 flex items-center xl:w-full",
        // Add your Tailwind classes here
        // Example:
        // menu: "bg-gray-100 border border-gray-300",
      }}
      name="courseName"
      aria-labelledby={`${"courseName"}-label`} // ใช้ aria-labelledby
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <div className="flex flex-col">
              <span>{item.data.courseName}</span>
            </div>
          </div>
        ));
      }}
    >
      {(user) => (
        <SelectItem key={user.courseName} textValue={user.courseName}>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <span className="text-small">{user.courseName}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
