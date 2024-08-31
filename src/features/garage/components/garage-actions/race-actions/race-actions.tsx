import React, { useCallback } from "react";
import { EngineStatus } from "@/api/slices/engine/types";
import IconButton from "@/common/components/button/icon-button";
import { useEngineActions } from "@/features/garage/hooks/use-engine.hook";
import useWinnerStore, { RaceType } from "@/features/store/use-winner-store";
import useGarageStore from "@/features/store/use-garage-store";

interface Props {
  id: number;
}

function RaceActions({ id }: Props) {
  const { updateRaceCondition, startEnable } = useSingleRage({ id });

  return (
    <div className="flex flex-col space-y-2 items-center">
      <IconButton
        iconSize={16}
        icon="start"
        disabled={!startEnable}
        onClick={() =>
          updateRaceCondition({
            type: "single",
            status: EngineStatus.started,
            reset: false
          })
        }
      />
      <IconButton
        iconSize={16}
        icon="stop"
        disabled={startEnable}
        onClick={() =>
          updateRaceCondition({
            type: null,
            status: EngineStatus.stopped,
            reset: true
          })
        }
      />
    </div>
  );
}

export default RaceActions;

function useSingleRage({ id }: { id: number }) {
  const { updateCarEngine } = useEngineActions();
  const { car } = useGarageStore(state => ({
    updateCar: state.updateCar,
    car: state.getCar(id)
  }));

  const { setRaceType } = useWinnerStore(state => ({
    setRaceType: state.setRaceType
  }));

  const updateRaceCondition = useCallback(
    async ({
      type,
      status,
      reset
    }: {
      type: RaceType | null;
      status: EngineStatus.started | EngineStatus.stopped;
      reset: boolean;
    }) => {
      setRaceType(type);
      await updateCarEngine({
        id,
        status,
        reset
      });
    },
    [setRaceType, updateCarEngine, id]
  );
  const startEnable = car?.position === 0;
  return { updateRaceCondition, startEnable };
}
