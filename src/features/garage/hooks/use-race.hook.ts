import { EngineStatus } from "@/api/slices/engine/types";
import { useEngineActions } from "@/features/garage/hooks/use-engine.hook";
import useGarageStore from "@/features/store/use-garage-store";
import useWinnerStore from "@/features/store/use-winner-store";
import { useCallback } from "react";

export default function useRace() {
  const { cars } = useGarageStore(state => ({
    cars: state.cars[state.activePage]
  }));
  const { setRaceType } = useWinnerStore(state => ({
    setRaceType: state.setRaceType
  }));
  const { updateCarEngine } = useEngineActions();

  const handleAllCarsEngineActions = useCallback(async () => {
    setRaceType("multi");
    const actions = cars.map(car => updateCarEngine({ id: car.id, status: EngineStatus.started }));
    await Promise.all(actions);
  }, [cars, updateCarEngine, setRaceType]);

  return { handleAllCarsEngineActions };
}
