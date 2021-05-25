export const Main = `
<h1>Conversations For Every Dinner Table</h1>
<a href="/prompt"><button>Click to Begin</button></a>`;

export const About = `
<h3>About</h3>

<p>In 1994, 12 black women coined the term reproductive justice. It is "the complete physical, mental, spiritual, political, social, and economic well-being of women and girls, based on the full achievement and protection of women’s human rights" as Loretta Ross describes. Fighting against reproductive oppression and misinformation is essential for our liberation.</p>

<p>Perfect Conversations for Every Dinner Table is a resource that aims to support the power of individuals to provoke open and healthy discussions on how to achieve better lives for their families and their communities. Start a meaningful and shameless conversation by picking a card.</p>`;

export const Instructions = `<h3>Instructions</h3>

<p>TODO: add stuff about prompt cards, key cards, etc</p>

`;

export const Prompt = `
<div id="card">
        <h2></h2>
        <p></p>
        <h4></h4>
      </div>
      <button>Draw a Key Card</button>
      <a href="/answer"><button>See the Answer</button></answer>
    </div>
`;

export const Answer = `
<div id="card">
        <h2>ANSWER</h2>
        <p></p>
        <h4></h4>
      </div>
      <a onclick="window.history.back();"><button>Back to Prompt</button></a>
      <a href="/prompt"><button>See Next Card</button></a>
    </div>`;

export const Key = ``;
