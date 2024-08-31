import { EngineStatus } from "@/api/slices/engine/types";
import { useEngineActions } from "@/features/garage/hooks/use-engine.hook";
import useGarageStore from "@/features/store/use-garage-store";
import useWinnerStore from "@/features/store/use-winner-store";
import { useCallback, useRef } from "react";

export default function useManageRace() {
  const { cars, resetCarsInStore } = useGarageStore(state => ({
    cars: state.cars[String(state.activePage)],
    resetCarsInStore: state.resetCars
  }));

  const onGoingRace = useRef(true);
  const canReset = cars?.some(car => car.position > 0) && onGoingRace.current;
  const { raceWinnerId, setRaceWinnerId, setRaceType, raceType } = useWinnerStore(state => ({
    raceWinnerId: state.raceWinnerId,
    setRaceWinnerId: state.setRaceWinnerId,
    setRaceType: state.setRaceType,
    raceType: state.raceType
  }));
  const { updateCarEngine } = useEngineActions();

  const handleAllCarsEngineActions = useCallback(async () => {
    setRaceType("multi");
    const actions = cars.map(car => updateCarEngine({ id: car.id, status: EngineStatus.started }));
    await Promise.all(actions);
    onGoingRace.current = true;
  }, [cars, updateCarEngine, setRaceType]);

  const resetCars = useCallback(async () => {
    setRaceType(null);
    const actions = cars.map(car => updateCarEngine({ id: car.id, status: EngineStatus.stopped }));
    resetCarsInStore();
    await Promise.all(actions);
    onGoingRace.current = false;
    if (raceWinnerId) {
      setRaceWinnerId(null);
    }
  }, [cars, updateCarEngine, resetCarsInStore, raceWinnerId, setRaceWinnerId, setRaceType]);

  return { handleAllCarsEngineActions, resetCars, canReset, raceType };
}
