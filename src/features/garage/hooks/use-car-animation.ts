import { EngineStatus } from "@/api/slices/engine/types";
import { useCallback, useEffect, useRef } from "react";

const increaseSpeed = 2;
const divider = 1000;
const nonEmptyInteger = 0;

export default function useCarAnimation({
  status,
  speed,

  initialPosition,
  onReachTheEnd,
  onStop
}: {
  status: EngineStatus;
  speed: number;
  initialPosition: number;
  onStop: (position: number) => void;
  onReachTheEnd: (position: number, time: number) => void;
}) {
  const positionRef = useRef<number>(initialPosition);
  const animationId = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const roadLength = useRef<number>(nonEmptyInteger);
  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== null && status !== EngineStatus.stopped) {
        const deltaTime = time - previousTimeRef.current;

        // Adjust speed based on status
        const adjustedSpeed = status === EngineStatus.drive ? speed * increaseSpeed : speed;

        // Calculate new position
        const newPosition = positionRef.current + (adjustedSpeed * deltaTime) / divider;

        // Ensure the car does not go beyond the road length
        positionRef.current = newPosition >= roadLength.current ? roadLength.current : newPosition;

        // stop the car if it reaches the end of the road
        if (positionRef.current >= roadLength.current) {
          onReachTheEnd(positionRef.current, time);
          return;
        }
        // Update the car's position
        if (carRef.current) {
          carRef.current.style.transform = `translateX(${positionRef.current}px)`;
        }
      }

      if (status !== EngineStatus.stopped) {
        previousTimeRef.current = time;
        animationId.current = requestAnimationFrame(animate);
      }
    },
    [speed, status, onReachTheEnd]
  );

  const handleResize = useCallback(() => {
    if (carRef.current && carRef.current.parentElement) {
      roadLength.current = carRef.current.parentElement.scrollWidth - carRef.current.scrollWidth || nonEmptyInteger;
    }
  }, []);

  useEffect(() => {
    if (carRef.current && carRef.current.parentElement) {
      positionRef.current = initialPosition;
      carRef.current.style.transform = `translateX(${positionRef.current}px)`;
    }
  }, [initialPosition]);

  useEffect(() => {
    if (carRef.current && carRef.current.parentElement) {
      roadLength.current = carRef.current.parentElement.scrollWidth - carRef.current.scrollWidth || nonEmptyInteger;
    }

    window.addEventListener("resize", handleResize);

    // Start or stop the animation based on the status
    if (status !== EngineStatus.stopped) {
      previousTimeRef.current = performance.now();
      animationId.current = requestAnimationFrame(animate);
    } else if (animationId.current) {
      onStop(positionRef.current);
      cancelAnimationFrame(animationId.current);
      animationId.current = null;
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [status, speed, animate, handleResize, onStop]);

  return { carRef };
}
