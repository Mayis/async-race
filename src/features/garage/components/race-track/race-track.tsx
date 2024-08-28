import React from "react";
import Track from "@/features/garage/components/race-track/track";
import GarageActions from "@/features/garage/components/garage-actions/garage-actions";
import useCars from "@/features/garage/hooks/use-cars.hook";

function RaceTrack() {
  const { cars, loading } = useCars();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {cars.map(car => (
        <Track key={car.id}>
          <GarageActions id={car.id} engineStatus={car.engine.status}>
            <div
              style={{
                backgroundColor: car.color
              }}
            >
              {car.name}
            </div>
          </GarageActions>
        </Track>
      ))}
    </div>
  );
}

export default RaceTrack;
