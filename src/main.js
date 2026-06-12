import { quizData } from '../questions.js';

let currentQuestion = 0;
let score = 0;
let wrongAnswers = [];
let isExamMode = false;
let selectedOption = null;

const app = document.getElementById('app');

function render() {
  if(currentQuestion >= quizData.length) {
    showResults();
    return;
  }

  const q = quizData[currentQuestion];
  app.innerHTML = `
    <h1>MLS 113 Quiz</h1>
    <div class="mode-toggle">
      <button class="${!isExamMode?'active':''}" onclick="toggleMode()">Practice Mode</button>
      <button class="${isExamMode?'active':''}" onclick="toggleMode()">Exam Mode</button>
    </div>
    <div class="progress"><div class="progress-bar" style="width:${(currentQuestion/quizData.length)*100}%"></div></div>
    <p class="q-count">Question ${currentQuestion + 1} of ${quizData.length}</p>
    <label style="font-size:14px">Background Color:</label>
    <input type="color" value="#667eea" onchange="document.body.style.background=event.target.value">
    <div class="question">${q.question}</div>
    ${q.options.map((opt,i)=>`<div class="option" onclick="select(${i})">${opt}</div>`).join('')}
    <button class="main" onclick="submit()">Submit Answer</button>
  `;
}

window.select = (i) => {
  selectedOption = i;
  document.querySelectorAll('.option').forEach((el,idx)=>{
    el.classList.toggle('selected', idx===i);
  });
}

window.submit = () => {
  if(selectedOption === null) return alert('Please select an option first');
  const q = quizData[currentQuestion];
  if(selectedOption!== q.correctAnswer) {
    wrongAnswers.push({...q, yourAnswer: selectedOption});
  } else {
    score++;
  }
  if(!isExamMode) {
    app.innerHTML += `<div class="explanation"><b>Explanation:</b> ${q.explanation}</div><button class="main" onclick="next()">Next Question</button>`;
    return;
  }
  next();
}

window.next = () => {
  currentQuestion++;
  selectedOption = null;
  render();
}

window.toggleMode = () => {
  isExamMode =!isExamMode;
  render();
}

function showResults() {
  app.innerHTML = `
    <h1>Quiz Complete! 🎉</h1>
    <h2 style="text-align:center;margin:20px 0">Score: ${score}/${quizData.length} = ${Math.round(score/quizData.length*100)}%</h2>
    ${wrongAnswers.length > 0? `
      <h3 style="margin:20px 0">Review Wrong Answers:</h3>
      ${wrongAnswers.map(w=>`<div style="margin:15px 0;padding:18px;background:rgba(255,255,255,0.15);border-radius:14px"><b>${w.question}</b><br><br>Your answer: ${w.options[w.yourAnswer]}<br><b>Correct: ${w.options[w.correctAnswer]}</b><br><br>${w.explanation}</div>`).join('')}
    ` : '<h3 style="text-align:center">Perfect Score! No wrong answers 👏</h3>'}
    <button class="main" onclick="location.reload()">Retake Quiz</button>
  `;
}

render();
