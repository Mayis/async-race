import { useCallback } from "react";
import { EngineStatus } from "@/api/slices/engine/types";
import { CarCondition } from "@/api/slices/garage/types";
import useGarageStore from "@/features/store/use-garage-store";
import useWinnerAction from "@/features/winner/hooks/use-winner-action";
import type { RaceType } from "@/features/store/use-winner-store";

interface Props {
  id: number;
  raceType: RaceType | null;
  winnerId: number | null;
  announceWinner: (id: number) => void;
}
export function useManageCar({ id, winnerId, announceWinner, raceType }: Props) {
  const { updateCarPosition, updateCarStatus, carCondition } = useGarageStore(store => ({
    updateCarPosition: store.updateCar,
    updateCarStatus: store.updateCarStatus,
    carCondition: store.getCar(id)?.condition,
    updateCarCondition: (condition: CarCondition) => store.updateCar({ id, car: { condition } })
  }));

  const { handleWinnerAction } = useWinnerAction();

  const carReachTheEnd = async (position: number, time: number) => {
    updateCarPosition({
      id,
      car: { position }
    });
    updateCarStatus({
      id,
      status: EngineStatus.stopped
    });
    if (!winnerId) {
      await handleWinnerAction({ id, time });
      if (raceType == "multi") {
        announceWinner(id);
      }
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

  return { carReachTheEnd, handlePosition, carCondition };
}
