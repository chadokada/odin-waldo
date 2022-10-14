const formatTime = (milliseconds) => {
  // Takes milliseconds and returns a string forrmatted mm:ss:sss
  const mm = ("0" + Math.floor((milliseconds / 60000) % 60)).slice(-2);
  const ss = ("0" + Math.floor((milliseconds / 1000) % 60)).slice(-2);
  const sss = ("0" + ((milliseconds / 10) % 100)).slice(-2);

  return `${mm}:${ss}:${sss}`;
}

export default formatTime;