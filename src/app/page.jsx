"use server";

import React from "react";
import BarChartComponent from "../components/Dashboard/BarChart";
import PieChart from "../components/Dashboard/PieChart";
import { GetDataDashboard, GetYearEducationList } from "../function/dashboard.js";
import FormSubmit from "../components/Dashboard/FormSubmit.jsx";
import FormDate from "../components/Dashboard/FormDate.jsx";
import { auth } from "../lib/auth";
import { GetHomePageList } from "../function/listhomepage";
import { formatDate } from "../function/formatDate";
import BtnPrintHomepage from "../app/ฺBtnPrintHomepage"
import Link from "next/link";

export default async function Home({ searchParams }) {
  const query_DateRange = searchParams?.DateRange || "";
  const query_CourseName = searchParams?.courseName || "";
  const query_CourseID = searchParams?.courseID || "";
  const query_YearEducation = searchParams?.YearEducation || "";
  const query_Semester = searchParams?.Semester || "";

  
  const session = await auth();
  const userId = session.user.userId;
  const dashBoard = await GetDataDashboard(query_CourseName,query_CourseID,query_YearEducation,query_Semester,userId);
  const yearEducation = await GetYearEducationList(userId);
  const itemList = await GetHomePageList(query_CourseName,query_CourseID,query_YearEducation,query_Semester, userId);

  return (
    <div className="h-full w-full">
      <FormSubmit data={dashBoard} listYearEducation={yearEducation} userId={userId}/>
      {dashBoard.length >= 1 ? (
        <div className="border border-gray-200 border-opacity-50 shadow-sm bg-base-100 w-full h-auto rounded-lg my-5 p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          <BarChartComponent data={dashBoard} />
          <PieChart data={dashBoard} />
        </div>
      ) : (
        <div className="flex justify-center items-center border border-gray-200 border-opacity-50 shadow-sm bg-base-100 w-full h-auto rounded-lg my-5 p-4">
          <p className="text-xl">
            ยังไม่เคยมีการอัปโหลดข้อมูลเกิดขึ้น กรุณาอัปโหลดคะแนนสำหรับการแสดงผล
          </p>
          <Link href={"/import/importmaintain"}>
            <button className="btn btn-success text-white ml-2">
              คลิกเพิ่มเริ่มต้นอัปโหลดไฟล์
            </button>
          </Link>
        </div>
      )}
      <div className="p-3 h-auto w-full border border-gray-200 border-opacity-50 rounded-lg bg-base-100 shadow-sm mt-5">
        <BtnPrintHomepage itemList={itemList} />
        <div className="table-container table-responsive mt-5 border border-solid max-h-[600px] overflow-y-auto rounded-lg shadow">
          <table className="w-full overflow-x-auto">
            <thead className="border-b-2 border-gray-200 sticky top-0 bg-gray-50">
              <tr>
                <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide ">
                  No.
                </th>
                <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide ">
                  หมายเลขอัปโหลด
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                  รหัสวิชา
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                  วิชา
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                  ภาคการศึกษา
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                  จำนวนนิสิต
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                  อัพโหลดวันที่
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                  A
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                  B+
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                  B
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                  C+
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                  C
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                  D+
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                  D
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                  F
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                  I
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                  W
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {itemList.length > 0 ? (
                itemList.map((item, index) => (
                  <tr key={index}>
                    <td
                      className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="3%"
                    >
                      <a className="font-bold text-blue-400">{index + 1}</a>
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="15%"
                    >
                      {item.importHeaderNumber}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="10%"
                    >
                      {item.courseID}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="18%"
                    >
                      {item.courseName}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="10%"
                    >
                      {item.semester}
                    </td>
                    <td
                      className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="10%"
                    >
                      {item.total}
                    </td>
                    <td
                      className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="10%"
                    >
                      {formatDate(item.dateCreated)}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="3%"
                    >
                      {item.a ?? 0}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="3%"
                    >
                      {item.bplus ?? 0}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="3%"
                    >
                      {item.b ?? 0}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="3%"
                    >
                      {item.cplus ?? 0}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="3%"
                    >
                      {item.c ?? 0}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="3%"
                    >
                      {item.dplus ?? 0}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="3%"
                    >
                      {item.d ?? 0}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="3%"
                    >
                      {item.f ?? 0}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="3%"
                    >
                      {item.i ?? 0}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="3%"
                    >
                      {item.w ?? 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="17"
                    className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                  >
                    <div className="mx-4 my-2 mt-2 text-xl">
                      ไม่มีรายการของฉัน กรุณาอัปโหลด
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
