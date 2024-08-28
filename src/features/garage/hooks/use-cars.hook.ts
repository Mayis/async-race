import { useCarsResponse } from "@/features/garage/hooks/use-cars-response.hook";
import useGarageStore from "@/features/garage/store/use-garage-store";
import { useCallback, useEffect, useState } from "react";

export default function useCars() {
  const { cars, setCars } = useGarageStore(state => ({
    cars: state.cars,
    setCars: state.setCars
  }));

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { getCarsResponse } = useCarsResponse();

  const getCars = useCallback(async () => {
    const rsp = await getCarsResponse({
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
      setError(rsp.error.message);
    }
    setCars(rsp.data!.items);
  }, [getCarsResponse, setCars]);

  useEffect(() => {
    if (!cars.length) {
      getCars();
    }
  }, [getCars, cars]);

  return {
    cars,
    loading,
    error
  };
}
