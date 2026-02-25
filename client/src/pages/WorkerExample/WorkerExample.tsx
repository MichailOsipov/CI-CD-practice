import React, { useEffect, useState } from 'react';
/* @ts-ignore */
// eslint-disable-next-line import/no-webpack-loader-syntax, import/extensions, import/no-unresolved
// import Worker from 'worker-loader!./fibonnacci.worker';

type FibonacciComponentProps = {
  n: number;
};

const FibonacciComponent = ({ n }: FibonacciComponentProps) => {
  const [result, setResult] = useState(0);

  useEffect(() => {
    // Initialize worker
    const worker = new Worker(new URL('./fibonnacci.worker.ts', import.meta.url));

    // Handle worker messages
    worker.onmessage = (event) => {
      setResult(event.data);
    };

    // Send computation to worker
    worker.postMessage(n);

    // Cleanup the worker when component unmounts
    return () => {
      worker.terminate();
    };
  }, [n]);

  return (
    <div>
      <h1>Fibonacci of {n} is {result}</h1>
    </div>
  );
};

export const WorkerExample = () => {
  return (
    <FibonacciComponent n={100} />
  );
};
