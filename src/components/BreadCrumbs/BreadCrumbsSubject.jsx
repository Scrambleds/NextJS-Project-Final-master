"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export default function BreadCrumbsSubject() {
  
  return (
    <Breadcrumbs isDisabled size="lg">
      <BreadcrumbItem>รายการของฉัน</BreadcrumbItem>
      <BreadcrumbItem>รายวิชา</BreadcrumbItem>
    </Breadcrumbs>
  );
}
