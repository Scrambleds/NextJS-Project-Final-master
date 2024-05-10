"use server";
import {
  GetGradeStudent,
  GetSumGradeStudent,
} from "../../../../../../function/listStudent";
import { auth } from "../../../../../../lib/auth";
import BreadCrumbsStudentDetail from "../../../../../../components/BreadCrumbs/BreadCrumbsStudentDetail";
import TableStudentListDetail from "../../../../../../components/ListStudent/TableStudentListDetail";

export default async function StudentDetailPage({ params }) {
  const session = await auth();
  const userId = session.user.userId;
  const { id } = params;
  const listItem = await GetGradeStudent(id, userId);
  const listSumGrade = await GetSumGradeStudent(id, userId);
  return (
    <div className="h-full mx-auto p-3">
      {/*หน้าที่เปิดอยู่*/}
      <BreadCrumbsStudentDetail />

      {/*ชื่อหน้า*/}
      <div className="mt-2">
        <p className="text-2xl font-bold">รายระเอียดของนิสิต</p>
      </div>

      {/*รายระเอียดนิสิต*/}
      <div className=" h-auto w-full px-3 pt-7">
        <div className="flex flex-col gap-2">
          <div className="xl:flex xl:gap-5 flex-row">
            <div className="flex items-center mb-2 xl:w-[300px]">
              <label
                htmlFor="courseID"
                className="text-black text-lg flex-shrink-0"
              >
                รหัสนิสิต
              </label>
              <input
                name="courseID"
                type="text"
                value={listItem[0].id}
                readOnly
                className="ml-2 input input-bordered w-full"
              />
            </div>
            <div className="flex items-center mb-2 xl:w-[380px]">
              <label
                htmlFor="courseID"
                className="text-black text-lg flex-shrink-0"
              >
                ชื่อ-สกุล
              </label>
              <input
                name="courseID"
                type="text"
                value={listItem[0].name}
                readOnly
                className="ml-2 input input-bordered w-full"
              />
            </div>
          </div>
          <div className="xl:flex justify-end items-center"></div>
        </div>
      </div>
      {/* ตารางเเสดงผลในไฟล์ Excel */}
      <div className="mt-5">
        <TableStudentListDetail
          id={id}
          listItem={listItem}
          listSumGrade={listSumGrade}
        />
      </div>
    </div>
  );
}
