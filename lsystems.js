// Define the L-System grammar
const axiom = "F";
const variables = ["F"];
const constants = ["+", "-"];
const maxIterations = 5;

// Generate a random ruleset
const generateRules = (variables, constants) => {
  const rules = {};
  for (let i = 0; i < variables.length; i++) {
    const variable = variables[i];
    const numRules = Math.floor(Math.random() * 3) + 1; // generate between 1 and 3 rules for each variable
    rules[variable] = "";
    for (let j = 0; j < numRules; j++) {
      const rule = [];
      const ruleLength = Math.floor(Math.random() * 4) + 1; // generate between 1 and 4 symbols for each rule
      for (let k = 0; k < ruleLength; k++) {
        const symbolType = Math.random() < 0.5 ? "variable" : "constant"; // randomly choose a variable or constant symbol
        const symbols = symbolType === "variable" ? variables : constants;
        rule.push(symbols[Math.floor(Math.random() * symbols.length)]);
      }
      rules[variable] += rule.join("");
    }
  }
  console.log(rules);
  return rules;
};

const rules = generateRules(variables, constants);

// Define the interpretation of symbols
const stepSize = 5;
const angle = Math.PI / 4;

// Generate the sequence of symbols
let sequence = axiom;
for (let i = 0; i < maxIterations; i++) {
  let newSequence = "";
  for (let j = 0; j < sequence.length; j++) {
    const symbol = sequence[j];
    if (rules[symbol]) {
      newSequence += rules[symbol];
    } else {
      newSequence += symbol;
    }
  }
  sequence = newSequence;
}

// Interpret the sequence as drawing instructions
let x = 400;
let y = 600;
let theta = 0;
const stack = [];
const canvas = document.getElementById("Lsystemscanvas");
const ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.moveTo(x, y);
for (let i = 0; i < sequence.length; i++) {
  const symbol = sequence[i];
  switch (symbol) {
    case "F":
      const dx = stepSize * Math.cos(theta);
      const dy = stepSize * Math.sin(theta);
      x += dx;
      y += dy;
      ctx.lineTo(x, y);
      break;
    case "+":
      theta += angle * (Math.random() * 2 - 1); // randomly add or subtract a small angle offset
      break;
    case "-":
      theta -= angle * (Math.random() * 2 - 1); // randomly add or subtract a small angle offset
      break;
    case "[":
      stack.push({x, y, theta});
      break;
    case "]":
      const state = stack.pop();
      x = state.x;
      y = state.y;
      theta = state.theta;
      ctx.moveTo(x, y);
      break;
    default:
      break;
  }
}
ctx.stroke();
