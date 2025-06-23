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
  //backgroundAudio.volume = 0.4;
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

const decodeBase64UTF8 = (b64Str) => {
  try {
    return new TextDecoder().decode(
      Uint8Array.from(atob(b64Str), (c) => c.charCodeAt(0))
    );
  } catch {
    return b64Str;
  }
};

export const decodeBase64Fields = (questionData) => {
  return questionData.map((item) => ({
    ...item,
    question: decodeBase64UTF8(item.question),
    correct_answer: decodeBase64UTF8(item.correct_answer),
    incorrect_answers: item.incorrect_answers.map((ans) =>
      decodeBase64UTF8(ans)
    ),
    category: decodeBase64UTF8(item.category),
    difficulty: decodeBase64UTF8(item.difficulty),
    type: decodeBase64UTF8(item.type),
  }));
};
