import { EngineStatus } from "@/api/slices/engine/types";
import { CarCondition } from "@/api/slices/garage/types";
import useEngineResponse from "@/features/garage/hooks/use-engine-response.hook";
import useGarageStore from "@/features/store/use-garage-store";
import { useCallback, useState } from "react";

export function useEngineActions() {
  const { patchCarEngine, patchEngineStatus } = useEngineResponse();
  const { updateCarEngineInStore, updateCarStatus, updateCar } = useGarageStore(state => ({
    updateCarEngineInStore: state.updateCarEngine,
    updateCarStatus: state.updateCarStatus,
    updateCar: state.updateCar
  }));

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateCarEngine = useCallback(
    async ({ id, status, reset }: { id: number; status: EngineStatus.started | EngineStatus.stopped; reset?: boolean }) => {
      const engineStatusRsp = await patchCarEngine({
        id,
        status,
        callbacks: { beforeAPICall: () => setLoading(true), afterAPICall: () => setLoading(false) }
      });
      if (engineStatusRsp.error) {
        setError(engineStatusRsp.error.message);
      }

      updateCarEngineInStore({ id, engine: engineStatusRsp.data! });
      if (reset) {
        updateCar({ id, car: { position: 0, condition: CarCondition.running } });
      }

      if (engineStatusRsp.data && status === EngineStatus.started) {
        const engineRsp = await patchEngineStatus({
          id,
          callbacks: { beforeAPICall: () => setLoading(true), afterAPICall: () => setLoading(false) }
        });
        if (engineRsp.error) {
          setError(engineRsp.error.message);
          updateCar({ id, car: { condition: CarCondition.broken } });
          updateCarStatus({ id, status: EngineStatus.stopped });
          return { status: EngineStatus.stopped };
        } else {
          updateCarStatus({ id, status: EngineStatus.drive });
          return { status: EngineStatus.drive };
        }
      }
      return { status: engineStatusRsp.data!.status };
    },

    [patchCarEngine, setLoading, setError, updateCarEngineInStore, patchEngineStatus, updateCarStatus, updateCar]
  );

  return {
    updateCarEngine,
    engineLoading: loading,
    engineError: error
  };
}
