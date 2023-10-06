const microCheckButtonEl = document.getElementById("micro-check-btn");
const cameraCheckButtonEl = document.getElementById("camera-check-btn");
const audioCheckButtonEl = document.getElementById("audio-check-btn");
const audioEl = document.getElementById("audio-check");

const videoInspector = new VideoInspector();
const microInspector = new MicroInspector("My name is");

microCheckButtonEl.addEventListener("click", () => {
  microInspector.inspect();
});

cameraCheckButtonEl.addEventListener("click", () => {
  videoInspector.inspect();
});

audioCheckButtonEl.addEventListener("click", () => {
  audioEl.play();
});

audioEl.addEventListener("ended", () => {
  alert("You heard the sound! Your audio is working.");
});
