import { KEY_CARDS, PROMPT_CARDS } from "/cards.js";
import {
  manifesto,
  answer,
  instructions,
  key,
  prompt,
  guidelines,
  home,
  guidelinesModal,
  cardDesign,
} from "/views.js";

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
const backBtn = document.querySelector("#back");
const startBtn = document.querySelector("#begin");
const keyBtn = document.querySelector("#key");
const answerBtn = document.querySelector("#answer");
const nextBtn = document.querySelector("#next");
const btns = document.querySelector("#btns");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close");
const proceed = document.querySelector("#proceed");
const footer = document.querySelector("footer");
let keyCardCount = 0;

const renderHome = () => {
  app.innerHTML = home;
};

const renderManifesto = () => {
  app.innerHTML = manifesto;
  card.hidden = true;
  btns.hidden = true;
  footer.hidden = true;
};

const renderInstructions = () => {
  app.innerHTML = instructions;
  card.hidden = true;
  btns.hidden = true;
  footer.hidden = true;
};

const renderGuidelines = () => {
  app.innerHTML = guidelines;
  card.hidden = true;
  btns.hidden = true;
  footer.hidden = true;
};

const renderCardDesign = () => {
  app.innerHTML = cardDesign;
  card.hidden = true;
  btns.hidden = true;
  footer.hidden = true;
};

const renderGuidelinesModal = () => {
  modal.hidden = false;
  proceed.hidden = false;
  document.querySelector(".modal-content").innerHTML = guidelinesModal;
  document.querySelector("h3").innerHTML = "Community Guidelines";
};

const renderPrompt = () => {
  // show / hide elements
  title.hidden = true;
  startBtn.hidden = true;
  backBtn.hidden = true;
  modal.hidden = true;
  card.hidden = false;
  keyBtn.hidden = false;
  footer.hidden = false;
  card.innerHTML = prompt;

  // get current card
  let idx = promptOrder.pop();
  currentPrompt = PROMPT_CARDS[idx];

  // insert content
  document.querySelector("h2").innerHTML = currentPrompt.title;
  document.querySelector("#card p").innerHTML = currentPrompt.prompt;
  document.querySelector("h4").innerHTML = currentPrompt.category;

  // show answer only if card has an answer
  if ("answer" in currentPrompt) {
    answerBtn.hidden = false;
    nextBtn.hidden = true;
  } else {
    nextBtn.hidden = false;
  }

  // if deck is empty, re-shuffle
  if (promptOrder.length === 0) {
    promptOrder = shuffle(PROMPT_CARDS);
  }
};

const renderAnswer = () => {
  // show / hide elements
  answerBtn.hidden = true;
  keyBtn.hidden = true;
  backBtn.hidden = false;
  nextBtn.hidden = false;
  card.innerHTML = answer;

  // insert content
  document.querySelector("#card p").innerHTML = currentPrompt.answer;
  document.querySelector("h4").innerHTML = currentPrompt.category;
};

// when viewing answer, press back to go back to the prompt
const goBack = () => {
  // show / hide elements
  backBtn.hidden = true;
  keyBtn.hidden = true;
  keyBtn.hidden = false;
  card.innerHTML = prompt;

  // insert content
  document.querySelector("h2").innerHTML = currentPrompt.title;
  document.querySelector("#card p").innerHTML = currentPrompt.prompt;
  document.querySelector("h4").innerHTML = currentPrompt.category;

  // show answer only if card has an answer
  if ("answer" in currentPrompt) {
    answerBtn.hidden = false;
    nextBtn.hidden = true;
  } else {
    nextBtn.hidden = false;
  }
};

const renderKey = () => {
  // show / hide elements
  answerBtn.hidden = true;
  keyBtn.hidden = false;
  nextBtn.hidden = false;
  card.innerHTML = key;

  // get current card, keep all 10 cards in deck
  let idx = keyOrder.pop();
  let currentKey = KEY_CARDS[idx];
  keyOrder.unshift(idx);
  keyCardCount++;

  // insert content
  document.querySelector("h2").innerHTML = currentKey.title;
  document.querySelector("img").src = currentKey.image;
  document.querySelector("img").alt = currentKey.alt;
  document.querySelector("#card p").innerHTML = currentKey.content;

  // if 10 cards have been drawn, re-shuffle
  if (keyCardCount % 10 === 0) {
    keyOrder = shuffle(KEY_CARDS);
  }
};

// document.querySelector("#nav1").onclick = () => renderHome();

document.querySelector("#nav2").onclick = () => renderManifesto();

document.querySelector("#nav3").onclick = () => renderInstructions();

document.querySelector("#nav4").onclick = () => renderGuidelines();

document.querySelector("#nav5").onclick = () => renderCardDesign();

document.querySelector("#begin").onclick = () => renderGuidelinesModal();

closeModal.onclick = () => (modal.hidden = true);

proceed.onclick = () => renderPrompt();

answerBtn.onclick = () => renderAnswer();

nextBtn.onclick = () => renderPrompt();

keyBtn.onclick = () => renderKey();

backBtn.onclick = () => goBack();
