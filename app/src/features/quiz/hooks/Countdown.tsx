import { useState, useEffect, useRef, useCallback } from "react";

export function useCountdown(initialSeconds: number) {
	const [seconds, setSeconds] = useState(initialSeconds);
	const [isFinished, setIsFinished] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
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
		setIsPaused(false);
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

	const pause = useCallback(() => {
		clear();
		setIsPaused(true);
	}, []);

	const resume = useCallback(() => {
		if (isFinished || seconds <= 0) return;
		if (intervalRef.current !== null) return;
		setIsPaused(false);
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
	}, [isFinished, seconds]);

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

	return { seconds, isFinished, isPaused, reset, pause, resume };
}
