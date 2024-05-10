import React from 'react'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function BreadCrumbsImMain() {
  return (
    <Breadcrumbs isDisabled size='lg'>
      <BreadcrumbItem>อัปโหลดไฟล์</BreadcrumbItem>
      <BreadcrumbItem>อัปโหลด</BreadcrumbItem>
    </Breadcrumbs>
  );
}

