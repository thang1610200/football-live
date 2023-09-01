"use client";

import Link from 'next/link';

interface NavbarItemProps {
    href: string,
    active?: boolean,
    label: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({
    href,
    active,
    label
}) => {
    return(
        <Link href={href} className={`px-3 py-2 rounded-md text-sm font-medium ${active ? 'text-white' : 'text-gray-500 hover:text-white' }`}>{label}</Link>
    );
}

export default NavbarItem;