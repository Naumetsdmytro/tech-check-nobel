class VideoInspector {
  #matchingFaceExpression;

  #startVideoDetection() {
    navigator.getUserMedia(
      { video: {} },
      (stream) => (video.srcObject = stream),
      (error) => console.log(error)
    );
  }

  inspect() {
    const timeoutInSeconds = 15;

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(this.#startVideoDetection);

    const intervalId = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      console.log(detections[0]?.expressions);

      if (detections[0]?.expressions) {
        const neutralExpressionValue = detections[0].expressions.neutral;

        if (neutralExpressionValue > 0.6) {
          clearInterval(intervalId);
          clearTimeout(timeoutId);

          const videoContainerEl = document.querySelector(
            ".tech-camera-container"
          );
          const microContainerEl = document.querySelector(
            ".tech-microphone-container"
          );

          videoContainerEl.style.display = "none";
          microContainerEl.style.display = "flex";

          return true;
        }
      }
    }, 1000);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);

      const microphoneFailureEl = document.getElementById(
        "camera-failure-text"
      );
      const videoContainerEl = document.querySelector(".tech-camera-container");

      microphoneFailureEl.style.display = "block";
      videoContainerEl.style.display = "none";
    }, timeoutInSeconds * 1000);
  }
}
