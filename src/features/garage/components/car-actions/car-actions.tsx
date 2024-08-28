import IconButton from "@/common/components/button/icon-button";
import Modal from "@/common/components/modal/modal";
import RemoveCar from "@/features/garage/components/car-actions/remove-car";
import UpdateCar from "@/features/garage/components/car-actions/update-car";
import React, { PropsWithChildren, useCallback, useState } from "react";

type Modal = "update" | "delete";
interface Props {
  id: number;
  engineStatus: string;
}

function CarActions({ id, children }: PropsWithChildren<Props>) {
  const [modalType, setModalType] = useState<Modal | null>(null);

  const handleAction = useCallback(
    (type: Modal) => {
      if (id) {
        setModalType(type);
      }
    },
    [id, setModalType]
  );

  const modals = {
    update: <UpdateCar id={id} onClose={() => setModalType(null)} />,
    delete: <RemoveCar id={id} onClose={() => setModalType(null)} />
  };

  return (
    <div className="flex flex-row space-x-4 items-center">
      <div className="flex flex-col space-y-2 items-center">
        <IconButton iconSize={16} icon="edit" onClick={() => handleAction("update")} />
        <IconButton iconSize={16} icon="delete" onClick={() => handleAction("delete")} />
      </div>
      <div>{children}</div>
      <Modal isOpen={!!modalType}>{modals[modalType!]}</Modal>
    </div>
  );
}

export default CarActions;
