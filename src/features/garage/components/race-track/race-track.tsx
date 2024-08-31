import React, { useCallback, useState } from "react";
import GarageActions from "@/features/garage/components/garage-actions/garage-actions";
import useCars from "@/features/garage/hooks/use-cars.hook";
import Car from "@/features/garage/components/car/car";
import useWinnerStore from "@/features/store/use-winner-store";
import Modal from "@/common/components/modal/modal";
import WinnerModal from "@/features/winner/components/modal/winner-modal";
import Pagination from "@/common/components/pagination/pagination";
import Loading from "@/common/components/loading-indicator/loading";

function RaceTrack() {
  const { cars, loading, setActivePage, activePage, carsCount } = useCars();
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

  const pagesLength = Math.floor(carsCount / 9) + 1;

  return (
    <div className="px-10">
      <div className="space-y-2 min-h-[400px] flex flex-col items-center justify-center w-full">
        {loading ? (
          <Loading size={60} />
        ) : (
          cars?.map(car => (
            <GarageActions key={`track-${car.id}`} id={car.id} engineStatus={car.engine.status}>
              <div
                className={`absolute top-1 left-1 p-1 text-[8px] text-white rounded-md ${
                  car.condition === "running" ? "bg-green-500" : "bg-red-500 animate-blink"
                }`}
              >
                {car.condition}
              </div>
              <div className={`absolute top-0 left-0 w-full h-full flex flex-row items-center justify-center`}>
                <h1 className="text-white font-bold text-6xl opacity-30" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)" }}>
                  {car.name}
                </h1>
              </div>
              <Car car={car} setWinnerId={announceWinner} winnerId={raceWinnerId} raceType={raceType} />
            </GarageActions>
          ))
        )}
      </div>
      <Modal isOpen={showWinner}>
        <WinnerModal id={raceWinnerId!} onClose={() => setShowWinner(false)} />
      </Modal>
      {pagesLength > 1 && (
        <Pagination onPageChange={setActivePage} carsCount={carsCount} page={activePage} pagesLength={pagesLength} />
      )}
    </div>
  );
}

export default RaceTrack;
