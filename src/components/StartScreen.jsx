export default function StartScreen({ onStart, highScore }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-teal-700 mb-4">Quiz Game</h1>
          <p className="text-gray-600 mb-2">Test your knowledge across three difficulty levels</p>
          <p className="text-gray-600 mb-6">Answer at least 2 out of 3 questions correctly to advance to the next level</p>

          <div className="bg-teal-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-teal-800 mb-4">How to Play</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                <span>Each level has 3 questions of different types</span>
              </li>
              <li className="flex items-start">
                <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                <span>Earn 10 points for easy, 20 for medium, and 30 for hard questions</span>
              </li>
              <li className="flex items-start">
                <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                <span>Answer at least 2 questions correctly to advance</span>
              </li>
            </ul>
          </div>

        </div>
        <div className="flex gap-3 items-center flex-wrap">
          <div className="mr-auto font-bold text-sm text-gray-700">Highest Score Yet: <span className="font-semibold">{highScore}</span></div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => onStart()}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 cursor-pointer"
            >
              Start Quiz
            </button>
            <button
              onClick={() => onStart(true)}
              className="px-6 py-3 border rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Start with Shuffle
            </button>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <strong>Scoring:</strong> Easy=10, Medium=20, Hard=30. You need 2/3 in a level to progress.
        </div>
      </div>
    </div>

  )
}