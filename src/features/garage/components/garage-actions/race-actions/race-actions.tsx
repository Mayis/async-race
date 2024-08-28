import React, { useCallback } from "react";
import { EngineStatus } from "@/api/slices/engine/types";
import IconButton from "@/common/components/button/icon-button";
import { useEngineActions } from "@/features/garage/hooks/use-engine.hook";
import useWinnerStore, { RaceType } from "@/features/store/use-winner-store";

interface Props {
  id: number;
}

function RaceActions({ id }: Props) {
  const { updateCarEngine } = useEngineActions();
  const { setRaceType } = useWinnerStore(state => ({
    setRaceType: state.setRaceType
  }));
  const raceStart = useCallback(
    async ({ type, status }: { type: RaceType | null; status: EngineStatus.started | EngineStatus.stopped }) => {
      setRaceType(type);

      await updateCarEngine({
        id,
        status,
        reset: false
      });
    },
    [id, setRaceType, updateCarEngine]
  );

  return (
    <div className="flex flex-col space-y-2 items-center">
      <IconButton
        iconSize={16}
        icon="start"
        onClick={() =>
          raceStart({
            type: "single",
            status: EngineStatus.started
          })
        }
      />
      <IconButton
        iconSize={16}
        icon="stop"
        onClick={() =>
          raceStart({
            type: null,
            status: EngineStatus.stopped
          })
        }
      />
    </div>
  );
}

export default RaceActions;
