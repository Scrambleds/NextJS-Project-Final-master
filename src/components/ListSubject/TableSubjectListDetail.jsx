"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import FromDeleteListSubject from "../ListSubject/FromDeleteListSubject";
import BtnPrintSubject from "../ListSubject/BtnPrintSubject"
import BtnPrintGrade from "../ListSubject/BtnPrintGrade"

export default function TableSubjectListDetail({ id, listItem, listGrade }) {
  const [showGrade, setShowGrade] = useState(false);

  return (
    <div>
      {listItem && listGrade ? (
        <div className="border-b-1 bg-base-100 rounded-md shadow p-5 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BtnPrintSubject id={id} listItem={listItem} listGrade={listGrade}/>
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
            <div className="table-responsive mt-5 border border-solid w-full max-h-[650px] overflow-y-auto rounded-lg shadow">
              <table className="w-full">
                <thead className="border-b-2 border-gray-200 sticky top-0 bg-gray-50">
                  <tr>
                    <th className="text-center w-1/4 p-3 text-lg font-semibold tracking-wide">
                      No.
                    </th>
                    <th className="text-center w-1.7/4  p-3 text-lg font-semibold tracking-wide">
                      รหัสนิสิต
                    </th>
                    <th className="text-center w-1.5/4 p-3 text-lg font-semibold tracking-wide">
                      ชื่อ-สกุล
                    </th>
                    <th className="text-center w-1/4 p-3 text-lg font-semibold tracking-wide">
                      เกรด
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {listItem ? (
                    listItem.map((item, index) => (
                      <tr className="bg-white" key={index}>
                        <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                          <a className="font-bold text-blue-500">{index + 1}</a>
                        </td>
                        <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                          {item.id}
                        </td>
                        <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                          {item.grade}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
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
                        คน
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {listGrade ? (
                      listGrade.map((grade, index) => (
                        <React.Fragment key={grade.gradeId}>
                          <tr className="bg-white" key={`${grade.gradeId}_A`}>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              A
                            </td>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              {grade.a ?? 0}
                            </td>
                          </tr>
                          <tr
                            className="bg-white"
                            key={`${grade.gradeId}_Bplus`}
                          >
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              B+
                            </td>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              {grade.bplus ?? 0}
                            </td>
                          </tr>
                          <tr className="bg-white" key={`${grade.gradeId}_B`}>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              B
                            </td>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              {grade.b ?? 0}
                            </td>
                          </tr>
                          <tr
                            className="bg-white"
                            key={`${grade.gradeId}_Cplus`}
                          >
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              C+
                            </td>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              {grade.cplus ?? 0}
                            </td>
                          </tr>
                          <tr className="bg-white" key={`${grade.gradeId}_C`}>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              C
                            </td>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              {grade.c ?? 0}
                            </td>
                          </tr>
                          <tr
                            className="bg-white"
                            key={`${grade.gradeId}_Dplus`}
                          >
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              D+
                            </td>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              {grade.dplus ?? 0}
                            </td>
                          </tr>
                          <tr className="bg-white" key={`${grade.gradeId}_D`}>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              D
                            </td>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              {grade.d ?? 0}
                            </td>
                          </tr>
                          <tr className="bg-white" key={`${grade.gradeId}_I`}>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              I
                            </td>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              {grade.i ?? 0}
                            </td>
                          </tr>
                          <tr className="bg-white" key={`${grade.gradeId}_F`}>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              F
                            </td>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              {grade.f ?? 0}
                            </td>
                          </tr>
                          <tr className="bg-white" key={`${grade.gradeId}_W`}>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              W
                            </td>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              {grade.w ?? 0}
                            </td>
                          </tr>
                          <tr
                            className="bg-white"
                            key={`${grade.gradeId}_Total`}
                          >
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              จำนวนทั้งหมด
                            </td>
                            <td
                              className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                            >
                              {grade.total}
                            </td>
                          </tr>
                        </React.Fragment>
                      ))
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
          <div className="flex justify-end mt-4">
            <FromDeleteListSubject importNo={id} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
