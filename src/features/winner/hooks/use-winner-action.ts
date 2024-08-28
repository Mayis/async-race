import useWinnerStore from "@/features/store/use-winner-store";
import useWinners from "@/features/winner/hooks/use-winners";
import { useCallback, useState } from "react";

export default function useWinnerAction() {
  const { createWinner, updateWinner } = useWinners();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createWinnerInStore, updateWinnerInStore, getWinner } = useWinnerStore(state => ({
    createWinnerInStore: state.createWinner,
    updateWinnerInStore: state.updateWinner,
    getWinner: state.getWinner
  }));

  const handleWinnerAction = useCallback(
    async ({ id, time }: { id: number; time: number }) => {
      const winner = getWinner(id);

      if (winner) {
        const rsp = await updateWinner({
          id: winner.id,
          wins: winner.wins + 1,
          time,
          callbacks: {
            beforeAPICall: () => setLoading(true),
            afterAPICall: () => setLoading(false)
          }
        });
        if (rsp.error) {
          setError(rsp.error.message);
        } else {
          updateWinnerInStore({ id, winner: rsp.data! });
        }
      } else {
        const rsp = await createWinner({
          winner: { wins: 1, time },
          callbacks: {
            beforeAPICall: () => setLoading(true),
            afterAPICall: () => setLoading(false)
          }
        });
        if (rsp.error) {
          setError(rsp.error.message);
        } else {
          createWinnerInStore({ ...rsp.data!, carId: id });
        }
      }
    },
    [getWinner, updateWinner, setLoading, setError, updateWinnerInStore, createWinnerInStore, createWinner]
  );

  return { handleWinnerAction, loading, error };
}
