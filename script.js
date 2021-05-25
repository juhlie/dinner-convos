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

  console.log(window.sessionStorage);
}

// prompt page interactivity
if (window.location.pathname === "/views/prompt.html") {
  let promptOrder = sessionStorage.promptOrder.split(" ");

  let idx = parseInt(promptOrder.pop(), 10);
  let currentPrompt = PROMPT_CARDS[idx];
  sessionStorage.answer = currentPrompt.answer;

  if (promptOrder.length === 0) {
    promptOrder = shuffle(PROMPT_CARDS);
  }

  sessionStorage.promptOrder = promptOrder.join(" ");

  document.querySelector("h2").innerHTML = currentPrompt.title;
  document.querySelector("p").innerHTML = currentPrompt.prompt;
  document.querySelector("h4").innerHTML = currentPrompt.category;
}

// answer page interactivity
if (window.location.pathname === "/views/answer.html") {
  document.querySelector("p").innerHTML = sessionStorage.answer;
}

/**
 *
 * save to session storage as space-delineated string
 *
 * upon accessing
 * grab string
 * turn into list (separate by spaces)
 * pop off last item
 * 	if list empty
 * 	shuffle again
 * turn into string
 * save to session storage as space-delinated string
 */
