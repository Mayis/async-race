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
    <div
      className="relative bg-white rounded-2xl p-6 backdrop-blur-md shadow-neon border-4 border-neon-green"
      style={{ maxWidth: "400px", margin: "auto" }}
    >
      <h1>WINNER</h1>
      <p>{car?.name}</p>
      <p>{winner?.time}</p>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
}

export default WinnerModal;
