import React, { PropsWithChildren } from "react";

interface Props {
  a?: number;
}

function Track({ children }: PropsWithChildren<Props>) {
  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        backgroundColor: "gray",
        borderBottom: "1px solid black",
        display: "flex",
        alignItems: "center"
      }}
    >
      {children}
    </div>
  );
}

export default Track;
