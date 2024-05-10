"use client";
import { Icon } from "@iconify/react";
import Papa from "papaparse";
import React from "react";
import * as XLSX from "xlsx";
import { GenExcelHome } from "../function/GenExcel";
import axios from "axios";

export default function BtnPrintHomepage({ itemList }) {
  const handleHomepageExport = async () => {
    try {
      const response = await GenExcelHome(itemList);

      // Create a Blob from the array buffer received in the response
      const blob = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a download link
      const downloadLink = document.createElement("a");
      const objectURL = URL.createObjectURL(blob);

      downloadLink.href = objectURL;
      downloadLink.download = "ข้อมูลตาราง " + ".xlsx";

      // Append the link to the document and trigger a click to start the download
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Clean up by removing the link and revoking the object URL
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(objectURL);
    } catch (error) {
      console.error("Error generating Excel:", error);
    }
  };

  return (
    <>
      {itemList.length >= 1 ? (
        <button
          onClick={handleHomepageExport}
          className="btn bg-blue-500 text-white w-[220px] max-x-lg mr-5"
        >
          <Icon
            icon="material-symbols:print-outline"
            className="text-white text-lg"
          />
          <>พิมพ์ข้อมูลตาราง</>
        </button>
      ) : (
        <button
          disabled={true}
          className="btn bg-blue-500 text-white w-[220px] max-x-lg mr-5"
        >
          <Icon
            icon="material-symbols:print-outline"
            className="text-gray-500 text-lg"
          />
          <>พิมพ์ข้อมูลตาราง</>
        </button>
      )}
    </>
  );
}
