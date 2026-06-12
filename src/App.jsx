import { useState } from 'react'
import questions from './questions'

export default function App() {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showScore, setShowScore] = useState(false)
  const [mode, setMode] = useState('practice')
  const [bgColor, setBgColor] = useState('#FF6B6B')
  const [wrongAnswers, setWrongAnswers] = useState([])

  const current = questions[index]

  const handleAnswer = (option) => {
    setSelected(option)
    if (option === current.answer) {
      setScore(score + 1)
    } else {
      setWrongAnswers([...wrongAnswers, {q: current.question, your: option, correct: current.answer}])
    }

    if (mode === 'exam') {
      setTimeout(() => nextQuestion(), 1000)
    }
  }

  const nextQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1)
      setSelected(null)
    } else {
      setShowScore(true)
    }
  }

  if (showScore) {
    return (
      <div style={{padding: '20px', background: bgColor, minHeight: '100vh', color: 'white', fontFamily: 'Arial', fontSize: '18px'}}>
        <h1>Quiz Complete! 🎉</h1>
        <h2>Score: {score} / {questions.length}</h2>

        <h3>Review Wrong Answers:</h3>
        {wrongAnswers.length === 0? <p>Perfect! No wrong answers 🔥</p> :
          wrongAnswers.map((w, i) => (
            <div key={i} style={{margin: '10px 0', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px'}}>
              <p><b>Q:</b> {w.q}</p>
              <p><b>Your answer:</b> {w.your} ❌</p>
              <p><b>Correct:</b> {w.correct} ✅</p>
            </div>
          ))
        }
        <button onClick={() => window.location.reload()} style={{width: '100%', padding: '15px', fontSize: '20px', marginTop: '20px'}}>Restart</button>
      </div>
    )
  }

  return (
    <div style={{padding: '20px', background: bgColor, minHeight: '100vh', color: 'white', fontFamily: 'Arial'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexDirection: 'column', gap: '10px'}}>
        <button onClick={() => setMode(mode === 'exam'? 'practice' : 'exam')} style={{width: '100%', padding: '12px', fontSize: '18px'}}>
          Mode: {mode === 'exam'? 'Exam ⏱️' : 'Practice 📝'}
        </button>
        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{width: '100%', height: '50px'}} />
      </div>

      <div style={{background: 'rgba(0,0,0,0.2)', height: '10px', borderRadius: '5px', marginBottom: '20px'}}>
        <div style={{width: `${(index/questions.length)*100}%`, height: '100%', background: 'white', borderRadius: '5px'}}></div>
      </div>

      <h3 style={{fontSize: '20px'}}>Question {index + 1} of {questions.length}</h3>
      <h2 style={{fontSize: '24px', lineHeight: '1.4'}}>{current.question}</h2>

      <div>
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            disabled={selected!== null}
            style={{
              display: 'block',
              width: '100%',
              padding: '18px',
              margin: '12px 0',
              fontSize: '20px',
              borderRadius: '12px',
              border: 'none',
              cursor: selected!== null? 'default' : 'pointer',
              background: selected === opt
              ? opt === current.answer? '#4CAF50' : '#f44336'
                : 'white',
              color: selected === opt? 'white' : 'black'
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      {mode === 'practice' && selected && (
        <button onClick={nextQuestion} style={{width: '100%', padding: '15px', fontSize: '20px', marginTop: '20px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '12px'}}>
          Next Question →
        </button>
      )}
    </div>
  )
}
