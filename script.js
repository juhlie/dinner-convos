import { KEY_CARDS, PROMPT_CARDS } from "/cards.js";
import { about, answer, instructions, key, prompt } from "/views.js";

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
 * VARIABLES
 *
 **/
const app = document.querySelector("#app");
const card = document.querySelector("#card");
let keyOrder = shuffle(KEY_CARDS);
let promptOrder = shuffle(PROMPT_CARDS);
let currentPrompt = {};
const title = document.querySelector("h1");
const startBtn = document.querySelector("#begin");
const keyBtn = document.querySelector("#key");
const answerBtn = document.querySelector("#answer");
const nextBtn = document.querySelector("#next");

const renderAbout = () => {
  app.innerHTML = about;
  card.hidden = true;
  document.querySelector("#btns").hidden = true;
};

const renderInstructions = () => {
  app.innerHTML = instructions;
  card.hidden = true;
  document.querySelector("#btns").hidden = true;
};

const renderPrompt = () => {
  // show / hide elements
  title.hidden = true;
  startBtn.hidden = true;
  nextBtn.hidden = true;
  card.hidden = false;
  answerBtn.hidden = false;
  keyBtn.hidden = false;
  card.innerHTML = prompt;

  // get current card
  let idx = promptOrder.pop();
  currentPrompt = PROMPT_CARDS[idx];

  // insert content
  document.querySelector("h2").innerHTML = currentPrompt.title;
  document.querySelector("p").innerHTML = currentPrompt.prompt;
  document.querySelector("h4").innerHTML = currentPrompt.category;

  // if deck is empty, re-shuffle
  if (promptOrder.length === 0) {
    promptOrder = shuffle(PROMPT_CARDS);
  }
};

const renderAnswer = () => {
  // show / hide elements
  answerBtn.hidden = true;
  keyBtn.hidden = false;
  nextBtn.hidden = false;
  card.innerHTML = answer;

  // insert content
  document.querySelector("p").innerHTML = currentPrompt.answer;
  document.querySelector("h4").innerHTML = currentPrompt.category;
};

const renderKey = () => {
  // show / hide elements
  answerBtn.hidden = true;
  keyBtn.hidden = false;
  nextBtn.hidden = false;
  card.innerHTML = key;

  // get current card
  let idx = keyOrder.pop();
  let currentKey = KEY_CARDS[idx];

  // insert content
  document.querySelector("h2").innerHTML = currentKey.title;
  document.querySelector("img").src = currentKey.image;
  document.querySelector("img").alt = currentKey.alt;
  document.querySelector("p").innerHTML = currentKey.content;

  // if deck is empty, re-shuffle
  if (keyOrder.length === 0) {
    keyOrder = shuffle(KEY_CARDS);
  }
};

document.querySelector("#nav2").onclick = () => renderAbout();

document.querySelector("#nav3").onclick = () => renderInstructions();

document.querySelector("#begin").onclick = () => renderPrompt();

answerBtn.onclick = () => renderAnswer();

nextBtn.onclick = () => renderPrompt();

keyBtn.onclick = () => renderKey();
