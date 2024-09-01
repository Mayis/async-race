import React, { useCallback } from "react";
import useWinnersTable from "@/features/winner/hooks/use-winners-table.hook";
import useCars from "@/features/garage/hooks/use-cars.hook";
import { WinnerWithCarId } from "@/features/store/use-winner-store";
import Loading from "@/common/components/loading-indicator/loading";
import { mergeAndSumWins } from "@/lib";
import Table from "@/features/winner/components/winner-table/table";

export interface WinnerWithName extends WinnerWithCarId {
  carName: string;
  [key: string]: unknown;
}

function WinnerTable() {
  const { winners, loading, page, setPage, winnersCount } = useWinnersTable();
  const { cars } = useCars();
  const carName = useCallback((id: number) => cars.find(car => car.id === id)?.name, [cars]);

  const winnersWithCarName = mergeAndSumWins(
    winners.map(winner => ({
      ...winner,
      carName: carName(winner.carId) || ""
    }))
  );

  const isThereWinner = winnersWithCarName.length > 0;
  return (
    <div className="min-h-[400px] w-full flex items-center justify-center">
      {loading ? (
        <Loading size={60} />
      ) : isThereWinner ? (
        <Table page={page} setPage={setPage} winnersCount={winnersCount} winnersWithCarName={winnersWithCarName} />
      ) : (
        <EmptyTable />
      )}
    </div>
  );
}

const EmptyTable = () => <h1 className="text-[40px] text-gray-700 font-bold">No winners yet</h1>;

export default WinnerTable;
