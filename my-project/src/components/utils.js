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
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
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
};
