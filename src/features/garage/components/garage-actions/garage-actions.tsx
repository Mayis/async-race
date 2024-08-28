import CarActions from "@/features/garage/components/garage-actions/car-actions/car-actions";
import RaceActions from "@/features/garage/components/garage-actions/race-actions/race-actions";
import React, { PropsWithChildren } from "react";

interface Props {
  id: number;
  engineStatus: string;
}

function GarageActions({ id, children }: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-row space-x-4 items-center">
      <div>
        <CarActions id={id} />
      </div>
      <div>
        <RaceActions id={id} />
      </div>
      <div>{children}</div>
    </div>
  );
}

export default GarageActions;
