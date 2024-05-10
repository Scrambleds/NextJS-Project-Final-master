"use client";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import BtnPrintStudentDetail from "../ListStudent/BtnPrintStudentDetail";
import BtnPrintSumStudent from "../ListStudent/BtnPrintSumStudent"

export default function TableStudentListDetail({ id, listItem, listSumGrade }) {
  const [showGrade, setShowGrade] = useState(false);
  const gradeStudent = (grade) => {
    const gradeColors = {
      A: "text-green-500",
      "B+": "text-green-500",
      B: "text-green-500",
      "C+": "text-green-500",
      C: "text-green-500",
      "D+": "text-green-500",
      D: "text-green-500",
      I: "text-red-500",
      F: "text-red-500",
      W: "text-red-500",
    };
    return gradeColors[grade] || "";
  };

  return (
    <div>
      {listItem ? (
        <div className="border-b-1 bg-base-100 rounded-md shadow p-5 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BtnPrintStudentDetail id={id} listItem={listItem} listSumGrade={listSumGrade} />
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setShowGrade(!showGrade)}
                className={`btn btn-active text-white w-[220px] max-x-lg mr-5  ${
                  showGrade ? "bg-orange-500" : "bg-green-600"
                }`}
              >
                <Icon icon="mdi:eye" className="text-white text-lg" />
                {showGrade == false ? (
                  <>เเสดงผลรวมเกรดทั้งหมด</>
                ) : (
                  <>เเสดงผลข้อมูลที่อัปโหลด</>
                )}
              </button>
            </div>
          </div>
          {showGrade == false ? (
            <div className="table-container table-responsive mt-5 border border-solid max-h-[800px] overflow-y-auto rounded-lg shadow">
              <table className="w-full">
                <thead className="border-b-2 border-gray-200 sticky top-0 bg-gray-50">
                  <tr>
                    <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                      No.
                    </th>
                    <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                      รหัสวิชา
                    </th>
                    <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                      ชื่อวิชา
                    </th>
                    <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                      ภาคการศึกษา
                    </th>
                    <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                      ปีการศึกษา
                    </th>
                    <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                      เกรด
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {listItem.length > 0 ? (
                    listItem.map((item, index) => (
                      <tr className="bg-white" key={index}>
                        <td
                          className="text-center p-3 text-lg text-gray-700 whitespace-nowrap "
                          width="10%"
                        >
                          <a className="font-bold text-blue-500">{index + 1}</a>
                        </td>
                        <td
                          className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                          width="15%"
                        >
                          {item.courseID}
                        </td>
                        <td
                          className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                          width="20%"
                        >
                          {item.courseName}
                        </td>
                        <td
                          className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                          width="15%"
                        >
                          {item.semester}
                        </td>
                        <td
                          className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                          width="15%"
                        >
                          {item.yearEducation}
                        </td>
                        <td
                          className="text-center p-3 whitespace-nowrap"
                          width="15%"
                        >
                          <p className={`text-lg ${gradeStudent(item.grade)}`}>
                            {item.grade}
                          </p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                      >
                        <div className="mx-4 my-2 mt-2 text-xl">
                          ไม่มีรายการนิสิตคนนี้ กรุณาตรวจสอบอีกครั้ง
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <>
              <div className="table-responsive mt-5 border border-solid w-full max-h-[650px] overflow-y-auto rounded-lg shadow">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="text-center w-[60%] p-3 text-lg font-semibold tracking-wide">
                        เกรด
                      </th>
                      <th className="text-center w-[40%] p-3 text-lg font-semibold tracking-wide">
                        จำนวน
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {listSumGrade ? (
                      <React.Fragment key={listSumGrade.id}>
                        <tr className="bg-white" key={`${listSumGrade.id}_A`}>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            A
                          </td>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            {listSumGrade.a ?? 0}
                          </td>
                        </tr>
                        <tr
                          className="bg-white"
                          key={`${listSumGrade.id}_Bplus`}
                        >
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            B+
                          </td>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            {listSumGrade.bPlus ?? 0}
                          </td>
                        </tr>
                        <tr className="bg-white" key={`${listSumGrade.id}_B`}>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            B
                          </td>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            {listSumGrade.b ?? 0}
                          </td>
                        </tr>
                        <tr
                          className="bg-white"
                          key={`${listSumGrade.id}_Cplus`}
                        >
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            C+
                          </td>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            {listSumGrade.cPlus ?? 0}
                          </td>
                        </tr>
                        <tr className="bg-white" key={`${listSumGrade.id}_C`}>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            C
                          </td>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            {listSumGrade.c ?? 0}
                          </td>
                        </tr>
                        <tr
                          className="bg-white"
                          key={`${listSumGrade.id}_Dplus`}
                        >
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            D+
                          </td>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            {listSumGrade.dPlus ?? 0}
                          </td>
                        </tr>
                        <tr className="bg-white" key={`${listSumGrade.id}_D`}>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            D
                          </td>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            {listSumGrade.d ?? 0}
                          </td>
                        </tr>
                        <tr className="bg-white" key={`${listSumGrade.id}_I`}>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            I
                          </td>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            {listSumGrade.i ?? 0}
                          </td>
                        </tr>
                        <tr className="bg-white" key={`${listSumGrade.id}_F`}>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            F
                          </td>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            {listSumGrade.f ?? 0}
                          </td>
                        </tr>
                        <tr className="bg-white" key={`${listSumGrade.id}_W`}>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            W
                          </td>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            {listSumGrade.w ?? 0}
                          </td>
                        </tr>
                        <tr
                          className="bg-white"
                          key={`${listSumGrade.id}_Total`}
                        >
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            จำนวนทั้งหมด
                          </td>
                          <td
                            className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                          >
                            {listSumGrade.total}
                          </td>
                        </tr>
                      </React.Fragment>
                    ) : (
                      <tr>
                        <td
                          colSpan="2"
                          className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                        >
                          <div className="mx-4 my-2 mt-2 text-xl">
                            ไม่มีข้อมูล
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
