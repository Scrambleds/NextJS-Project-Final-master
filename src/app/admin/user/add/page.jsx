import Link from "next/link";
import React from "react";
import FormAddUser from "../../../../components/Admin/form/FormAddUser";
import BreadCrumbsAddUser from "../../../../components/BreadCrumbs/BreadCrumbsAddUser";

export default function AdminPage(formData) {
  return (
    <div className="h-full mx-auto p-3">
      {/*Breadcrumb Section*/}
      <div className="">
        <BreadCrumbsAddUser />
      </div>

      {/*Page Title*/}
      <div className="mt-2">
        <p className="text-2xl font-bold">เพิ่มผู้ใช้งาน</p>
      </div>

      <div className="mt-5 p-[20px] max-h-[800px] border border-solid rounded-lg shadow">
        <FormAddUser />
      </div>
    </div>
  );
}
