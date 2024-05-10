"use client"
import React, { useEffect, useState } from "react";
import { getAllListSubject } from "../../../function/listSubject";
import Pagination from "./Pagination"

export default function ImportListTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [importlist, setImportList] = useState(null);

  //fetch ข้อมูล
  useEffect(() => {
    const fetchData = async () => {
      const list = await getAllListSubject();
      setImportList(list);
    };

    fetchData();
  }, []); 

  if (!importlist) {
    return <div className="mt-2 flex flex-col gap-4 my-2 mx-2">
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
  </div>
  }

  // จัดรูปเเบบเวลา
  const formatDate = (dateCreated) => {
    const DDMMYYYY = dateCreated.split('T')[0].split('-').reverse().join('/');
    return DDMMYYYY;
  };

  // ปุ่มเปลี่ยนหน้า

  const itemsPerPage = 15;

  const totalPages = importlist ? Math.ceil(importlist.length / itemsPerPage) : 0;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = importlist ? importlist.slice(startIndex, endIndex) : [];

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div>
      {currentItems != null ? (
        <div className="table=responsive mt-5 border border-solid">
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
                  ชื่อวิชา
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
              {currentItems.map((item, index) => (
                <tr key={index}>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                  <a className="font-bold text-blue-500">{index + 1}</a>
                </td>
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    {item.importHeaderNumber}
                  </td>
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    {item.courseID}
                  </td>
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    {item.courseName}
                  </td>
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    {item.semester}
                  </td>
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    {item.yearEducation}
                  </td>
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    {formatDate(item.dateCreated)}
                  </td>
                  </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      ) : (
        <div className='mx-4 mt-3'>ไม่มีรายการอัปโหลด กรุณาอัปโหลด</div>
      )}
    </div>
  );
}
