import React from "react";
import { EngineStatus } from "@/api/slices/engine/types";
import IconButton from "@/common/components/button/icon-button";
import { useEngineActions } from "@/features/garage/hooks/use-engine.hook";

interface Props {
  id: number;
}

function RaceActions({ id }: Props) {
  const { updateCarEngine } = useEngineActions();

  return (
    <div className="flex flex-col space-y-2 items-center">
      <IconButton
        iconSize={16}
        icon="start"
        onClick={() => {
          updateCarEngine({
            id,
            status: EngineStatus.started,
            reset: false
          });
        }}
      />
      <IconButton
        iconSize={16}
        icon="stop"
        onClick={() =>
          updateCarEngine({
            id,
            status: EngineStatus.stopped,
            reset: true
          })
        }
      />
    </div>
  );
}

export default RaceActions;
