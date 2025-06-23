const decodeBase64UTF8 = (b64Str) => {
  try {
    return new TextDecoder().decode(
      Uint8Array.from(atob(b64Str), (c) => c.charCodeAt(0))
    );
  } catch (error) {
    return b64Str;
  }
};

export const decodeBase64Fields = (questionData) => {
  return questionData.map((item) => ({
    ...item,
    question: decodeBase64UTF8(item.question),
    correct_answer: decodeBase64UTF8(item.correct_answer),
    incorrect_answers: item.incorrect_answers.map(decodeBase64UTF8),
    category: decodeBase64UTF8(item.category),
    difficulty: decodeBase64UTF8(item.difficulty),
    type: decodeBase64UTF8(item.type),
  }));
};