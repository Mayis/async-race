import { EngineStatus } from "@/api/slices/engine/types";
import { Car as CarEntity } from "@/api/slices/garage/entity";
import useCarAnimation from "@/features/garage/hooks/use-car-animation";
import useGarageStore from "@/features/store/use-garage-store";
import useWinnerStore from "@/features/store/use-winner-store";
import useWinnerAction from "@/features/winner/hooks/use-winner-action";
import React, { useCallback } from "react";

interface Props {
  car: CarEntity;
}
function Car({ car }: Props) {
  const { id } = car;
  const { updateCarPosition, updateCarStatus } = useGarageStore(store => ({
    updateCarPosition: store.updateCar,
    updateCarStatus: store.updateCarStatus
  }));
  const { raceHasWinner, setRaceHasWinner, raceType } = useWinnerStore(state => ({
    raceHasWinner: state.raceHasWinner,
    setRaceHasWinner: state.setRaceHasWinner,
    raceType: state.raceType
  }));
  const { handleWinnerAction } = useWinnerAction();
  const carReachTheEnd = useCallback(
    (position: number, time: number) => {
      updateCarPosition({
        id,
        car: { position }
      });
      updateCarStatus({
        id,
        status: EngineStatus.stopped
      });
      if (!raceHasWinner) {
        if (raceType == "multi") {
          setRaceHasWinner(true);
        }
        handleWinnerAction({ id, time });
      }
      return;
    },
    [updateCarPosition, updateCarStatus, handleWinnerAction, raceHasWinner, setRaceHasWinner, id, raceType]
  );
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
