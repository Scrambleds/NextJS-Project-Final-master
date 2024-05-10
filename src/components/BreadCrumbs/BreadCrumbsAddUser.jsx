"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function BreadCrumbsAddUser() {
  const router = useRouter();
  const routerToSubjectListPage = () => {
    router.push("/admin")
  }
  return (
    <Breadcrumbs size="lg">
      <BreadcrumbItem onClick={routerToSubjectListPage}>เเอดมิน</BreadcrumbItem>
      <BreadcrumbItem onClick={routerToSubjectListPage}>จัดการผู้ใช้งาน</BreadcrumbItem>
      <BreadcrumbItem>เพิ่มผู้ใช้งาน</BreadcrumbItem>
    </Breadcrumbs>
  );
}
