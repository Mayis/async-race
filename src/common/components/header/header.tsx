"use client";

import Button from "@/common/components/button/button";
import Icon from "@/common/components/icon/icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const push = useRouter().push;
  return (
    <div className="h-[20vh] px-16 py-6 flex flex-row items-center w-full border-b border-black bg-white">
      <div className="flex flex-col space-y-4">
        <Button onClick={() => push("/")}>
          <div className="flex flex-row space-x-4 items-center">
            <div>
              <Icon name="garage" />
            </div>
            <div>
              <span>Garage</span>
            </div>
          </div>
        </Button>
        <Button onClick={() => push("/winners")}>
          <div className="flex flex-row space-x-4 items-center">
            <div>
              <Icon name="winner" />
            </div>
            <div>
              <span>Winner</span>
            </div>
          </div>
        </Button>
      </div>
      <div className="flex flex-1 flex-row justify-center">
        <h1>ASYNC RACE</h1>
      </div>
    </div>
  );
}

export default Header;
