"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function BreadCrumbsSubDetail() {
  const router = useRouter();
  const routerToSubjectListPage = () => {
    router.push("/list/subjectlist")
  }
  return (
    <Breadcrumbs size="lg">
      <BreadcrumbItem onClick={routerToSubjectListPage}>รายการของฉัน</BreadcrumbItem>
      <BreadcrumbItem onClick={routerToSubjectListPage}>รายวิชา</BreadcrumbItem>
      <BreadcrumbItem>รายระเอียด</BreadcrumbItem>
    </Breadcrumbs>
  );
}
