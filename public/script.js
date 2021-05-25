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
};

// load view
document.addEventListener("DOMContentLoaded", (e) => {
  // router();
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

/**
 *
 * START OF SESSION
 *
 */

let keyOrder = shuffle(KEY_CARDS);
let promptOrder = shuffle(PROMPT_CARDS);
