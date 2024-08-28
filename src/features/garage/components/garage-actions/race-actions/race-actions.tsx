import IconButton from "@/common/components/button/icon-button";
import React from "react";

interface Props {
  id: number;
}

function RaceActions({ id }: Props) {
  return (
    <div className="flex flex-col space-y-2 items-center">
      <IconButton iconSize={16} icon="start" onClick={() => {}} />
      <IconButton iconSize={16} icon="start-race" onClick={() => {}} />
    </div>
  );
}

export default RaceActions;
