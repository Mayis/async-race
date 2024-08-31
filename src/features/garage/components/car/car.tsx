import { EngineStatus } from "@/api/slices/engine/types";
import { Car as CarEntity } from "@/api/slices/garage/entity";
import { CarCondition } from "@/api/slices/garage/types";
import CarIcon from "@/features/garage/components/car/car-icon";
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
  const { updateCarPosition, updateCarStatus, carCondition } = useGarageStore(store => ({
    updateCarPosition: store.updateCar,
    updateCarStatus: store.updateCarStatus,
    carCondition: store.getCar(id)?.condition,
    updateCarCondition: (condition: CarCondition) => store.updateCar({ id, car: { condition } })
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

  const handlePosition = useCallback(
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
    condition: carCondition || CarCondition.running,
    onReachTheEnd: carReachTheEnd,
    handlePosition
  });

  return (
    <div ref={carRef}>
      <CarIcon color={car.color} />
    </div>
  );
}

export default Car;
