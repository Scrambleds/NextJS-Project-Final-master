"use client"
import React from 'react'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function BreadCrumbsAdmin() {
  return (
    <Breadcrumbs isDisabled size='lg'>
      <BreadcrumbItem>เเอดมิน</BreadcrumbItem>
      <BreadcrumbItem>จัดการผู้ใช้งาน</BreadcrumbItem>
    </Breadcrumbs>
  );
}

