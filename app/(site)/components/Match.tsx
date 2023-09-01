'use client';

import { FullMatch } from "@/app/types";
import {Button} from "@/components/ui/button";
import clsx from "clsx";
import { format } from 'date-fns';
import { useRouter } from "next/navigation";

interface MatchProps {
    small?: boolean,
    data?: FullMatch,
    nobutton?: boolean
}

const Match:React.FC<MatchProps> = ({
    small,
    data,
    nobutton
}) => {
    const router = useRouter();

    // const ClickLive = useCallback(() => {
    //     axios.post('/api/live',{ 
    //         matchId: data?.id
    //     }).then((data) => {
    //         router.push(`/live/${data.data.id}`)
    //     }).catch((err) => {
    //         toast.error("Error");
    //     })
    // },[router,data?.id])

    return (
        <div className={clsx(`rounded-lg p-6 w-6/12`,small && 'sm:w-80')}>
            <div className="flex flex-col items-center mb-6 gap-y-5">
                <div className="text-center">
                    <p className={clsx(`text-2xl font-medium text-white`, small && 'text-lg')}>
                        { data?.league.name } 
                    </p>
                </div>
                { data?.commentator && (
                <div className="text-center">
                    <p className={clsx(`text-2xl font-medium text-white`, small && 'text-lg')}>    
                        BLV: {data?.commentator}
                    </p>
                </div>
                )}
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="text-center">
                    <img src={data?.homeTeam.logo || ""} alt="Team Logo" className={!small ? 'w-24 h-24' : 'w-12 h-12'} />
                    { !small && (
                        <div className="text-white font-semibold mt-1 text-2xl">{data?.homeTeam.name}</div>
                    )}
                </div>
                <div className="text-4xl text-white font-semibold">VS</div>
                <div className="text-center">
                    <img src={data?.awayTeam.logo || ""} alt="Team Logo" className={!small ? 'w-24 h-24' : 'w-12 h-12'}/>
                    { !small && (
                        <div className="text-white font-semibold mt-1 text-2xl">{data?.awayTeam.name}</div>
                    )}
                </div>
            </div>            
            <div className={clsx(`text-center text-white text-lg mb-4`, small && 'text-sm')}>
                <span className="mr-4">Stadium: <span className="font-semibold">{data?.stadium}</span></span>
            </div>
            <div className={clsx(`text-center text-white text-base`, small && 'text-xs')}>
                { format(new Date(data?.time || new Date()),'HH:mm, LLLL d, yyyy') }
            </div>
            { !nobutton  && (
                <div className="flex justify-center">
                    <Button onClick={() => {router.push(`/live/${data?.id}`)}} variant="destructive" className="mt-5 font-semibold">{ data?.start ? "ĐANG DIỄN RA" : "SẮP DIỄN RA" }</Button>
                </div>
            )}
        </div>
    );
}

export default Match;