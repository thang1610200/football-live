
import Fixture from "./Fixture";
import useMatchbyRound from "@/app/hook/useMatchbyRound";
import LoadingModal from "@/components/ui/loadingmodal";

interface FixtureListProps {
    round: string
}

const FixtureList:React.FC<FixtureListProps> = ({
    round
}) => {
    const { data: matchs = [] , isLoading } = useMatchbyRound(round);

    if(isLoading){
        return (
            <LoadingModal />
        )
    }


    return (
        <div className="grid grid-cols-4 mb-4 rounded gap-2">
            {
                matchs.map((match) => (
                    <Fixture key={match.id} data={match} />
                ))
            }
        </div>
    );
}

export default FixtureList;