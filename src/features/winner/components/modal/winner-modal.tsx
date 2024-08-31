import Button from "@/common/components/button/button";
import useGarageStore from "@/features/store/use-garage-store";
import useWinnerStore from "@/features/store/use-winner-store";
import React from "react";

interface Props {
  id: number;
  onClose: () => void;
}
function WinnerModal({ id, onClose }: Props) {
  const { winner } = useWinnerStore(state => ({
    winner: state.getWinner(id)
  }));

  const { car } = useGarageStore(state => ({
    car: state.getCar(id)
  }));

  return (
    <div className="relative bg-white w-[400px] flex items-center justify-center rounded-2xl p-6 backdrop-blur-md shadow-neon border-4 border-neon-green">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-[40px] font-bold">WINNER</h1>
        <p className="text-[32px] font-semibold text-gray-700">{car?.name}</p>
        <p>{winner?.time}</p>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}

export default WinnerModal;
