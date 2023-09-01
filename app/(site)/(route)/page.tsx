import Match from "../components/Match";
import CarouselBox from "../components/Carousel";
import MatchBox from "../components/MatchBox";
import { find } from 'lodash';
import getMatchbyRound from "@/app/actions/getMatchbyRound";

export default async function Home (){
  const match = await getMatchbyRound();

  return (
    <>
      <section className="bg-cover bg-[url('/images/section.jpg')] bg-center">
        <div className="flex justify-center items-center h-full">

          <Match data={find(match,{"start": true}) || match[0]} />

        </div>
        <div className="bg-black bg-opacity-50 shadow-lg flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
          <CarouselBox data={match} />
        </div>
      </section>

      <div className="container mx-auto max-w-4xl max-h-screen overflow-auto mt-4">
        <h1 className="text-2xl font-bold mb-3">Đang diễn ra</h1>
        <hr className="border-t-2 border-yellow-400 mb-4"></hr>
        {
          match.map((data) => (
            data.start && (
              <MatchBox key={data.id} data={data} />
            )
          ))
        }
      </div>


      <div className="container mx-auto max-w-4xl max-h-screen overflow-auto mt-4">
        <h1 className="text-2xl font-bold mb-3">Sắp diễn ra</h1>
        <hr className="border-t-2 border-yellow-400 mb-4"></hr>
        {
          match.map((data) => (
            !data.start && (
              <MatchBox key={data.id} data={data} />
            )
          ))
        }
      </div>
    </>
  )
}