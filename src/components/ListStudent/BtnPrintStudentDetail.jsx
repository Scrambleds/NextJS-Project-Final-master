"use client";
import { Icon } from "@iconify/react";
import Papa from "papaparse";
import React from "react";
import { GenStudentDeatailExcel } from "../../function/GenExcel";

export default function BtnPrintStudentDetail({
    id,
    listItem,
    listSumGrade
}) {

  const handleStudentDetailExport = async() => {
    try {
      const response = await GenStudentDeatailExcel(listItem,listSumGrade,id);
       // Create a Blob from the array buffer received in the response
       const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

       // Create a download link
       const downloadLink = document.createElement('a');
       const objectURL = URL.createObjectURL(blob);
 
       downloadLink.href = objectURL;
       downloadLink.download = 'ข้อมูลรายนิสิต ' + id + '.xlsx';
 
       // Append the link to the document and trigger a click to start the download
       document.body.appendChild(downloadLink);
       downloadLink.click();
 
       // Clean up by removing the link and revoking the object URL
       document.body.removeChild(downloadLink);
       URL.revokeObjectURL(objectURL);
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  return (
    <button
    onClick={handleStudentDetailExport}
    className="btn bg-blue-500 text-white w-[220px] max-x-lg mr-5"
  >
    <Icon
      icon="material-symbols:print-outline"
      className="text-white text-lg"
    />
    <>พิมพ์รายระเอียดของนิสิต</>
  </button>
  );
}
