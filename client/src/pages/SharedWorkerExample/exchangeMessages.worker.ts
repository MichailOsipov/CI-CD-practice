/* eslint-disable import/no-unused-modules */

type SharedWorkerPort = {
  postMessage: (message: string) => void;
};

type SharedWorkerEvent = {
  data: {
    type: 'TERMINATE' | 'UPDATE_MESSAGE';
    message: string;
  };
 };

let ports: SharedWorkerPort[] = [];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
onconnect = (connectEvent) => {
  const port = connectEvent.ports[0];

  ports = [...ports, port];

  port.onmessage = (e: SharedWorkerEvent) => {
    const { type, message } = e.data;
    if (type === 'TERMINATE') {
      ports = ports.filter(curr => curr === port);
    } else if (type === 'UPDATE_MESSAGE') {
      for (let i = 0; i < ports.length; i += 1) {
        ports[i].postMessage(message);
      }
    }
  };
};
