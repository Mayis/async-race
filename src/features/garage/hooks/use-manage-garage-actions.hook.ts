import useCars from "@/features/garage/hooks/use-cars.hook";
import useGarageActions from "@/features/garage/hooks/use-garage-actions";
import useGarageStore from "@/features/store/use-garage-store";
import { useState } from "react";

export default function useManageGarageActions() {
  const { removeCar, updateCar } = useGarageStore(state => ({
    removeCar: state.removeCar,
    updateCar: state.updateCar
  }));
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { createCar: createCarRsp, deleteCar: removeCarRsp, updateCar: updateCarRsp } = useGarageActions();
  const { reloadOnCreate } = useCars();

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
    reloadOnCreate();
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
    if (rsp.data) {
      updateCar({
        id,
        car: rsp.data
      });
    }
  };

  return {
    createCarAction,
    removeCarAction,
    updateCarAction,
    error,
    loading
  };
}
