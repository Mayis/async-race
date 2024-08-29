import useCars from "@/features/garage/hooks/use-cars.hook";
import useGarageActions from "@/features/garage/hooks/use-garage-actions";
import { useCallback } from "react";

export default function useGenerateCars() {
  const cars = generateRandomCars();

  const { createCar } = useGarageActions();
  const { reloadOnCreate } = useCars();
  const generateCars = useCallback(async () => {
    const actions = cars.map(car =>
      createCar({
        name: car.name,
        color: car.color
      })
    );

    const data = await Promise.all(actions);
    const isThereError = data.some(d => d.error);

    if (!isThereError) {
      reloadOnCreate();
    }
  }, [cars, createCar, reloadOnCreate]);

  return { generateCars };
}

const getRandomCarName = (): string => {
  const carModels = [
    "BMW M5",
    "BMW X5",
    "BMW i8",
    "Mercedes S63",
    "Mercedes GLA",
    "Mercedes C300",
    "Audi A4",
    "Audi Q7",
    "Audi R8",
    "Tesla Model S",
    "Tesla Model X",
    "Tesla Model 3"
  ];
  return carModels[Math.floor(Math.random() * carModels.length)];
};
const getRandomColor = (): string => {
  const hexChars = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * 16)];
  }
  return color;
};
const generateRandomCars = () => {
  const cars = [];

  for (let i = 1; i <= 100; i++) {
    const car = {
      name: getRandomCarName(),
      color: getRandomColor()
    };
    cars.push(car);
  }

  return cars;
};
