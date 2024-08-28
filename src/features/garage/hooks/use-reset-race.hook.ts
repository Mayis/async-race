import { EngineStatus } from "@/api/slices/engine/types";
import { useEngineActions } from "@/features/garage/hooks/use-engine.hook";
import useGarageStore from "@/features/store/use-garage-store";
import useWinnerStore from "@/features/store/use-winner-store";
import { useCallback } from "react";

export default function useResetCars() {
  const { cars, resetCarsInStore } = useGarageStore(state => ({
    cars: state.cars[state.activePage],
    resetCarsInStore: state.resetCars
  }));
  const { raceWinnerId, setRaceWinnerId } = useWinnerStore(state => ({
    raceWinnerId: state.raceWinnerId,
    setRaceWinnerId: state.setRaceWinnerId
  }));
  const { updateCarEngine } = useEngineActions();

  const resetCars = useCallback(async () => {
    const actions = cars.map(car => updateCarEngine({ id: car.id, status: EngineStatus.stopped }));
    resetCarsInStore();
    await Promise.all(actions);
    if (raceWinnerId) {
      setRaceWinnerId(null);
    }
  }, [cars, updateCarEngine, resetCarsInStore, raceWinnerId, setRaceWinnerId]);
  return { resetCars };
}
