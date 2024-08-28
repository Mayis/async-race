import Button from "@/common/components/button/button";
import useManageGarageActions from "@/features/garage/hooks/use-manage-garage-actions.hook";
import useGarageStore from "@/features/garage/store/use-garage-store";
import React, { useCallback, useState } from "react";

interface Props {
  id: number;
  onClose: () => void;
}
function UpdateCar({ id, onClose }: Props) {
  const car = useGarageStore(state => state.cars.find(car => car.id === id));
  const { updateCarAction, loading } = useManageGarageActions();
  const [updateValues, setUpdateValues] = useState({
    name: car?.name,
    color: car?.color
  });

  const isFieldsFilled = updateValues.name && updateValues.color;
  const fieldsAreChanged = updateValues.name !== car?.name || updateValues.color !== car?.color;

  const submit = useCallback(async () => {
    if (isFieldsFilled && fieldsAreChanged) {
      await updateCarAction({
        id,
        name: updateValues.name!,
        color: updateValues.color!
      });
    }
    onClose();
  }, [id, isFieldsFilled, onClose, updateCarAction, updateValues.color, updateValues.name, fieldsAreChanged]);

  return (
    <div className="bg-white p-6 flex-flex-col space-y-4 rounded-2xl">
      <div className="flex flex-col space-y-1">
        <label htmlFor="name" className="text-[12px]">
          Name
        </label>
        <input
          className="border border-gray-300 p-1 rounded-lg"
          required
          type="text"
          placeholder="Car Name"
          name="name"
          value={updateValues.name}
          onChange={e => setUpdateValues({ ...updateValues, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col space-y-1">
        <label htmlFor="head" className="text-[12px]">
          Color
        </label>
        <input
          required
          type="color"
          id="color"
          name="car-color"
          value={updateValues.color}
          onChange={e =>
            setUpdateValues({
              ...updateValues,
              color: e.target.value
            })
          }
        />
      </div>
      <div className="flex flex-row justify-between">
        <Button disabled={!isFieldsFilled} onClick={submit}>
          {loading ? "Loading..." : "Update"}
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </div>
  );
}

export default UpdateCar;
