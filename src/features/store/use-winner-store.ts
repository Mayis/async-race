import { Winner } from "@/api/slices/winners/entity";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RaceType = "single" | "multi";

interface WinnerWithCarId extends Winner {
  carId: number;
}
interface WinnerStore {
  winners: WinnerWithCarId[];
  raceWinnerId: number | null;
  raceType: RaceType | null;
}

interface WinnerStoreAction {
  setWinners: (winner: WinnerWithCarId[]) => void;
  createWinner: (winner: WinnerWithCarId) => void;
  updateWinner: ({ id, winner }: { id: number; winner: Partial<Winner> }) => void;
  removeWinner: (id: number) => void;
  setRaceWinnerId: (id: number | null) => void;
  setRaceType: (raceType: RaceType | null) => void;
  getWinner: (id: number) => WinnerWithCarId | undefined;
}

const useWinnerStore = create<WinnerStore & WinnerStoreAction>()(
  persist(
    (set, get) => ({
      winners: [],
      raceWinnerId: null,
      raceType: null,
      setWinners(winners) {
        set(() => ({ winners }));
      },
      setRaceType(raceType) {
        set(() => ({ raceType }));
      },
      removeWinner(id) {
        set(state => ({ winners: state.winners.filter(winner => winner.id !== id) }));
      },
      updateWinner({ id, winner }) {
        set(state => ({
          winners: state.winners.map(w => (w.carId === id ? { ...w, ...winner } : w))
        }));
      },
      createWinner(winner) {
        set(state => ({
          winners: [...state.winners, winner]
        }));
      },
      setRaceWinnerId(raceWinnerId) {
        set(() => ({ raceWinnerId }));
      },
      getWinner(id) {
        const winner = get().winners.find(winner => winner.carId === id);
        return winner;
      }
    }),
    {
      name: "winner-storage"
    }
  )
);

export default useWinnerStore;
