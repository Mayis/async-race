import CarActions from "@/features/garage/components/garage-actions/car-actions/car-actions";
import RaceActions from "@/features/garage/components/garage-actions/race-actions/race-actions";
import React, { PropsWithChildren } from "react";

interface Props {
  id: number;
  engineStatus: string;
}

function GarageActions({ id, children }: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-row space-x-4 items-center w-full h-[100px] rounded-xl overflow-hidden">
      <div>
        <CarActions id={id} />
      </div>
      <div>
        <RaceActions id={id} />
      </div>
      <div className=" relative w-full h-full flex items-center bg-[#52504f]">
        <div className="absolute top-1/2 left-0 w-full h-[2px] border-t-2 border-dashed border-white transform -translate-y-1/2"></div>
        {children}
      </div>
    </div>
  );
}

export default GarageActions;
