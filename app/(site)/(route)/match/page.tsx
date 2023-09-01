"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { times } from 'lodash';
import FixtureList from "./components/FixtureList";
import { useState } from "react";

const Match = () => {
    const [round, setRound] = useState("1");

    const RoundChange = async (event: any) => {
        setRound(event.target.value);
    }

    // const test = () => {
    //     const data = {
    //         stadium: "Emirates",
    //         time: new Date(2023,8,3,22,30),
    //         homeTeam: "Arsenal",
    //         awayTeam: "Man Utd",
    //         round: 4,
    //     }

    //     axios.post('/api/team', data);
    // }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between">
                    <Heading title="Match" description="Manage match" />
                    {/* <Button onClick={test}>
                    </Button> */}
                </div>
                <Separator />
                <div className="mt-5">
                    <label htmlFor="round" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an round</label>
                    <select id="round" defaultValue="1" onChange={RoundChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {
                            times(38, (id) => (
                                id !== 0 && (
                                    <option key={id} value={id.toString()}>{id}</option>
                                )
                            ))
                        }
                    </select>
                </div>
                <FixtureList round={round} />
            </div>
        </div>
    );
}

export default Match;