import React, { useEffect, useMemo, useState } from 'react'
import StartScreen from './components/StartScreen'
import QuestionCard from './components/QuestionCard'
import ResultScreen from './components/ResultScreen'
import data from './constant/questions.json'

const LEVELS = ['easy', 'medium', 'hard']
const POINTS = { easy: 10, medium: 20, hard: 30 }
const MINIMUM_REQUIRED_TO_PASS = 2

function shuffleArray(a) {
  const arr = [...a]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function App() {
  const [started, setStarted] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0)
  const [questions, setQuestions] = useState([])
  const [qIndex, setQIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [timerEnabled, setTimerEnabled] = useState(true)
  const [maxScore, setMaxScore] = useState(0)
  const [answered, setAnswered] = useState(false)


  useEffect(() => {
    const storedHigh = localStorage.getItem('highscore')
    if (!storedHigh) localStorage.setItem('highscore', '0')
  }, [])

  useEffect(() => {
    if (!started) return
    const level = LEVELS[currentLevelIndex]
    let questions = data[level] || []
    if (shuffle) questions = shuffleArray(questions)
    setQuestions(questions)
    setQIndex(0)
    setCorrectCount(0)
    setAnswered(false)
    setMaxScore(prev => prev + (questions.length * POINTS[level]))
  }, [started, currentLevelIndex, shuffle])


  function handleStart(withShuffle = false) {
    setShuffle(withShuffle)
    setStarted(true)
    setTimerEnabled(true)
    setScore(0)
    setFinished(false)
    setMaxScore(0)
    setCurrentLevelIndex(0)
  }

  function handleAnswer({ correct, auto }) {
    if (answered) return
    setAnswered(true)
    const currentLevel = LEVELS[currentLevelIndex]
    if (correct) {
      setScore((score) => score + POINTS[currentLevel])
      setCorrectCount((count) => count + 1)
    }

    setTimeout(() => {
      const next = qIndex + 1
      if (next >= questions.length) {
        const passed = correctCount + (correct ? 1 : 0) >= MINIMUM_REQUIRED_TO_PASS
        if (passed) {
          if (currentLevelIndex === LEVELS.length - 1) {
            finishGame(LEVELS[currentLevelIndex])
          } else {
            setCurrentLevelIndex((i) => i + 1)
          }
        } else {
          setStarted(false)
          finishGame(LEVELS[currentLevelIndex], true)
        }
      } else {
        setQIndex(next)
        setAnswered(false)
      }
    }, 600)
  }

  function finishGame(levelReached, failed = false) {
    setFinished(true)
    setStarted(false)

    const old = Number(localStorage.getItem('highscore') || '0')
    if (score > old) localStorage.setItem('highscore', String(score))
  }

  function restart() {
    setStarted(false)
    setFinished(false)
    setScore(0)
    setCurrentLevelIndex(0)
  }

  if (!started && !finished) {
    const highScore = Number(localStorage.getItem('highscore') || '0')
    return <StartScreen onStart={(start) => handleStart(start)} highScore={highScore} />
  }

  if (finished) {
    return <ResultScreen score={score} maxScore={maxScore} onRestart={restart} levelReached={LEVELS[currentLevelIndex]} />
  }

  const isQuestion = questions[qIndex]
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="w-full max-w-3xl">
        <div className="mb-4 flex items-center justify-between">
          <div className={`text-lg font-semibold ${currentLevelIndex === 0 ? 'text-teal-600' : currentLevelIndex === 1 ? 'text-yellow-400' : 'text-red-600'}`}>
            Level: <strong className='capitalize'>{LEVELS[currentLevelIndex]}</strong>
          </div>
          <div className="flex justify-between items-center gap-3">
            <button className="px-4 py-2 border rounded-md cursor-pointer" onClick={() => { setTimerEnabled((t) => !t) }}>{timerEnabled ? 'Disable Timer' : 'Enable Timer'}</button>
            <button className="px-4 py-2 border rounded-md cursor-pointer" onClick={() => { restart() }}>Restart</button>
            <div className="text-lg text-gray-700">Score: <strong>{score}</strong></div>
          </div>

        </div>

        {isQuestion ? (
          <QuestionCard q={isQuestion} onAnswer={handleAnswer} index={qIndex} total={questions.length} timerEnabled={timerEnabled} />
        ) : (
          <div className="p-6 bg-white rounded-xl shadow">Loading...</div>
        )}
      </div>
    </div>
  )
}
