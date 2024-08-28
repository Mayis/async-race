import React from "react";
import Track from "@/features/garage/components/race-track/track";
import CarActions from "@/features/garage/components/car-actions/car-actions";
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
          <CarActions id={car.id} engineStatus={car.engine.status}>
            <div
              style={{
                backgroundColor: car.color
              }}
            >
              {car.name}
            </div>
          </CarActions>
        </Track>
      ))}
    </div>
  );
}

export default RaceTrack;
