"use client";

import { FullMatch } from "@/app/types";
import {Button} from "@/components/ui/button";
import { format } from 'date-fns';
import { useRouter } from "next/navigation";

interface MatchBoxProps {
    data: FullMatch
}

const MatchBox:React.FC<MatchBoxProps> = ({
    data
}) => {
    const router = useRouter();

    return (
        <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-slate-800 col-span-3 h-36">
                <div className="grid">
                    <div className="flex items-center space-x-36">
                        <div className="flex flex-col items-center">
                            <img src={data.homeTeam.logo || ""} alt="Team Logo" className="w-14 h-14" />
                            <div className="text-white font-semibold mt-1 text-base">{data.homeTeam.name}</div>
                        </div>
                        <div className="text-3xl text-white font-semibold">VS</div>
                        <div className="flex flex-col items-center">
                            <a href="/">
                                <img src={data.awayTeam.logo || ""} alt="Team Logo" className="w-14 h-14" />
                            </a>
                            <div className="text-white font-semibold mt-1 text-base">{data.awayTeam.name}</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        {/* <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">Button</button> */}
                        <Button onClick={() => {router.push(`/live/${data.id}`)}} variant="destructive">{ data.start ? "ĐANG DIỄN RA" : "SẮP DIỄN RA" }</Button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center rounded bg-zinc-500">
                <div className="grid">
                    <p className="text-white font-semibold text-sm mt-5">{data.league.name}</p>
                    <p className="text-white font-semibold text-4xl flex items-center justify-center mb-6">{format(new Date(data.time),'HH:mm')}</p>
                </div>
            </div>
        </div>
    );
}

export default MatchBox;