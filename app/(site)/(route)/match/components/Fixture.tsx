"use client";
import { BiSolidLeftArrow } from "react-icons/bi";
import { Separator } from "@/components/ui/separator";
import { FullMatch } from "@/app/types";
import { format } from 'date-fns';

interface FixtureProps {
    data: FullMatch
}

const Fixture: React.FC<FixtureProps> = ({
    data
}) => {
    return (
        <div className="grid grid-cols-4 col-span-2 h-36 border border-slate-400">
            <div className="flex flex-col justify-center col-span-2 ml-5">
                <div className="flex items-center mb-3.5">
                    <img src={data.homeTeam.logo || ""} alt="Logo Team 1" className="w-8 h-8 mr-2" />
                    <p>{data.homeTeam.name}</p>
                </div>
                <div className="flex items-center mt-3.5">
                    <img src={data.awayTeam.logo || ""} alt="Logo Team 2" className="w-8 h-8 mr-2" />
                    <p>{data.awayTeam.name}</p>
                </div>
            </div>
            <div className="flex flex-col items-end justify-center col-span-1">
                <div className="flex items-center mb-3.5">
                    {/* <p className="mr-3">1</p>
                    <BiSolidLeftArrow size={15} /> */}
                </div>
                <div className="flex items-center mt-3.5">
                    {/* <p className="mr-7">1</p> */}
                </div>
            </div>
            <div className="flex justify-start">
                <Separator decorative orientation='vertical' className="h-3/4 my-5 items-start" />
                <div className="flex flex-col justify-center items-center ml-12">
                    <div className="text-sm">
                        { format(new Date(data.time),'EEE, dd/MM') }
                    </div>
                    <div className="text-sm">
                        { format(new Date(data.time),'HH:mm') }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Fixture;