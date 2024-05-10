"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function BreadCrumbsStudentDetail() {
  const router = useRouter();
  const routerToSubjectListPage = () => {
    router.push("/list/studentlist")
  }
  return (
    <Breadcrumbs size="lg">
      <BreadcrumbItem onClick={routerToSubjectListPage}>รายการของฉัน</BreadcrumbItem>
      <BreadcrumbItem onClick={routerToSubjectListPage}>รายนิสิต</BreadcrumbItem>
      <BreadcrumbItem>รายระเอียดของนิสิต</BreadcrumbItem>
    </Breadcrumbs>
  );
}
