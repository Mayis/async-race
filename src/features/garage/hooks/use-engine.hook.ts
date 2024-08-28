import { EngineStatus } from "@/api/slices/engine/types";
import useEngineResponse from "@/features/garage/hooks/use-engine-response.hook";
import useGarageStore from "@/features/garage/store/use-garage-store";
import { useCallback, useState } from "react";

export function useEngineActions() {
  const { patchCarEngine, patchEngineStatus } = useEngineResponse();
  const { updateCarEngineInStore, updateCarStatus } = useGarageStore(state => ({
    updateCarEngineInStore: state.updateCarEngine,
    updateCarStatus: state.updateCarStatus
  }));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateCarEngine = useCallback(
    async ({ id, status }: { id: number; status: EngineStatus.started | EngineStatus.stopped }) => {
      const engineStatusRsp = await patchCarEngine({
        id,
        status,
        callbacks: { beforeAPICall: () => setLoading(true), afterAPICall: () => setLoading(false) }
      });
      if (engineStatusRsp.error) {
        setError(engineStatusRsp.error.message);
      }

      updateCarEngineInStore({ id, engine: engineStatusRsp.data! });
      if (engineStatusRsp.data && status === EngineStatus.started) {
        const engineRsp = await patchEngineStatus({
          id,
          callbacks: { beforeAPICall: () => setLoading(true), afterAPICall: () => setLoading(false) }
        });
        if (engineRsp.error) {
          setError(engineRsp.error.message);
          updateCarStatus({ id, status: EngineStatus.stopped });
        } else {
          updateCarStatus({ id, status: EngineStatus.drive });
        }
      }
    },

    [patchCarEngine, setLoading, setError, updateCarEngineInStore, patchEngineStatus, updateCarStatus]
  );

  return {
    updateCarEngine,
    engineLoading: loading,
    engineError: error
  };
}
