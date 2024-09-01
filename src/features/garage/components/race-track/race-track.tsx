import React, { useMemo } from "react";
import GarageActions from "@/features/garage/components/garage-actions/garage-actions";
import useCars from "@/features/garage/hooks/use-cars.hook";
import Car from "@/features/garage/components/car/car";
import Modal from "@/common/components/modal/modal";
import WinnerModal from "@/features/winner/components/modal/winner-modal";
import Pagination from "@/common/components/pagination/pagination";
import Loading from "@/common/components/loading-indicator/loading";
import useAnnounceWinner from "@/features/garage/hooks/use-announce-winner.hook";
import RaceLine from "@/features/garage/components/race-track/race-line";

const RaceTrack = () => {
  const { cars, loading, setActivePage, activePage, carsCount, pagesLength } = useCars();
  const { announceWinner, raceType, raceWinnerId, setShowWinner, showWinner, getWinner } = useAnnounceWinner();

  const showPagination = pagesLength > 1;

  const winnerCarName = cars?.find(car => car.id === raceWinnerId)?.name;
  const winnerCarTime = useMemo(() => (raceWinnerId ? getWinner(raceWinnerId)?.time : ""), [getWinner, raceWinnerId])?.toString();

  const openWinnerModal = showWinner && !!raceWinnerId;

  return (
    <div className="px-10">
      <div className="space-y-2 min-h-[400px] flex flex-col items-center justify-center w-full">
        {loading ? (
          <Loading size={60} />
        ) : (
          cars?.map(car => (
            <GarageActions key={`track-${car.id}`} id={car.id} engineStatus={car.engine.status}>
              <RaceLine condition={car.condition} name={car.name}>
                <Car car={car} announceWinner={announceWinner} winnerId={raceWinnerId} raceType={raceType} />
              </RaceLine>
            </GarageActions>
          ))
        )}
      </div>
      <Modal isOpen={openWinnerModal}>
        <WinnerModal name={winnerCarName!} time={winnerCarTime || ""} onClose={() => setShowWinner(false)} />
      </Modal>
      {showPagination && (
        <Pagination onPageChange={setActivePage} carsCount={carsCount} page={activePage} pagesLength={pagesLength} />
      )}
    </div>
  );
};

export default RaceTrack;
