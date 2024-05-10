import React, { useEffect, useState } from "react";

export default function TableCountGrade({
  excelData,
  loading,
  sumGrade,
}) {
  const [getGrade, setGetGrade] = useState(null);
  useEffect(() => {
    const countGrades = () => {
      if (excelData == null) {
        return null;
      }

      const gradeCount = {};

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
          F: "f",
          W: "w",
        }[grade.toUpperCase()];

        gradeCount[grade] = (gradeCount[grade] || 0) + 1;
       
      });
      setGetGrade(gradeCount);
    
    };

    countGrades();
  }, [excelData]);

  if (!excelData) {
    return null;
  }

  const sortedGrades = ["A", "B+", "B", "C+", "C", "D+", "D", "I", "F", "W"];

  return (
    <div className="flex">
      {!loading ? (
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
              {sortedGrades.map((grade) => (
                <tr className="bg-white" key={grade}>
                  <td
                    className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                  >
                    {grade}
                  </td>
                  <td
                    className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                  >
                    {(getGrade && getGrade[grade]) || 0}
                  </td>
                </tr>
              ))}
              <tr className="bg-white">
                <td
                  className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                >
                  จำนวนทั้งหมด
                </td>
                <td
                  className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}
                >
                  {excelData.length}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col gap-4 my-8 mx-10">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      )}
    </div>
  );
}
