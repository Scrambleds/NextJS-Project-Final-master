"use server";
import React from "react";
import BtnDirectToImportListPage from "../../../components/Import/importlist/BtnDirectToImportListPage";
import Link from "next/link";
import {
  CountListimportheader,
  getAllListSubject,
  getListimportheaderForPage,
} from "../../../function/listSubject";
import Pageination from "../../../components/Pageination/Pageination";
import { auth } from "../../../lib/auth";
import BreadCrumbImportList from "../../../components/BreadCrumbs/BreadCrumbImportList"

export default async function ImportListPage({ searchParams }) {
  const session = await auth();
  const userId = session.user.userId;
  const page = searchParams?.page || 1;
  const list = await getListimportheaderForPage(page, userId);
  const countPage = await CountListimportheader(userId);
  const amountPage = Math.ceil(countPage / 5);

  // จัดรูปเเบบเวลา
  const formatDate = (dateCreated) => {
    const DDMMYYYY = dateCreated.split("T")[0].split("-").reverse().join("/");
    return DDMMYYYY;
  };

  const startingIndex = (page - 1) * 5;
  
  return (
    <div className="h-full mx-auto p-3">
     {/*Breadcrumb Section*/}
     <div className="">
        <BreadCrumbImportList />
      </div>

      {/*Page Title*/}
      <div className="mt-2">
        <p className="text-2xl font-bold">รายการอัปโหลดล่าสุด</p>
      </div>
   
    <div className="">
      <div className="flex items-center justify-end">
        <BtnDirectToImportListPage />
      </div>
      <div>
        <div className="table-container table-responsive mt-5 border border-solid max-h-[650px] overflow-y-auto rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                  No.
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide">
                  หมายเลขอัปโหลด
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide">
                  รหัสวิชา
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide">
                  วิชา
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide">
                  ภาคการศึกษา
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide">
                  ปีการศึกษา
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide">
                  วันที่อัปโหลด (วัน/เดือน/ปี)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white divide-gray-100">
              {list.length > 0 ? (
                list.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="5%">
                      <a className="font-bold text-blue-500">{startingIndex + index + 1}</a>
                    </td>
                    <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="15%">
                      {item.importHeaderNumber}
                    </td>
                    <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="10%">
                      {item.courseID}
                    </td>
                    <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="15%">
                      {item.courseName}
                    </td>
                    <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="8%">
                      {item.semester}
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="5%">
                      {item.yearEducation}
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="13%">
                      {formatDate(item.dateCreated)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                  >
                    <div className="mx-4 my-2 mt-2 text-xl">
                      ไม่มีรายการอัปโหลด กรุณาอัปโหลด
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pageination rows={5} count={countPage} pageNow={page} amountPage={amountPage} />
        </div>
      </div>
    </div>
    </div>
  );
}
