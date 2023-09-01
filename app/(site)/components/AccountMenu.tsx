"use client";

import { signOut } from "next-auth/react";
import { User } from "@prisma/client";

interface AccountMenuProps {
    visible?: boolean
    user?: User
}

const AccountMenu: React.FC<AccountMenuProps> = ({
    visible,
    user
}) => {
    if (!visible) {
        return null;
    }

    return(
        <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
                <div className="flex flex-col gap-3">
                    <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                        <img className="w-8 rounded-md" src={user?.image || '/images/placeholder.jpg'} alt="" />
                        <p className="text-white text-sm group-hover/item:underline">{ user?.name }</p>
                    </div>
                </div>
                <hr className="bg-gray-600 border-0 h-px my-4" />
                <div onClick={() => signOut({callbackUrl:"/auth/login"})} className="px-3 text-center text-white text-sm hover:underline">
                Sign out of UTE-TV
                </div>
            </div>
        </div>
    );
}

export default AccountMenu;