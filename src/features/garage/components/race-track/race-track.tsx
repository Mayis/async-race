import React, { useCallback, useState } from "react";
import Track from "@/features/garage/components/race-track/track";
import GarageActions from "@/features/garage/components/garage-actions/garage-actions";
import useCars from "@/features/garage/hooks/use-cars.hook";
import Car from "@/features/garage/components/car/car";
import useWinnerStore from "@/features/store/use-winner-store";
import Modal from "@/common/components/modal/modal";
import WinnerModal from "@/features/winner/components/modal/winner-modal";

function RaceTrack() {
  const { cars, loading } = useCars();
  const [showWinner, setShowWinner] = useState(false);
  const { setRaceWinnerId, raceType, raceWinnerId } = useWinnerStore(state => ({
    raceWinnerId: state.raceWinnerId,
    setRaceWinnerId: state.setRaceWinnerId,
    raceType: state.raceType
  }));

  const announceWinner = useCallback(
    (id: number) => {
      setRaceWinnerId(id);
      setShowWinner(true);
    },
    [setRaceWinnerId, setShowWinner]
  );
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      {cars.map(car => (
        <Track key={car.id}>
          <GarageActions id={car.id} engineStatus={car.engine.status}>
            <div className="w-full relative">
              <div className="absolute left-[200px] z-10">{car.condition}</div>
              <Car car={car} setWinnerId={announceWinner} winnerId={raceWinnerId} raceType={raceType} />
            </div>
          </GarageActions>
        </Track>
      ))}
      <Modal isOpen={showWinner}>
        <WinnerModal id={raceWinnerId!} onClose={() => setShowWinner(false)} />
      </Modal>
    </div>
  );
}

export default RaceTrack;
