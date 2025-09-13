import React, { useEffect, useState } from 'react'

export default function QuestionCard({ q, onAnswer, index, total, timerEnabled }) {
  const [selected, setSelected] = useState(null)
  const [textValue, setTextValue] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [timeLeft, setTimeLeft] = useState(timerEnabled ? 20 : null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setSelected(null)
    setTextValue('')
    setFeedback(null)
    setTimeLeft(timerEnabled ? 20 : null)
  }, [q])

  useEffect(() => {
    if (!timerEnabled) return
    if (timeLeft === null) return
    if (timeLeft <= 0) {
      handleSubmit(true)
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, timerEnabled])

  function checkAnswer() {
    let correct = false
    if (q.type === 'multiple-choice') {
      correct = selected === q.correctAnswer
    } else if (q.type === 'true-false') {
      correct = String(selected) === String(q.correctAnswer)
    } else if (q.type === 'text-input') {
      correct = textValue.trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
    }
    return correct
  }

  function handleSubmit(auto = false) {
    if (!auto && (selected === null && textValue.trim() === '')) {
      setError('Please select or enter an answer before submitting.')
      return
    }
    const correct = checkAnswer()
    setFeedback(correct ? 'correct' : 'incorrect')
    onAnswer({ correct, auto })
    setError(null)
  }

  return (
    <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-sm text-gray-500">Question {index + 1} / {total}</div>
          <h2 className="text-xl font-semibold mt-1">{q.question}</h2>
        </div>
        {timerEnabled && (
          <div className="text-sm text-gray-600">Time: <span className="font-mono">{timeLeft}s</span></div>
        )}
      </div>

      <div className="space-y-3">
        {q.type === 'multiple-choice' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {q.options.map((opt) => (
              <label key={opt} className={`block p-3 border rounded-lg cursor-pointer hover:shadow ${feedback && opt === q.correctAnswer ? 'border-green-400 bg-green-50' : ''}`}
                onClick={() => {setSelected(opt); setError(null)}}>
                <input type="radio" name={`mc-${index}`} className="hidden" checked={selected === opt} readOnly />
                <div className="flex items-center justify-between">
                  <div>{opt}</div>
                  <div className={`w-4 h-4 rounded-full border ${selected === opt ? 'bg-teal-600 border-teal-600' : 'bg-white'}`}></div>
                </div>
              </label>
            ))}
          </div>
        )}

        {q.type === 'true-false' && (
          <div className="flex gap-3">
            {['true', 'false'].map((val) => (
              <button
                key={val}
                onClick={() => {setSelected(val); setError(null)}}
                className={`px-4 py-2 border rounded-lg flex-1 cursor-pointer ${selected === val ? 'bg-teal-600 text-white' : 'bg-white'}`}
              >{val.charAt(0).toUpperCase() + val.slice(1)}</button>
            ))}
          </div>
        )}

        {q.type === 'text-input' && (
          <input value={textValue} onChange={(e) => {setTextValue(e.target.value); setError(null)}} className="w-full border p-3 rounded-lg" placeholder="Type your answer" />
        )}
      </div>

      <div className="mt-4 flex justify-between items-center gap-3">
        {feedback && (
          <div className={`ml-auto px-4 py-2 rounded-md ${feedback === 'correct' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {feedback === 'correct' ? 'Correct' : 'Incorrect'}
          </div>
        )}
        {error && (
          <div className="w-full px-2 py-2 text-sm rounded-md bg-red-50 text-red-800">
            {error}
          </div>
        )}
        <div className='w-full flex justify-end gap-2'>
          <button onClick={() => handleSubmit(false)} className="px-4 py-2 bg-teal-600 text-white rounded-md cursor-pointer">Submit</button>
          <button onClick={() => { setSelected(null); setTextValue('') }} className="px-3 py-2 border rounded-md cursor-pointer">Clear</button>
        </div>
      </div>
    </div>
  )
}
