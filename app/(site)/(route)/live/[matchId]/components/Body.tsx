"use client";

import useMatch from "@/app/hook/useMatch";
import { FullMessage } from "@/app/types";
import { pusherClient } from "@/lib/pusher";
import { useEffect, useRef, useState } from "react";
import { find } from 'lodash';

interface BodyProps {
    initMessage: FullMessage[]
}

const Body: React.FC<BodyProps> = ({
    initMessage
}) => {
    const { MatchId } = useMatch();
    const [messages, setMessages] = useState(initMessage);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        pusherClient.subscribe(MatchId);
        bottomRef?.current?.scrollIntoView();

        const handleNewMessage = (message: FullMessage) => {
            setMessages((current) => {
                if (find(current, { id: message.id })) {
                  return current;
                }
        
                return [...current, message]
            });
            //bottomRef?.current?.scrollIntoView();
        }

        pusherClient.bind("messages:new",handleNewMessage);

        return () => {
            pusherClient.unsubscribe(MatchId)
            pusherClient.unbind('messages:new', handleNewMessage)
        }
    },[MatchId])

    return (
        <div className="border rounded-lg p-2 h-128 overflow-y-auto">
            { messages.map((data, i) => (
                <div key={data.id} className="mb-2">
                    <strong>{ data.sender.name }:</strong> { data.body }
                </div>
            )) }
            <div ref={bottomRef} className="pt-24" />
        </div>
    );
}

export default Body;