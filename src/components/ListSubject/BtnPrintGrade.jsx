"use client";
import { Icon } from "@iconify/react";
import Papa from "papaparse";
import React from "react";

export default function BtnPrintGrade({
    id,
    listGrade
}) {

  const handleGradeCSV = () => {
    const customHeader = ['A', 'B+', 'B', 'C+','C','D+','D','I','W','F','Total'];
  
    const csvData =
      "\ufeff" +
      Papa.unparse({
        fields: customHeader,
        data: listGrade.map((grade, index) => [
          grade.a ?? "0" ,
          grade.bplus ?? "0",
          grade.b ?? "0",
          grade.cplus ?? "0",
          grade.c ?? "0",
          grade.dplus ?? "0",
          grade.d ?? "0",
          grade.i ?? "0",
          grade.w ?? "0",
          grade.f ?? "0",
          grade.total ?? "0"
        ]),
      }, {
        quotes: true,
        delimiter: ",",
        header: true,
        encoding: "UTF-8",
      });
  
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `รายการผลรวมเกรดวิชา ${id}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
    onClick={handleGradeCSV}
    className="btn bg-gray-500 text-white w-[220px] max-x-lg mr-5"
  >
    <Icon
      icon="pepicons-pop:file"
      className="text-white text-lg"
    />
    <>พิมพ์ผลรวมเกรดวิชา</>
  </button>
  );
}
