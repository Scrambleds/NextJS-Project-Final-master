"use client";
import { Icon } from "@iconify/react";
import Papa from "papaparse";
import React from "react";
import * as XLSX from 'xlsx';
import { GenExcel } from '../../function/GenExcel'
import axios from "axios";

export default function BtnPrintSubject({
    id,
    listItem,
    listGrade
}) {

  const handleSubjectExport = async () => {
    try {
      const response = await GenExcel(listItem,listGrade,id);

      // Create a Blob from the array buffer received in the response
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Create a download link
      const downloadLink = document.createElement('a');
      const objectURL = URL.createObjectURL(blob);

      downloadLink.href = objectURL;
      downloadLink.download = 'ข้อมูลรายวิชา ' + decodeURIComponent(id) + '.xlsx';

      // Append the link to the document and trigger a click to start the download
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Clean up by removing the link and revoking the object URL
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(objectURL);

    } catch (error) {
      console.error('Error generating Excel:', error);
    }
  };
  

  return (
    <button
      onClick={handleSubjectExport}
      className="btn bg-blue-500 text-white w-[220px] max-x-lg mr-5"
    >
      <Icon
        icon="material-symbols:print-outline"
        className="text-white text-lg"
      />
      <>พิมพ์ข้อมูลรายวิชา</>
    </button>
  );
}
