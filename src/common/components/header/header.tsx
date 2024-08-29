"use client";

import React from "react";
import Button from "@/common/components/button/button";
import { useRouter } from "next/navigation";

function Header() {
  const push = useRouter().push;

  return (
    <div className="h-[20vh] px-16 py-6 flex flex-row items-center w-full border-b border-black bg-white">
      <div className="flex flex-col space-y-4">
        <Button onClick={() => push("/")} icon="garage">
          Garage
        </Button>
        <Button onClick={() => push("/winners")} icon="winner">
          Winner
        </Button>
      </div>
      <div className="flex flex-1 flex-row justify-center">
        <h1 className="text-[40px]">ASYNC RACE</h1>
      </div>
    </div>
  );
}

export default Header;
