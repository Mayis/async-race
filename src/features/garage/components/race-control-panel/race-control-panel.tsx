import Button from "@/common/components/button/button";
import Modal from "@/common/components/modal/modal";
import { useBoolean } from "@/common/hooks/index.hooks";
import CreateCar from "@/features/garage/components/garage-actions/car-actions/create-car";
import useGenerateCars from "@/features/garage/hooks/use-generate-cars.hook";
import useRace from "@/features/garage/hooks/use-race.hook";
import useResetCars from "@/features/garage/hooks/use-reset-race.hook";
import useGarageStore from "@/features/store/use-garage-store";

import useWinnerStore from "@/features/store/use-winner-store";
import React, { useCallback } from "react";

function RaceControlPanel() {
  const { handleAllCarsEngineActions } = useRace();
  const { resetCars } = useResetCars();
  const { generateCars } = useGenerateCars();
  const { value, setTrue, setFalse } = useBoolean();
  const { setRaceType, raceType } = useWinnerStore(state => ({
    setRaceType: state.setRaceType,
    raceType: state.raceType
  }));
  const { canReset } = useGarageStore(state => ({
    canReset: state.cars[state.activePage].some(car => car.position === 0)
  }));
  const startRace = useCallback(async () => {
    setRaceType("multi");
    await handleAllCarsEngineActions();
  }, [setRaceType, handleAllCarsEngineActions]);

  const resetRace = useCallback(async () => {
    setRaceType(null);
    await resetCars();
  }, [resetCars, setRaceType]);

  return (
    <div className="flex flex-row py-4 items-center px-16">
      <div className="flex flex-row space-x-6">
        <div>
          <Button disabled={!!raceType} icon="start-race" onClick={startRace}>
            Start Race
          </Button>
        </div>
        <div>
          <Button onClick={resetRace} disabled={canReset} icon="reset">
            Reset
          </Button>
        </div>
        <div>
          <Button onClick={setTrue} icon="create">
            Create
          </Button>
        </div>
      </div>
      <div className="flex flex-1 flex-row items-center justify-end">
        <div>
          <Button onClick={generateCars} disabled={!!raceType} icon="random">
            Generate Cars
          </Button>
        </div>
      </div>
      <Modal isOpen={value}>
        <CreateCar onClose={setFalse} />
      </Modal>
    </div>
  );
}

export default RaceControlPanel;
