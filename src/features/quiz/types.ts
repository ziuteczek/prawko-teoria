export interface CountdownHook {
  seconds: number;
  isFinished: boolean;
  reset: (newSeconds?: number) => void;
}