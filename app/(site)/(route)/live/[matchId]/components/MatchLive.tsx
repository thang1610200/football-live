import { FullMatch } from "@/app/types";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface MatchLiveProps {
    data: FullMatch
}

const MatchLive:React.FC<MatchLiveProps> = ({
    data
}) => {
    return (
        <li className="bg-white rounded-lg shadow-md p-2">
            <div className="flex flex-col items-center mb-2">
                <div className="text-center">
                    <p className="text-xs font-semibold">
                        {data.league.name}
                    </p>
                </div>
                { data?.commentator && (
                <div className="text-center mt-2">
                    <p className="text-xs font-semibold">
                        BLV: {data.commentator}
                    </p>
                </div>
                )}
            </div>
            <div className="flex justify-around items-center mb-2">
                <img src={data.homeTeam.logo || ""} alt="Team A Logo" className="w-8 h-8" />
                <div className="text-lg font-semibold">VS</div>
                <img src={data.awayTeam.logo || ""} alt="Team B Logo" className="w-8 h-8" />
            </div>
            <div className="text-center text-gray-600 mb-4">
                <span className="mr-3 text-xs">Stadium: <span className="font-semibold">{data.stadium}</span></span>
            </div>
            <div className="text-center text-blue-500 text-xs">
            { format(new Date(data?.time),'HH:mm, LLLL d, yyyy') }
            </div>
            <div className="flex justify-center mt-2">
                <Button variant="destructive" className="mt-4 text-xs">
                    { data?.start ? "ĐANG DIỄN RA" : "SẮP DIỄN RA" }
                </Button>
            </div>
        </li>
    );
}

export default MatchLive;