"use client";

import Match from "@/app/(site)/components/Match";
import MatchLive from "./components/MatchLive";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import Chat from "./components/Chat";
import useMatchList from "@/app/hook/useMatchList";
import useMatchLive from "@/app/hook/useMatchLive";
import LoadingModal from "@/components/ui/loadingmodal";
import Video from "./components/Video";
import useMatch from "@/app/hook/useMatch";

const LiveMatch = () => {
    const { MatchId } = useMatch();
    const { data : match = [] } = useMatchList();
    const { data, error, isLoading } = useMatchLive(MatchId);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(isOpen => !isOpen);
    }

    if(error){
        return (<p>error: {error.response?.status}</p>)
    }

    if(isLoading){
        return (<LoadingModal />);
    }

    return (
        <>
            <section className="bg-cover bg-[url('/images/section.jpg')] bg-center">
                <div className="flex justify-center items-center h-full">
                    <Match data={data} nobutton />
                </div>
            </section>
            <div className="container mx-auto py-8 min-w-full">
                <div className="grid grid-cols-6 gap-4">
                    <div className="bg-gray-200 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Danh sách trận đấu</h2>
                        <ul className="space-y-4">
                            { match.map((items: any) => (
                                <MatchLive key={items.id} data={items} />
                            )) }
                        </ul>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-lg col-start-2 col-span-4 max-h-[635px]">
                        <Video data={data} />
                    </div>
                    <div>
                        <Button onClick={toggle} className="bg-blue-500 text-white w-full mb-2">Đóng/Mở Chat</Button>
                        {
                            isOpen && (
                                <Chat />  
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default LiveMatch;