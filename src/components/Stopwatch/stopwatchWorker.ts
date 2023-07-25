var timer: any;

onmessage = function (message) {
  let time = message.data;

  if (typeof message.data === 'number') {
    timer = setInterval(() => {
      time++;
      postMessage(time);
    }, 10);
  } else if (message.data === 'stop') {
    clearInterval(timer);
  }
};
