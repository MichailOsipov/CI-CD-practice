import React, { useEffect, useRef, useState } from 'react';

export const SharedWorkerExample = () => {
  const workerRef = useRef<SharedWorker>();
  const [inputMessage, setInputMessage] = useState('hello world');
  const [workerMessage, setWorkerMessage] = useState('');

  const handleUpdateMessage = () => {
    if (workerRef.current) {
      workerRef.current.port.postMessage({ type: 'UPDATE_MESSAGE', message: inputMessage });
    }
  };

  useEffect(() => {
    const sharedWorker = new SharedWorker(new URL('./exchangeMessages.worker.ts', import.meta.url));
    sharedWorker.port.start();

    workerRef.current = sharedWorker;

    sharedWorker.port.onmessage = (e) => {
      setWorkerMessage(e.data);
      setInputMessage(e.data);
    };

    return () => {
      sharedWorker.port.postMessage({ type: 'TERMINATE' });
      sharedWorker.port.close();
    };
  }, []);

  return (
    <div>
      <h1>Shared data here!</h1>
      <input type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} /><br />
      <button type="button" onClick={handleUpdateMessage}>Update Message</button>
      Your worker message: {workerMessage}
    </div>
  );
};
