import useWinnerStore from "@/features/store/use-winner-store";
import useWinnersActions from "@/features/winner/hooks/use-winners";
import { useCallback, useState } from "react";

export default function useUpdateWinner() {
  const { updateWinner } = useWinnersActions();
  const updateWinnerInStore = useWinnerStore(state => state.updateWinner);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateWinnerAction = useCallback(
    async ({ id, wins, time }: { id: number; wins: number; time: number }) => {
      const response = await updateWinner({
        id,
        wins,
        time,
        callbacks: { beforeAPICall: () => setLoading(true), afterAPICall: () => setLoading(false) }
      });
      if (response.error) {
        setError(response.error.message);
      } else {
        updateWinnerInStore({ id, winner: response.data! });
      }
    },
    [updateWinner, setLoading, setError, updateWinnerInStore]
  );
  return {
    updateWinnerAction,
    loading,
    error
  };
}
