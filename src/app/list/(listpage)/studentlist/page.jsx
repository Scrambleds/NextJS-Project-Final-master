"use server";
import IconOption from "../../../../components/Admin/IconOption";
import { CountListStudent, GetStudent } from "../../../../function/listStudent";
import { auth } from "../../../../lib/auth";
import SearchData from "../../../../components/SearchData/SearchData";
import Pageination from "../../../../components/Pageination/Pageination";
import Link from "next/link";
import BreadCrumbsStudent from "../../../../components/BreadCrumbs/BreadCrumbsStudent";
import BtnDetail from "../../../../components/ListStudent/BtnDetail";

export default async function StudentListPage({ searchParams }) {
  const session = await auth();
  const userId = session.user.userId;
  const query = searchParams?.id || "";
  const additionalQuery = searchParams?.name || "";
  const page = searchParams?.page || 1;
  const itemList = await GetStudent(query, additionalQuery, page, userId);
  const countPage = await CountListStudent(query, additionalQuery, userId);
  const amountPage = Math.ceil(countPage / 8);
  const startingIndex = (page - 1) * 8;
  return (
    <div className="h-full mx-auto p-3">
      {/*Breadcrumb Section*/}
      <div className="">
        <BreadCrumbsStudent />
      </div>

      {/*Page Title*/}
      <div className="mt-2">
        <p className="text-2xl font-bold">รายนิสิต</p>
      </div>

      {/*Search Table*/}
      <div className="mt-2">
        <SearchData
          placeholder1={"ค้นหาตาม รหัสนิสิต"}
          placeholder2={"ค้นหาตาม ชื่อ"}
        />
      </div>

       {/*Table Student*/}
      <div className="table-container table-responsive overflow-x-auto mt-5 max-h-screen bg-gray-100 rounded-lg shadow">
        <table className="w-full">
          {/* head */}
          <thead className="border-b-2 border-gray-200 sticky top-0 bg-gray-50">
            <tr>
              <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide ">
                No.
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                รหัสนิสิต
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                ชื่อ
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                จำนวนวิชาที่ได้เกรด
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide flex justify-center items-center">
                <IconOption />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {itemList.length > 0 ? (
              itemList.map((item, index) => (
                <tr key={index}>
                  <td
                    className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="15%"
                  >
                    <a className="font-bold text-blue-400">
                      {startingIndex + index + 1}
                    </a>
                  </td>
                  <td
                    className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="20%"
                  >
                    <Link
                      href={`/list/studentlist/detail/${item.id}`}
                    >
                      <p className="text-blue-400 cursor-pointer hover:scale-105 hover:text-blue-600">
                        {item.id}
                      </p>
                    </Link>
                  </td>
                  <td
                    className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="25%"
                  >
                    {item.name}
                  </td>
                  <td
                    className="text-center p-3 text-xl font-semibold text-gray-700 whitespace-nowrap"
                    width="20%"
                  >
                    {item.count}
                  </td>
                  <td
                    className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="15%"
                  >
                    <Link href={`/list/studentlist/detail/${item.id}`}>
                      <BtnDetail/>
                    </Link>
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
                    ไม่มีรายการของฉัน กรุณาอัปโหลด
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/*Pageination*/}
        <Pageination rows={8} count={countPage} pageNow={page} amountPage={amountPage} />
      </div>
    </div>
  );
}
