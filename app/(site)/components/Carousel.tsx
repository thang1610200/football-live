"use client";

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Match from "./Match";
import { FullMatch } from "@/app/types";

interface CarouselBoxProps {
  data: FullMatch[]
}

const CarouselBox:React.FC<CarouselBoxProps> = ({
  data
}) => {
  const animation = { duration: 15000, easing: (t: number) => t }
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    rtl: true,
    slides: {
      perView: 3,
      spacing: 10,
    },
    created(s) {
      s.moveToIdx(5, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
  })
  return (
    <div ref={ref} className="w-full relative flex items-center justify-center keen-slider">
      {
        data.map((match) => (
          <div key={match.id} className="keen-slider__slide"><Match data={match} small /></div>
        ))
      }
    </div>
  );
}

export default CarouselBox;