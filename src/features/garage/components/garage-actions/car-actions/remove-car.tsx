import Button from "@/common/components/button/button";
import useManageGarageActions from "@/features/garage/hooks/use-manage-garage-actions.hook";
import useGarageStore from "@/features/store/use-garage-store";
import React, { useCallback } from "react";

interface Props {
  id: number;

  onClose: () => void;
}
function RemoveCar({ id, onClose }: Props) {
  const { removeCarAction } = useManageGarageActions();
  const car = useGarageStore(state => state.getCar(id));

  const handleRemoveCar = useCallback(async () => {
    await removeCarAction({ id });
    onClose();
  }, [id, onClose, removeCarAction]);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-white rounded-xl">
      <div>
        <p>Do you want to remove ``{car?.name}`` ?</p>
      </div>
      <div className="flex flex-row justify-between">
        <Button onClick={handleRemoveCar}>Yes</Button>
        <Button onClick={onClose}>No</Button>
      </div>
    </div>
  );
}

export default RemoveCar;
