import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import TableCountGrade from "./TableCountGrade";

export default function ExcelDataViewer({
  excelData,
  loading,
  handleResetFile,
  setSumGrade,
}) {
  const [showGrade, setShowGrade] = useState(false);
  
  useEffect(() => {
    const countGrades = () => {
      if (excelData == null) {
        return null;
      }

      const gradeCount = {};
      const mappedGradeCount = {};

      excelData.forEach((student) => {
        const grade = student.GRADE;
        const mappedGrade = {
          A: "a",
          "B+": "bplus",
          B: "b",
          "C+": "cplus",
          C: "c",
          "D+": "dplus",
          D: "d",
          I: "i",
          W: "w",
          F: "f",
        }[grade.toUpperCase()];

      
        mappedGradeCount[mappedGrade] =
          (mappedGradeCount[mappedGrade] || 0) + 1;
      });
      setSumGrade(mappedGradeCount);
    };

    countGrades();
  }, [excelData, setSumGrade]);
  return (
    <div>
      {!loading && excelData ? (
        <div className="border-b-1 bg-base-100 rounded-md shadow p-5 ">
          <div className="flex items-center justify-between">
            <div>
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
            <div className="flex items-center justify-center">
              <button
                onClick={handleResetFile}
                className="ml-3 btn btn-active bg-red-500 text-white w-[130px] max-x-lg"
              >
                ยกเลิกไฟล์
                <Icon icon="mdi:bin" className="text-white text-lg" />
              </button>
            </div>
          </div>
          {showGrade == false ? (
            <div className="table-container table-responsive mt-5 border border-solid max-h-[650px] overflow-y-auto rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    {Object.keys(excelData[0]).map((key) => (
                      <th
                        className="text-center w-10 p-3 text-lg font-semibold tracking-wide sticky top-0 bg-gray-50 "
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
            </div>
          ) : (
            <TableCountGrade
              excelData={excelData}
              loading={loading}
              setSumGrade={setSumGrade}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
