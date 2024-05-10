"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const expectedColumnPattern = ["NO", "ID", "NAME", "GRADE"];


//เช็ค collumn name ว่าตรงกับ pattern ไหม
const validateColumnNames = (worksheet) => {
  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  const columnNames = [];

  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cellAddress = { r: range.s.r, c: C };
    const cellRef = XLSX.utils.encode_cell(cellAddress);
    const columnName = worksheet[cellRef]?.v;
    columnNames.push(columnName);
  }

  const uppercaseColumnNames = columnNames.map((name) =>
    name ? name.toUpperCase() : null
  );

  return expectedColumnPattern.every(
    (expectedColumnName, index) =>
      uppercaseColumnNames[index] === expectedColumnName.toUpperCase()
  );
};

export default function Test() {
  const [excelData, setExcelData] = useState([]);
  const [error, setError] = useState(null);


  //เป็นการอ่านไฟล์ของ excel โดยใช้ library XLSX
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return; // No file selected
    }

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension !== "xlsx" && fileExtension !== "xls") {
      toast.error("Please upload a valid Excel file (XLSX or XLS).");
      return;
    }

    const reader = new FileReader();
    //ใช้ไฟล์ reader เจาะเข้าไปอ่านไฟล์ excel แล้วเก็บข้อมูลเป้น array
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array", cellDates: true });

      // Assuming only one sheet is present in the Excel file
      const sheetName = workbook.SheetNames[0]; //ลำดับ sheetname
      const sheet = workbook.Sheets[sheetName]; //name

      // Validate column names
      if (!validateColumnNames(sheet)) {
        toast.error("Invalid column names. Expected: NO, ID, NAME, GRADE");
        setExcelData([]);
        setError("Invalid column names");
        return;
      }

      // Parse the sheet data to JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        raw: false,
        dateNF: "mm/dd/yyyy",
      });

      // Convert keys to uppercase for consistency
      const formattedData = jsonData.map((rowData) => {
        const formattedRow = {};
        for (const key in rowData) {
          const formattedKey = key.toUpperCase();
          formattedRow[formattedKey] = rowData[key];
        }
        return formattedRow;
      });

      setExcelData(formattedData);
      setError(null);
    };

    reader.readAsArrayBuffer(file);
  };

  const formatDateWithTimeZone = (date) => {
    return date.toString();
  };

  return (
    <div className="App">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {excelData.length > 0 && (
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              {Object.keys(excelData[0]).map((key) => (
                <th
                  className="text-center w-10 p-3 text-lg font-semibold tracking-wide sticky top-0 bg-gray-50"
                  key={key}
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {excelData.map((individualExcelData, index) => (
              <tr className="bg-white" key={index}>
                {Object.keys(individualExcelData).map((key) => (
                  <td
                    className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                    key={key}
                  >
                    {key.toLowerCase().includes("date") &&
                    individualExcelData[key] instanceof Date
                      ? formatDateWithTimeZone(individualExcelData[key])
                      : individualExcelData[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

