import React from "react";
import { Car as CarEntity } from "@/api/slices/garage/entity";
import { CarCondition } from "@/api/slices/garage/types";
import CarIcon from "@/features/garage/components/car/car-icon";
import useCarAnimation from "@/features/garage/hooks/use-car-animation";
import { useManageCar } from "@/features/garage/hooks/use-manage-car.hook";
import { RaceType } from "@/features/store/use-winner-store";

interface Props {
  car: CarEntity;
  winnerId: number | null;
  announceWinner: (id: number) => void;
  raceType: RaceType | null;
}

function Car({ car, winnerId, announceWinner, raceType }: Props) {
  const { carCondition, carReachTheEnd, handlePosition } = useManageCar({ id: car.id, winnerId, announceWinner, raceType });

  const { carRef } = useCarAnimation({
    initialPosition: car.position,
    speed: car.engine.velocity,
    status: car.engine.status,
    condition: carCondition || CarCondition.running,
    onReachTheEnd: carReachTheEnd,
    handlePosition
  });

  return (
    <div ref={carRef} className="w-fit">
      <CarIcon color={car.color} />
    </div>
  );
}

export default Car;
