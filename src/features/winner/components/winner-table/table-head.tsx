import React from "react";

const headValues = ["ID", "Name", "Number of Wins", "Best Time"];
const TableHead: React.FC = () => {
  return (
    <thead>
      <tr>
        {headValues.map((value, index) => (
          <th key={index} className="border border-solid border-[#ccc]">
            {value}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
