class MicroInspector {
  #matchingWord;

  constructor(matchingWord = "") {
    this.#matchingWord = matchingWord;
    this.messageDisplayed = false;
  }

  #findMatchesInSpeechResults(speechResults) {
    const matchingWords = this.#matchingWord.trim().toLocaleLowerCase();

    for (const result of Array.from(speechResults)) {
      const transcript = result[0].transcript.trim().toLowerCase();
      if (transcript.includes("russia") || transcript.includes("belarus")) {
        return "Russia";
      }

      if (transcript.includes(matchingWords)) return true;
    }
    return false;
  }

  inspect() {
    const timeoutInSeconds = 15;

    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new window.SpeechRecognition();

    const microphoneBackdropEl = document.getElementById("microphone-check");
    const microphoneContainerEl = document.querySelector(
      ".tech-microphone-container"
    );
    const audioContainerEl = document.querySelector(".tech-audio-container");
    const imgPutinEl = document.querySelector(".putin");

    microphoneBackdropEl.style.display = "flex";

    recognition.lang = "en-US";
    recognition.interimResults = true;
    let recognitionTimeout;

    recognition.addEventListener("result", (e) => {
      if (!this.messageDisplayed) {
        clearTimeout(recognitionTimeout);
        const speechRecognitionResults = e.results;
        const findMathcesResult = this.#findMatchesInSpeechResults(
          speechRecognitionResults
        );

        recognitionTimeout = setTimeout(() => {
          if (findMathcesResult === "Russia") {
            clearTimeout(timeoutId);
            microphoneBackdropEl.style.display = "none";
            microphoneContainerEl.style.display = "none";
            imgPutinEl.style.display = "block";
            return;
          }
          if (findMathcesResult) {
            clearTimeout(timeoutId);
            audioContainerEl.style.display = "flex";
            microphoneContainerEl.style.display = "none";
            this.messageDisplayed = true;
          }
        }, 4000);
      }
    });

    recognition.start();

    const timeoutId = setTimeout(() => {
      const microphoneFailureEl = document.getElementById(
        "microphone-failure-text"
      );

      microphoneContainerEl.style.display = "none";
      microphoneFailureEl.style.display = "block";
      microphoneBackdropEl.style.display = "none";
    }, timeoutInSeconds * 1000);
  }
}

// recognition.addEventListener("result", (e) => {
//     if (!this.messageDisplayed) {
//       const speechRecognitionResults = e.results;
//       const findMathcesResult = this.#findMatchesInSpeechResults(
//         speechRecognitionResults
//       );

//       if (findMathcesResult) {
//         clearTimeout(timeoutId);
//         audioContainerEl.style.display = "flex";
//         microphoneContainerEl.style.display = "none";

//         this.messageDisplayed = true;
//       }
//       console.log(findMathcesResult);
//       if (!findMathcesResult) {
//         clearTimeout(timeoutId);
//         microphoneBackdropEl.style.display = "none";
//         microphoneContainerEl.style.display = "none";
//         imgPutinEl.style.display = "block";
//       }
//     }
//   });
