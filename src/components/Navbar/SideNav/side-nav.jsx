'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDENAV_ITEMS } from '../../../constants';
import { Icon } from '@iconify/react';
import LoginImage from '../../Login/LoginImage';

const SideNav = ({session}) => {
  const user = session.user.isAdmin;
  return (
    <div className="md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex z-10">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full"
        >
          <LoginImage width={120} height={40} />
        </Link>
        <div className="flex flex-col space-y-2 md:px-6 ">        
            {SIDENAV_ITEMS.map((item, idx) => {
              const shouldShowMenuItem = user === 1 || item.isAdmin === 0;
              return shouldShowMenuItem ? (
                <MenuItem key={idx} item={item} user={user} />
              ) : null;
            })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item, user }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? 'bg-zinc-100' : ''
            }`}
            aria-expanded={subMenuOpen}
            aria-controls={`submenu-${item.title.replace(/\s+/g, "-").toLowerCase()}`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-md  flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div id={`submenu-${item.title.replace(/\s+/g, "-").toLowerCase()}`} className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => (
                <Link
                  key={idx}
                  href={subItem.path}
                  className={`${
                    subItem.path === pathname ? 'font-bold' : ''
                  }`}
                  aria-current={subItem.path === pathname ? 'page' : undefined}
                >
                  <span>{subItem.title}</span>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? 'bg-zinc-100' : ''
          }`}
          aria-current={item.path === pathname ? 'page' : undefined}
        >
          {item.icon}
          <span className="font-semibold text-md flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
