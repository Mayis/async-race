import React, { useCallback } from "react";
import useWinnersTable from "@/features/winner/hooks/use-winners-table.hook";
import useCars from "@/features/garage/hooks/use-cars.hook";
import TableHead from "@/features/winner/components/winner-table/table-head";
import TableRow from "@/features/winner/components/winner-table/table-row";

function WinnerTable() {
  const { winners, loading, error, page, setPage } = useWinnersTable();
  const { cars } = useCars();

  const carName = useCallback((id: number) => cars.find(car => car.id === id)?.name, [cars]);

  return (
    <table className="w-[600px] bg-white neon-border shadow-md rounded-lg overflow-hidden">
      <TableHead />
      <tbody>
        {winners.map((row, rowIndex) => (
          <TableRow key={rowIndex} winner={row} carName={carName(row.id) || ""} />
        ))}
      </tbody>
    </table>
  );
}

export default WinnerTable;
