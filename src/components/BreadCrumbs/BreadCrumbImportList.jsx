"use client"
import React from 'react'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function BreadCrumbImportList() {
  return (
    <Breadcrumbs isDisabled size='lg'>
      <BreadcrumbItem>อัปโหลดไฟล์</BreadcrumbItem>
      <BreadcrumbItem>รายการอัปโหลดล่าสุด</BreadcrumbItem>
    </Breadcrumbs>
  );
}

