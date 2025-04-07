import Container from './UI/Container.tsx';
import {
  useTimersContext,
  type Timer as TimerProps,
} from '../store/timers-context.tsx';
import { useEffect, useState } from 'react';

export default function Timer({ name, duration }: TimerProps) {
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const { isRunning } = useTimersContext();

  useEffect(() => {
    const intervalValue = 100;
    let intervalId: number;

    if (isRunning) {
      intervalId = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 0) {
            clearInterval(intervalId); // ⛔ stop the interval once we hit 0
            return 0;
          }
          return prev - intervalValue;
        });
      }, intervalValue);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <Container as='article'>
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime} />
      </p>
      <p>{(remainingTime / 1000).toFixed(2)}</p>
    </Container>
  );
}
// export default function Timer({ name, duration }: TimerProps) {
//   const [remainingTime, setRemainingTime] = useState(duration * 1000);
//   const interval = useRef<null | number>(null);

//   if (remainingTime <= 0 && interval.current) {
//     clearInterval(interval.current);
//   }

//   useEffect(() => {
//     const intervalValue = 100;

//     const intervalId = setInterval(() => {
//       setRemainingTime((prev) => prev - intervalValue);
//     }, intervalValue);

//     interval.current = intervalId;

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);

//   return (
//     <Container as='article'>
//       <h2>{name}</h2>
//       <p>
//         <progress max={duration * 1000} value={remainingTime} />
//       </p>
//       <p>{(remainingTime / 1000).toFixed(2)}</p>
//     </Container>
//   );
// }
