import React, { useCallback } from "react";
import useWinnersTable from "@/features/winner/hooks/use-winners-table.hook";
import useCars from "@/features/garage/hooks/use-cars.hook";
import TableHead from "@/features/winner/components/winner-table/table-head";
import TableRow from "@/features/winner/components/winner-table/table-row";
import { WinnerWithCarId } from "@/features/store/use-winner-store";
import Pagination from "@/common/components/pagination/pagination";
import Loading from "@/common/components/loading-indicator/loading";

interface WinnerWithName extends WinnerWithCarId {
  carName: string | undefined;
  [key: string]: any;
}
function WinnerTable() {
  const { winners, loading, page, setPage, winnersCount } = useWinnersTable();
  const { cars } = useCars();
  const carName = useCallback((id: number) => cars.find(car => car.id === id)?.name, [cars]);

  const winnersWithCarName = mergeAndSumWins(
    winners.map(winner => ({
      ...winner,
      carName: carName(winner.carId)
    }))
  );
  const pagesLength = Math.floor(winnersWithCarName.length / 10) + 1;

  return (
    <div className="min-h-[400px] w-full flex items-center justify-center">
      {loading ? (
        <Loading size={60} />
      ) : winnersWithCarName.length ? (
        <div>
          <table className="w-[600px] bg-white neon-border shadow-md rounded-lg overflow-hidden">
            <TableHead />
            <tbody>
              {winnersWithCarName.map((row, rowIndex) => {
                const name = carName(row.carId);
                return name && <TableRow key={rowIndex} winner={row} carName={name} />;
              })}
            </tbody>
          </table>
          {pagesLength > 1 && (
            <Pagination onPageChange={setPage} carsCount={winnersCount} page={page} pagesLength={pagesLength} />
          )}
        </div>
      ) : (
        <h1 className="text-[40px] text-gray-700 font-bold">No winners yet</h1>
      )}
    </div>
  );
}

function mergeAndSumWins(winners: WinnerWithName[]): WinnerWithName[] {
  const aggregatedCars = winners.reduce(
    (acc, car) => {
      if (car.carName) {
        if (acc[car.carName]) {
          acc[car.carName].wins += car.wins;
        } else {
          acc[car.carName] = { ...car };
        }
      }
      return acc;
    },
    {} as Record<string, WinnerWithName>
  );

  return Object.values(aggregatedCars);
}
export default WinnerTable;
