import { EngineStatus } from "@/api/slices/engine/types";
import { Car } from "@/api/slices/garage/entity";
import { Engine } from "@/api/slices/garage/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GarageStoreState {
  cars: Car[];
}

interface GarageStoreAction {
  setCars: (cars: Car[]) => void;
  removeCar: (id: number) => void;
  updateCar: ({ id, car }: { id: number; car: Partial<Car> }) => void;
  createCar: (car: Car) => void;
  updateCarEngine: (params: { id: number; engine: Engine }) => void;
  updateCarStatus: (params: { id: number; status: EngineStatus }) => void;
  resetCars: () => void;
}

const useGarageStore = create<GarageStoreState & GarageStoreAction>()(
  persist(
    set => ({
      cars: [],
      setCars(cars) {
        set(() => ({ cars }));
      },
      removeCar(id) {
        set(state => ({ cars: state.cars.filter(car => car.id !== id) }));
      },
      updateCar({ id, car }) {
        set(state => ({
          cars: state.cars.map(c => (c.id === id ? { ...c, ...car } : c))
        }));
      },
      createCar(car) {
        set(state => ({ cars: [...state.cars, car] }));
      },
      updateCarEngine({ id, engine }) {
        set(state => ({
          cars: state.cars.map(c => (c.id === id ? { ...c, engine } : c))
        }));
      },
      updateCarStatus({ id, status }) {
        set(state => ({
          cars: state.cars.map(c => (c.id === id ? { ...c, engine: { ...c.engine, status } } : c))
        }));
      },
      resetCars() {
        set(() => ({ cars: [] }));
      }
    }),
    {
      name: "car-storage"
    }
  )
);

export default useGarageStore;
