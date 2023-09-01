'use client';

import { BellIcon, ChevronDownIcon  } from '@heroicons/react/24/outline';
import NavbarItem from "./NavbarItem";
import { usePathname } from "next/navigation";
import { useSession } from 'next-auth/react'; 
import Link from 'next/link';
import AccountMenu from './AccountMenu';
import { useCallback, useState } from 'react';

const Navbar = () => {
    const pathName = usePathname(); // đọc tên đường dẫn hiện tại
    const session = useSession();
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const routesClient = [
        {
            href: '/',
            label: 'Trang chủ',
            active: pathName === '/'
        },{
            href: '/bxh',
            label: 'BXH',
            active: pathName === '/bxh'
        },
        {
          href: '/match',
          label: 'Match',
          active: pathName === '/match'
        }
    ];

    const toggleAccountMenu = useCallback(() => {
      setShowAccountMenu((current) => !current);
    }, []);

    return (
        <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src="/images/logo.png" alt="Logo" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                    {
                        routesClient.map((route,i) => (
                            <NavbarItem key={i} href={route.href} label={route.label} active={route.active} />
                        ))
                    }
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex flex-row ml-auto gap-7 items-center">
                <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                  <BellIcon className="w-6" />
                </div>
                {
                  session.data?.user ? (
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                      <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                        <img src={session.data.user.image || '/images/placeholder.jpg'} alt="Avatar" />
                      </div>
                      <ChevronDownIcon className={`w-4 text-white fill-white transition1 ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                      <AccountMenu visible={showAccountMenu} user={session?.data.user} />
                    </div>
                  ) : 
                  (
                    <div className="flex items-center">
                      <Link href={'/auth/login'} className="mr-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-blue-500 transition duration-150 ease-in-out hover:bg-gray-300 hover:text-blue-600 focus:text-blue-600 focus:outline-none focus:ring-0 active:text-blue-700 motion-reduce:transition-none">
                        Login
                      </Link>
                      <Link href={'/auth/register'} className="mr-3 inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                        Register
                      </Link>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
    </nav>
    );
}

export default Navbar;