import React from "react";
import Track from "@/features/garage/components/race-track/track";
import GarageActions from "@/features/garage/components/garage-actions/garage-actions";
import useCars from "@/features/garage/hooks/use-cars.hook";
import Car from "@/features/garage/components/car/car";

function RaceTrack() {
  const { cars, loading } = useCars();

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
              <Car car={car} />
            </div>
          </GarageActions>
        </Track>
      ))}
    </div>
  );
}

export default RaceTrack;
