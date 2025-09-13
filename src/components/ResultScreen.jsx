export default function ResultScreen({ score, maxScore, onRestart, levelReached }) {
  const pct = Math.round((score / maxScore) * 100)
  const high = localStorage.getItem('highscore')
  const highNum = high ? Number(high) : 0
  if (score > highNum) {
    localStorage.setItem('highscore', score)
  }

  let message = ""
  if (pct === 100 && levelReached === "hard") {
    message = "Congratulations! You've completed all levels!"
  } else if (pct < 100) {
    message = `You failed at the ${levelReached} level. Try again!`
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Quiz Finished</h1>
        <p className="text-sm text-[#342121] capitalize font-bold">Level reached: <strong>{levelReached}</strong></p>

        <div className="mt-6">
          <div className="text-5xl font-extrabold">{score}</div>
          <div className="text-sm text-[#342121]">out of {maxScore} points</div>
          <div className="mt-4 text-lg">Performance: <strong>{pct}%</strong></div>
          <div className="mt-2 text-base text-[#808080] font-medium">{message}</div>
        </div>

        <div className="mt-6 flex gap-3 justify-center">
          <button onClick={onRestart} className="px-6 py-3 bg-teal-600 text-white rounded-lg cursor-pointer">Restart Quiz</button>
        </div>
      </div>
    </div>
  )
}