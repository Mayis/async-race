import useWinnerStore from "@/features/store/use-winner-store";
import useWinners from "@/features/winner/hooks/use-winners";
import { useCallback, useEffect, useState } from "react";

export default function useWinnersTable() {
  const { getWinners } = useWinners();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasInitializedStore, setHasInitializedStore] = useState(false);
  const { setWinners, winners, setActivePage } = useWinnerStore(state => ({
    setWinners: state.setAllWinners,
    winners: state.allWinners,
    setActivePage: state.setActivePage
  }));

  const getWinnersRsp = useCallback(
    async (page: number) => {
      const response = await getWinners({
        requestParams: { limit: 10, page },
        callbacks: {
          beforeAPICall: () => setLoading(true),
          afterAPICall: () => setLoading(false)
        }
      });
      if (response.error) {
        setError(response.error.message);
        return;
      }
      setWinners({
        ...winners,
        [page.toString()]: response.data!.items
      });
      setActivePage(page);
    },
    [getWinners, setWinners, setActivePage, winners]
  );

  useEffect(() => {
    if (!hasInitializedStore && typeof window !== "undefined") {
      setHasInitializedStore(true);
    }
    if (hasInitializedStore && !winners[page]?.length) {
      getWinnersRsp(page);
    } else {
      setActivePage(page);
    }
  }, [getWinnersRsp, winners, hasInitializedStore, page, setActivePage]);

  return {
    loading,
    error,
    winners: winners[page] || [],
    page,
    setPage
  };
}
