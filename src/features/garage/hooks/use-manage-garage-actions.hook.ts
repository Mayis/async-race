import useGarageActions from "@/features/garage/hooks/use-garage-actions";
import useGarageStore from "@/features/store/use-garage-store";
import { useState } from "react";

export default function useManageGarageActions() {
  const { createCar, removeCar, updateCar } = useGarageStore(state => ({
    createCar: state.createCar,
    removeCar: state.removeCar,
    updateCar: state.updateCar
  }));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { createCar: createCarRsp, deleteCar: removeCarRsp, updateCar: updateCarRsp } = useGarageActions();

  const createCarAction = async ({ name, color }: { name: string; color: string }) => {
    const rsp = await createCarRsp({
      name,
      color,
      callbacks: {
        beforeAPICall: () => {
          setLoading(true);
        },
        afterAPICall: () => {
          setLoading(false);
        }
      }
    });
    if (rsp.error) {
      setError(rsp.error);
      return;
    }
    createCar(rsp.data!);
  };

  const removeCarAction = async ({ id }: { id: number }) => {
    const rsp = await removeCarRsp({
      id,
      callbacks: {
        beforeAPICall: () => {
          setLoading(true);
        },
        afterAPICall: () => {
          setLoading(false);
        }
      }
    });
    if (rsp.error) {
      setError(rsp.error);
      return;
    }
    removeCar(id);
  };

  const updateCarAction = async ({ id, name, color }: { id: number; name: string; color: string }) => {
    const rsp = await updateCarRsp({
      id,
      name,
      color,
      callbacks: {
        beforeAPICall: () => {
          setLoading(true);
        },
        afterAPICall: () => {
          setLoading(false);
        }
      }
    });
    if (rsp.error) {
      setError(rsp.error);
      return;
    }
    updateCar({
      id,
      car: rsp.data!
    });
  };

  return {
    createCarAction,
    removeCarAction,
    updateCarAction,
    error,
    loading
  };
}
