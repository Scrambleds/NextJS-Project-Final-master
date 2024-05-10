"use client";
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
export default function BreadCrumbsStudent() {
  
  return (
    <Breadcrumbs isDisabled size="lg">
      <BreadcrumbItem>รายการของฉัน</BreadcrumbItem>
      <BreadcrumbItem >รายนิสิต</BreadcrumbItem>
    </Breadcrumbs>
  );
}
