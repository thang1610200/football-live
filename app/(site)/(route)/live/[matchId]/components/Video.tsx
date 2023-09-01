"use client";

import { FullMatch } from "@/app/types";

interface VideoProps {
    data?: FullMatch
}

const Video:React.FC<VideoProps> = ({
    data
}) => {
    return (
        <>
            <div className="aspect-video mb-4">
                {
                    !data?.link ? (
                        <img src="https://static.fastlycdnlive.xyz/cakhia/cakhia35/user/img/chua-dien-ra.jpeg" className="w-full h-[600px]"/>
                    ) : (
                        <iframe src={`https://viewer.millicast.com?streamId=urba4e/${data.link}&play=false&liveBadge=false&userCount=false&disableSettings=true&image=https://static.fastlycdnlive.xyz/cakhia/cakhia35/user/img/chua-dien-ra.jpeg`} className="w-full h-[600px]"></iframe>
                    )
                }
            </div>
        </>
    );
}

export default Video;