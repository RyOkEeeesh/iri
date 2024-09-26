window.addEventListener('load',function(){
  const FFT_SIZE = 512;
  const option = {
    once: true,
  };
  const containerElement = document.querySelector(".container");
  const audioElement = document.querySelector("#audio");
  audioElement.addEventListener("play", init, option);
  const boxes = [];
  for (let i = 0; i < FFT_SIZE / 2; i++) {
    const div = document.createElement("div");
    div.classList.add("box");
    containerElement.append(div);
    boxes[i] = div;
  }
  function init() {
    const context = new AudioContext();
    const nodeAnalyser = context.createAnalyser();
    nodeAnalyser.fftSize = FFT_SIZE;
    nodeAnalyser.smoothingTimeConstant = 0.85;
    nodeAnalyser.connect(context.destination);
    const nodeSource = context.createMediaElementSource(audioElement);
    nodeSource.connect(nodeAnalyser);
    loop();
    function loop() {
      requestAnimationFrame(loop);
      const freqByteData = new Uint8Array(FFT_SIZE / 2);
      nodeAnalyser.getByteFrequencyData(freqByteData);
      for (let i = 0; i < freqByteData.length; i++) {
        const freqSum = freqByteData[i];
        const scale = freqSum / 256;
        const div = boxes[i];
        div.style.scale = `1 ${scale}`;
      }
    }
  }
});