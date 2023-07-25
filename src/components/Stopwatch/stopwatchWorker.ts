var timer: any;

onmessage = function (message) {
  console.log('Message: ', message);
  let time = message.data;

  if (typeof message.data === 'number') {
    timer = setInterval(() => {
      time++;
      postMessage(time);
    }, 10);
  } else if (message.data === 'stop') {
    console.log('clearing interval!!');

    console.log(timer);
    clearInterval(timer);
  }
};
