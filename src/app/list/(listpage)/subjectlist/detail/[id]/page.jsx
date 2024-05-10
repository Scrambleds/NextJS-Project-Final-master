"use server";
import {
  GetimportDetail,
  GetiExcelDetail,
  GetGradeImportHeaderNumber,
} from "../../../../../../function/listSubject";
import { formatDate } from "../../../../../../function/formatDate.js";
import { auth } from "../../../../../../lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import BreadCrumbsSubDetail from "../../../../../../components/BreadCrumbs/BreadCrumbsSubDetail.jsx";
import TableSubjectListDetail from "../../../../../../components/ListSubject/TableSubjectListDetail.jsx";

const SubjectDetailPage = async ({ params }) => {
  const session = await auth();
  const userId = session.user.userId;
  const { id } = params;
  const [importH] = await GetimportDetail(id, userId);
  if (!importH) {
    redirect("/");
  }
  const listItem = await GetiExcelDetail(id, userId);
  if (!listItem) {
    redirect("/");
  }

  const listGrade = await GetGradeImportHeaderNumber(
    importH.importHeaderNumber,
    userId
  );
  if (!listGrade) {
    redirect("/");
  }
  return (
    <div className="h-full mx-auto p-3">
      {/*หน้าที่เปิดอยู่*/}
      <BreadCrumbsSubDetail />

      {/*ชื่อหน้า*/}
      <div className="mt-2">
        <p className="text-2xl font-bold">รายระเอียดวิชา </p>
      </div>

      {/* เเถบ Header */}
      <div className="mt-2">
        <div className="mt-5 p-5">
          <div className="lg:flex lg:justify-center lg:items-center">
            <div className="lg:w-1/3">
              <div className="hidden lg:block lg:text-center">
                <p className="text-xl font-semibold">รายระเอียดข้อมูลรายวิชา</p>
              </div>
            </div>
            <div className="lg:w-2/3 border-b-1 bg-white rounded-md shadow p-5">
              <div className="flex flex-col lg:flex-row lg:justify-center">
                <div className="flex-col items-start mt-2 mb-2 lg:flex-row gap-4 lg:ml-2 xl:ml-5 xl:w-[40%]">
                  <label
                    htmlFor="Importnumber"
                    className="text-black text-lg flex-shrink-0"
                  >
                    หมายเลขอัปโหลด
                  </label>
                  <div className="flex items-center">
                    <input
                      name="Importnumber"
                      type="text"
                      className="ml-2 input input-bordered w-full lg:max-w-sm xl:max-w-lg"
                      value={importH.importHeaderNumber}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="flex-col items-start mt-2 lg:flex-row gap-4 lg:ml-2 xl:ml-5 xl:w-[40%]">
                  <label
                    htmlFor="courseID"
                    className="text-black text-lg flex-shrink-0"
                  >
                    รหัสวิชา
                  </label>
                  <div className="flex items-center">
                    <input
                      name="courseID"
                      type="text"
                      className="ml-2 input input-bordered w-full lg:max-w-sm xl:max-w-lg"
                      value={importH.courseID}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="flex-col items-start mt-2 lg:flex-row gap-4 lg:ml-2 xl:ml-5 xl:w-[40%]">
                  <label
                    htmlFor="courseName"
                    className="text-black text-lg flex-shrink-0"
                  >
                    ชื่อวิชา
                  </label>
                  <div className="flex items-center">
                    <input
                      name="courseName"
                      type="text"
                      className="ml-2 input input-bordered w-full lg:max-w-sm xl:max-w-lg"
                      value={importH.courseName}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:justify-center">
                <div className="flex-col items-start mt-2 lg:flex-row gap-4 lg:ml-2 xl:ml-5 xl:w-[40%]">
                  <label
                    htmlFor="semester"
                    className="text-black text-lg flex-shrink-0"
                  >
                    ภาคการศึกษา
                  </label>
                  <div className="flex items-center">
                    <input
                      name="semester"
                      type="text"
                      className="ml-2 input input-bordered w-full lg:max-w-sm xl:max-w-lg"
                      value={importH.semester}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="flex-col items-start mt-2 lg:flex-row gap-4 lg:ml-2 xl:ml-5 xl:w-[40%]">
                  <label
                    htmlFor="yearEducation"
                    className="text-black text-lg flex-shrink-0"
                  >
                    ปีการศึกษา
                  </label>
                  <div className="flex items-center">
                    <input
                      name="yearEducation"
                      type="text"
                      className="ml-2 input input-bordered w-full lg:max-w-sm xl:max-w-lg"
                      value={importH.yearEducation}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="flex-col items-start mt-2 lg:flex-row gap-4 lg:ml-2 xl:ml-5 xl:w-[40%]">
                  <label
                    htmlFor="dateCreated"
                    className="text-black text-lg flex-shrink-0"
                  >
                    วันที่อัปโหลด
                  </label>
                  <div className="flex items-center">
                    <input
                      name="dateCreated"
                      type="text"
                      className="ml-2 input input-bordered w-full lg:max-w-sm xl:max-w-lg"
                      value={formatDate(importH.dateCreated)}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ตารางเเสดงผลในไฟล์ Excel */}
      <div className="mt-5">
        <TableSubjectListDetail id={id} listItem={listItem} listGrade={listGrade} />
      </div>
    </div>
  );
};

export default SubjectDetailPage;
