import Button from "@/common/components/button/button";
import React from "react";

function RaceControlPanel() {
  return (
    <div className="flex flex-row py-4 items-center px-16">
      <div className="flex flex-row space-x-6">
        <div>
          <Button icon="start-race">Start Race</Button>
        </div>
        <div>
          <Button icon="reset">Reset</Button>
        </div>
      </div>
      <div className="flex flex-1 flex-row items-center justify-end">
        <div>
          <Button icon="random">Generate Cars</Button>
        </div>
      </div>
    </div>
  );
}

export default RaceControlPanel;
