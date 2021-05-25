// TODO: imports?

const PROMPT_CARDS = [
  {
    title: "QUESTION",
    prompt:
      "How many maternal deaths are there for every 100,000 live births in the United States?",
    answer:
      "17 — more than double of most high-income countries according to OECD health. Black women are the most affected by this statistic.",
    category: "postpartum",
  },
  {
    title: "REFLECT",
    prompt:
      "What does your new body, the one capable of making and sustaining life, invoke to you?",
    answer: "",
    category: "postpartum",
  },
  {
    title: "GUESS",
    prompt:
      "Because of the existing precarious care conditions, after the pandemic, women's workforce participation has dropped by...",
    answer:
      "57%, totaling 2.2 million according to the National Women's Law Center. Women of color are yet the most affected.",
    category: "postpartum",
  },
];

const KEY_CARDS = [
  {
    title: "MIRROR",
    image: "/assets/0.png",
    content: "Use the Mirror Card to bounce the question to another player.",
  },
  {
    title: "SILENCE",
    image: "/assets/1.png",
    content:
      "Use the Silence Card to request a moment of silence on the table.",
  },
  {
    title: "SWAP",
    image: "/assets/2.png",
    content:
      "Swap Card allows you to swap out the card you have already picked with a different card.",
  },
];

const shuffle = (deck) => {
  const order = [];
  for (let i = 0; i < deck.length; i++) {
    order.push(i);
  }

  let currentIdx = order.length;
  while (0 !== currentIdx) {
    randomIdx = Math.floor(Math.random() * currentIdx);
    currentIdx--;
    temp = order[currentIdx];
    order[currentIdx] = order[randomIdx];
    order[randomIdx] = temp;
  }

  return order;
};

console.log(shuffle(KEY_CARDS));
