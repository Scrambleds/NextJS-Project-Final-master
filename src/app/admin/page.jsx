"use server";
import SearchUser from "../../components/Admin/SearchUser";
import Pageination from "../../components/Pageination/Pageination";
import Link from "next/link";
import IconOption from "../../components/Admin/IconOption";
import { CountUser, deleteUser, getAllUser } from "../../function/admin";
import FormDeleteUser from "../../components/Admin/form/FormDeleteUser";
import { auth } from "../../lib/auth";
import BreadCrumbImportList from "../../components/BreadCrumbs/BreadCrumbsAdmin";
import BtnAddUser from "../../components/Admin/BtnAddUser";
import BtnEditUser from "../../components/Admin/BtnEditUser";

export default async function AdminPage({ searchParams }) {
  const session = await auth();
  const userId = session.user.userId;
  const query = searchParams?.username || "";
  const additionalQuery = searchParams?.email || "";
  const page = searchParams?.page || 1;
  const users = await getAllUser(query, additionalQuery, page);
  const countPage = await CountUser(query, additionalQuery);
  const startingIndex = (page - 1) * 8;
  const amountPage = Math.ceil(countPage / 8);

  return (
    <div className="h-full mx-auto p-3">
      {/*Breadcrumb Section*/}
      <div className="">
        <BreadCrumbImportList />
      </div>

      {/*Page Title*/}
      <div className="mt-2">
        <p className="text-2xl font-bold">จัดการผู้ใช้งาน</p>
      </div>

      {/*Search Table*/}
      <div className="flex-col mt-2">
        <div className="flex-1">
          <div className="my-4 flex items-center justify-between">
            <div className="flex gap-5">
              <SearchUser
                placeholder1={"ค้นหาตาม username"}
                placeholder2={"ค้นหาตาม email"}
              />
            </div>
            <div className="flex mr-2">
              <Link href={"/admin/user/add"}>
                  <BtnAddUser/>
              </Link>
            </div>
          </div>

          {/*User Table*/}
          <div className="table-container table-responsive mt-5 border border-solid overflow-y-auto rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                    No.
                  </th>
                  <th className="text-center p-3 text-lg font-semibold tracking-wide">
                    username
                  </th>
                  {/* <th className="text-left w-15 p-3 text-lg font-semibold tracking-wide">
                    password
                  </th> */}
                  <th className="text-center w-15 p-3 text-lg font-semibold tracking-wide">
                    ชื่อ
                  </th>
                  <th className="text-center w-15 p-3 text-lg font-semibold tracking-wide">
                    นามสกุล
                  </th>
                  <th className="text-center tw-15 p-3 text-lg font-semibold tracking-wide">
                    email
                  </th>
                  <th className="text-center w-15 p-3 text-lg font-semibold tracking-wide">
                    สถานะ
                  </th>
                  <th className="text-center w-15 p-3 text-lg font-semibold tracking-wide flex justify-center items-center">
                    <IconOption />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
              {users.length > 0 ? (
                 users.map((item, index) => (
                  <tr className="bg-white" key={index}>
                    <td
                      className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="5%"
                    >
                      <a className="font-bold text-blue-500">
                        {startingIndex + index + 1}
                      </a>
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="10%"
                    >
                      {item.username}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="10%"
                    >
                      {item.firstname}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="10%"
                    >
                      {item.lastname}
                    </td>
                    <td
                      className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="15%"
                    >
                      {item.email}
                    </td>
                    <td
                      className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="10%"
                    >
                      {item.isAdmin === 1 ? (
                        <span className="p-1.5 text-xs font-medium tracking-wider uppercase text-white bg-blue-600 rounded-lg bg-opacity-50">
                          Admin
                        </span>
                      ) : (
                        <span className="p-1.5 text-xs font-medium tracking-wider uppercase text-black bg-green-600 rounded-lg bg-opacity-50">
                          User
                        </span>
                      )}
                    </td>
                    <td
                      className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                      width="15%"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/admin/user/${item.userId}`}>
                         <BtnEditUser/>
                        </Link>
                        {userId == item.userId ? (
                          <></>
                        ) : (
                          <FormDeleteUser
                            userId={item.userId}
                            userName={item.username}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                <td
                  colSpan="8"
                  className="text-center p-3 text-lg text-gray-700 whitespace-nowrap bg-white"
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
      </div>
    </div>
  );
}
