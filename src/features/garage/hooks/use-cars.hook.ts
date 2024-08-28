import { useCarsResponse } from "@/features/garage/hooks/use-cars-response.hook";
import useGarageStore from "@/features/store/use-garage-store";
import { useCallback, useEffect, useState } from "react";

const limit = 9;
export default function useCars() {
  const { cars, setCars } = useGarageStore(state => ({
    cars: state.cars,
    setCars: state.setCars
  }));
  const [hasInitializedStore, setHasInitializedStore] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { getCarsResponse } = useCarsResponse();

  const getCars = useCallback(
    async (page: number = 1) => {
      const rsp = await getCarsResponse({
        page,
        limit,
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
      setCars({
        ...cars,
        [page!.toString()]: rsp.data!.items
      });
    },
    [getCarsResponse, setCars, cars]
  );

  const reloadOnCreate = useCallback(() => {
    getCars(page);
  }, [page, getCars]);

  useEffect(() => {
    if (!hasInitializedStore && typeof window !== "undefined") {
      setHasInitializedStore(true);
    }
    if (hasInitializedStore && !cars[page].length) {
      getCars(page);
    }
  }, [getCars, cars, hasInitializedStore, page]);

  return {
    cars: cars[page] || [],
    page,
    changePage: (page: number) => setPage(page),
    loading,
    error,
    reloadOnCreate
  };
}
