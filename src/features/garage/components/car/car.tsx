import { EngineStatus } from "@/api/slices/engine/types";
import { Car as CarEntity } from "@/api/slices/garage/entity";
import useCarAnimation from "@/features/garage/hooks/use-car-animation";
import useGarageStore from "@/features/store/use-garage-store";
import { RaceType } from "@/features/store/use-winner-store";
import useWinnerAction from "@/features/winner/hooks/use-winner-action";
import React, { useCallback } from "react";

interface Props {
  car: CarEntity;
  winnerId: number | null;
  setWinnerId: (id: number) => void;
  raceType: RaceType | null;
}

function Car({ car, winnerId, setWinnerId, raceType }: Props) {
  const { id } = car;
  const { updateCarPosition, updateCarStatus } = useGarageStore(store => ({
    updateCarPosition: store.updateCar,
    updateCarStatus: store.updateCarStatus
  }));

  const { handleWinnerAction } = useWinnerAction();

  const carReachTheEnd = (position: number, time: number) => {
    updateCarPosition({
      id,
      car: { position }
    });
    updateCarStatus({
      id,
      status: EngineStatus.stopped
    });
    if (!winnerId) {
      if (raceType == "multi") {
        setWinnerId(id);
      }
      handleWinnerAction({ id, time });
    }
  };

  const onStop = useCallback(
    (position: number) => {
      updateCarPosition({
        id,
        car: { position }
      });
    },
    [updateCarPosition, id]
  );
  const { carRef } = useCarAnimation({
    initialPosition: car.position,
    speed: car.engine.velocity,
    status: car.engine.status,
    onReachTheEnd: carReachTheEnd,
    onStop
  });

  return (
    <div
      ref={carRef}
      style={{
        width: "150px",
        backgroundColor: car.color
      }}
    >
      {car.name}
    </div>
  );
}

export default Car;
