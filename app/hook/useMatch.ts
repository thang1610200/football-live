import { useMemo } from "react";
import { useParams } from "next/navigation";

const useMatch = () => {
    const params = useParams();

    const MatchId = useMemo(() => {
        if(!params?.matchId ){
            return "";
        }

        return params?.matchId as string
    },[params?.matchId])

    return useMemo(() => ({
        MatchId
    }),[MatchId])
}

export default useMatch;