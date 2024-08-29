import { useCarsResponse } from "@/features/garage/hooks/use-cars-response.hook";
import useGarageStore from "@/features/store/use-garage-store";
import { useCallback, useEffect, useState } from "react";

const limit = 9;
export default function useCars() {
  const { cars, setCars, setPagesLength, pagesLength, setActivePage } = useGarageStore(state => ({
    cars: state.cars,
    setCars: state.setCars,
    setPagesLength: state.setPagesLength,
    pagesLength: state.pagesLength,
    setActivePage: state.setActivePage
  }));
  const [hasInitializedStore, setHasInitializedStore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { getCarsResponse } = useCarsResponse();
  const [page, setPage] = useState(1);
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
        return;
      }
      setCars({
        ...cars,
        [page!.toString()]: rsp.data!.items
      });
      setPagesLength(rsp.data!.length);
      setActivePage(page);
    },
    [getCarsResponse, setCars, cars, setPagesLength, setActivePage]
  );

  const reloadOnCreate = useCallback(() => {
    getCars(page);
  }, [page, getCars]);

  useEffect(() => {
    if (!hasInitializedStore && typeof window !== "undefined") {
      setHasInitializedStore(true);
    }
    if (hasInitializedStore && !cars[page]?.length) {
      // request made
      getCars(page);
    } else {
      setActivePage(page);
    }
  }, [getCars, cars, hasInitializedStore, page, setActivePage]);

  return {
    cars: cars[page] || [],
    activePage: page,
    setActivePage: setPage,
    loading,
    pagesLength,
    error,
    reloadOnCreate
  };
}
