export function decodeHtml(htmlCode) {
  const txt = document.createElement("textarea");
  txt.innerHTML = htmlCode;
  return txt.value;
}

export function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export function addPoints(type, difficulty) {
  let points = 0;
  if (type === "multiple") points += 2;
  if (difficulty === "easy") points += 1;
  else if (difficulty === "medium") points += 2;
  else points += 3;
  return points * 10;
}

export function applyDifficultyStyle(difficulty) {
  switch (difficulty) {
    case "easy":
      return "easy";
    case "medium":
      return "medium";
    case "hard":
      return "hard";
    default:
      return "easy";
  }
}

let backgroundAudio = null;

export function startBackgroundSound(isMuted) {
  if (backgroundAudio) return;
  if (isMuted) return;
  backgroundAudio = new Audio("/sounds/timer.mp3", isMuted);
  backgroundAudio.loop = true;
  backgroundAudio.volume = 0.4;
  backgroundAudio.play().catch(console.warn);
}

export function stopBackgroundSound() {
  if (backgroundAudio) {
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0;
    backgroundAudio = null;
  }
}

export function playSounds(src, isMuted) {
  if (isMuted) return;
  const sound = new Audio(src);
  sound.currentTime = 0;
  sound.play().catch((error) => {
    console.error("Error playing sound:", error);
  });
}
