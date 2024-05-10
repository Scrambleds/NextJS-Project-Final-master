"use client";
import { Icon } from "@iconify/react";
import Papa from "papaparse";
import React from "react";

export default function BtnPrintSumStudent({ id, listSumGrade }) {
  const handleSumStudentCSV = () => {
    const customHeader = [
      "id",
      "name",
      "A",
      "B+",
      "B",
      "C+",
      "C",
      "D+",
      "D",
      "I",
      "F",
      "W",
      "Total",
    ];

    const csvData =
      "\ufeff" +
      Papa.unparse(
        {
          fields: customHeader,
          data: [
            listSumGrade.id ?? "",
            listSumGrade.name ?? "",
            listSumGrade.a ?? "0",
            listSumGrade.bPlus ?? "0",
            listSumGrade.b ?? "0",
            listSumGrade.cPlus ?? "0",
            listSumGrade.c ?? "0",
            listSumGrade.dPlus ?? "0",
            listSumGrade.d ?? "0",
            listSumGrade.i ?? "0",
            listSumGrade.f ?? "0",
            listSumGrade.w ?? "0",
            listSumGrade.total ?? "0",
          ],
        },
        {
          quotes: true,
          delimiter: ",",
          header: true,
          encoding: "UTF-8",
        }
      );

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `รายการผลรวมเกรดของนิสิต ${id}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleSumStudentCSV}
      className="btn bg-gray-500 text-white w-[220px] max-x-lg mr-5"
    >
      <Icon icon="pepicons-pop:file" className="text-white text-lg" />
      <>พิมพ์ผลรวมเกรดนิสิต</>
    </button>
  );
}
