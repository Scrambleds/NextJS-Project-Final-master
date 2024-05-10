import Link from "next/link";
import React from "react";
import { checkUserInDB } from "../../../../function/admin";
import FormEditUser from "../../../../components/Admin/form/FormEditUser";
import BreadCrumbsEditUser from "../../../../components/BreadCrumbs/BreadCrumbsEditUser"

export default async function EditUserPage({params}) {
  const {id} = params;
  const user = await checkUserInDB(id)

  return (
    <div className="h-full mx-auto p-3">
    {/*Breadcrumb Section*/}
    <div className="">
      <BreadCrumbsEditUser />
    </div>

    {/*Page Title*/}
    <div className="mt-2">
      <p className="text-2xl font-bold">เเก้ไขผู้ใช้งาน</p>
    </div>

   
    <div className="mt-5 p-[20px] max-h-[800px] border border-solid rounded-lg shadow">
      <div className="flex flex-col items-center h-screen">
        <FormEditUser params={id} user={user} />
      </div>
    </div>
    </div>
  );
}
