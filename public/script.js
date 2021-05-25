import { KEY_CARDS, PROMPT_CARDS } from "/cards.js";
import { Main, About, Instructions, Prompt, Answer, Key } from "/views.js";

const shuffle = (deck) => {
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

/**
 *
 * State variables
 *
 */

let promptOrder = shuffle(PROMPT_CARDS);
let keyOrder = shuffle(KEY_CARDS);
let currentPrompt = {};
console.log("VARIABLES RELOADING...");

/**
 *
 * Router setup for dynamic single page
 *
 */

const routes = [
  { path: "/", view: Main },
  { path: "/about", view: About },
  { path: "/instructions", view: Instructions },
  { path: "/prompt", view: Prompt },
  { path: "/answer", view: Answer },
  { path: "/key", view: Key },
];

const router = async () => {
  let match = routes.find((route) => location.pathname == route.path);

  // if no routes match, set view to Main
  if (!match) {
    match = routes[0];
  }

  // attach view to DOM
  document.querySelector("#app").innerHTML = match.view;

  // insert prompt card content
  if (match.view === Prompt) {
    const idx = promptOrder.pop();
    currentPrompt = PROMPT_CARDS[idx];
    console.log("HI", promptOrder);
    document.querySelector("h2").innerHTML = currentPrompt.title;
    document.querySelector("p").innerHTML = currentPrompt.prompt;
    document.querySelector("h4").innerHTML = currentPrompt.category;

    // if no more cards, re-shuffle
    if (promptOrder.length === 0) {
      promptOrder = shuffle(PROMPT_CARDS);
    }
  }

  if (match.view === Answer) {
    console.log("YODDD", currentPrompt);
    document.querySelector("p").innerHTML = currentPrompt.answer;
  }
};

// load view
document.addEventListener("DOMContentLoaded", (e) => {
  router();
});

// handle page changes dynamically
document.body.addEventListener("click", (e) => {
  if (e.target.matches("a")) {
    e.preventDefault();
    history.pushState(null, null, e.target.href);
    router();
  }
});

// handle forward/back buttons dynamically
window.addEventListener("popstate", router);
