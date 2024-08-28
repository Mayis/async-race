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
    car: state.cars.find(car => car.id === id)
  }));

  return (
    <div className="bg-white rounded-2xl p-4">
      <h1>WINNER</h1>
      <p>{car?.name}</p>
      <p>{winner?.time}</p>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
}

export default WinnerModal;
