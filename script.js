import { KEY_CARDS, PROMPT_CARDS } from "/cards.js";

export const shuffle = (deck) => {
  const order = [];
  for (let i = 0; i < deck.length; i++) {
    order.push(i);
  }

  let currentIdx = order.length;
  while (0 !== currentIdx) {
    const randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx--;
    const temp = order[currentIdx];
    order[currentIdx] = order[randomIdx];
    order[randomIdx] = temp;
  }

  return order;
};

// main page interactivity
if (window.location.pathname === "/") {
  let keyOrder = shuffle(KEY_CARDS).join(" ");
  let promptOrder = shuffle(PROMPT_CARDS).join(" ");

  sessionStorage.setItem("keyOrder", keyOrder);
  sessionStorage.setItem("promptOrder", promptOrder);
}

// prompt page interactivity
if (window.location.pathname === "/views/prompt.html") {
  let promptOrder = sessionStorage.promptOrder.split(" ");

  // get current card, save values to sessionStorage
  let idx = parseInt(promptOrder.pop(), 10);
  let currentPrompt = PROMPT_CARDS[idx];
  sessionStorage.answer = currentPrompt.answer;
  sessionStorage.category = currentPrompt.category;

  // if deck is empty, re-shuffle
  if (promptOrder.length === 0) {
    promptOrder = shuffle(PROMPT_CARDS);
  }

  // save new order to sessionStorage
  sessionStorage.promptOrder = promptOrder.join(" ");

  // insert content
  document.querySelector("h2").innerHTML = currentPrompt.title;
  document.querySelector("p").innerHTML = currentPrompt.prompt;
  document.querySelector("h4").innerHTML = currentPrompt.category;
}

// answer page interactivity
if (window.location.pathname === "/views/answer.html") {
  document.querySelector("p").innerHTML = sessionStorage.answer;
  document.querySelector("h4").innerHTML = sessionStorage.category;
}

if (window.location.pathname === "/views/key.html") {
  let keyOrder = sessionStorage.keyOrder.split(" ");

  // get current card
  let idx = parseInt(keyOrder.pop(), 10);
  let currentKey = KEY_CARDS[idx];

  // if deck is empty, re-shuffle
  if (keyOrder.length === 0) {
    keyOrder = shuffle(KEY_CARDS);
  }

  // save new order to sessionStorage
  sessionStorage.keyOrder = keyOrder.join(" ");

  // insert content
  document.querySelector("h2").innerHTML = currentKey.title;
  //TODO: insert image
  document.querySelector("p").innerHTML = currentKey.content;
}
