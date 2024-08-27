"use client";
import RaceControlPanel from "@/features/garage/components/race-control-panel/race-control-panel";
import RaceTrack from "@/features/garage/components/race-track/race-track";
import React from "react";

export default function Home() {
  return (
    <div>
      <div>
        <RaceControlPanel />
      </div>
      <div>
        <RaceTrack />
      </div>
    </div>
  );
}
