import { Icon } from '@iconify/react';

export const SIDENAV_ITEMS = [
  {
    title: 'หน้าเเรก',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
    isAdmin: 0
  },
  {
    title: 'อัปโหลดไฟล์',
    path: '/import',
    icon: <Icon icon="tabler:upload" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'รายการอัปโหลด', path: '/import/importlist' },
      { title: 'อัปโหลด', path: '/import/importmaintain' },
    ],
    isAdmin: 0
  },
  {
    title: 'รายการผู้ใช้งาน',
    path: '/projects',
    icon: <Icon icon="solar:folder-linear" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'รายวิชา', path: '/list/subjectlist' },
      { title: 'รายนิสิต', path: '/list/studentlist' },
    ],
    isAdmin: 0
  },
  {
    title: 'เเอดมิน',
    path: '/admin',
    icon: <Icon icon="ic:outline-admin-panel-settings" width="24" height="24" />,   
    isAdmin: 1
  },
];
