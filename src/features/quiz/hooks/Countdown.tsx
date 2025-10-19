import { useState, useEffect, useRef, useCallback } from "react";
import type { CountdownHook } from "../types";

export function useCountdown(initialSeconds: number): CountdownHook {
	const [seconds, setSeconds] = useState(initialSeconds);
	const [isFinished, setIsFinished] = useState(false);
	const intervalRef = useRef<number | null>(null);

	const clear = () => {
		if (intervalRef.current !== null) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const start = useCallback(() => {
		clear();
		setIsFinished(false);
		intervalRef.current = window.setInterval(() => {
			setSeconds((prev) => {
				if (prev <= 1) {
					clear();
					setIsFinished(true);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	}, []);

	const reset = useCallback(
		(newSeconds?: number) => {
			clear();
			setSeconds(newSeconds ?? initialSeconds);
			setIsFinished(false);
			start();
		},
		[initialSeconds, start]
	);

	useEffect(() => {
		start();
		return clear;
	}, [start]);

	return { seconds, isFinished, reset };
}
