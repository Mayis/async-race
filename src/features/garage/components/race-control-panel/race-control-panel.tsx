import Button from "@/common/components/button/button";
import Modal from "@/common/components/modal/modal";
import { useBoolean } from "@/common/hooks/index.hooks";
import CreateCar from "@/features/garage/components/garage-actions/car-actions/create-car";
import useGenerateCars from "@/features/garage/hooks/use-generate-cars.hook";
import useManageRace from "@/features/garage/hooks/use-manage-race.hook";

import React, { useCallback } from "react";

function RaceControlPanel() {
  const { canReset, handleAllCarsEngineActions, raceType, resetCars } = useManageRace();
  const { generateCars } = useGenerateCars();
  const { value, setTrue, setFalse } = useBoolean();

  const startRace = useCallback(async () => {
    await handleAllCarsEngineActions();
  }, [handleAllCarsEngineActions]);

  const resetRace = useCallback(async () => {
    await resetCars();
  }, [resetCars]);

  return (
    <div className="flex flex-row py-4 items-center px-16">
      <div className="flex flex-row space-x-6">
        <div>
          <Button disabled={!!raceType} icon="start-race" onClick={startRace}>
            Start Race
          </Button>
        </div>
        <div>
          <Button onClick={resetRace} disabled={!canReset} icon="reset">
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
