import { useEffect, useState } from "react"

import Start from './components/Start'
import Quiz from './components/Quiz'


import yellowBlob from "./assets/yellow-blob.png"
import blueBlob from "./assets/blue-blob.png"
import { decode } from 'html-entities'


function App() {
  const [displayStart, setDisplayStart] = useState(true)
  const [questionsData, setQuestionsData] = useState([])
  const [restartQuiz, setRestartQuiz] = useState(false)
  const [answersSubmitted, setAnswersSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://opentdb.com/api.php?amount=5")
      const data = await res.json()
      setQuestionsData(getQuestions(data.results))
    }
    fetchData()
      .catch(console.error)
  }, [restartQuiz])

  
  
  function getQuestions(questions) {
    return questions.map((question) => {
      // give each answer element an id and answer property
      const correctAnswer = {id: self.crypto.randomUUID(), answer: decode(question.correct_answer)}
      const incorrectAnswers = question.incorrect_answers.map(answer => ({
        id: self.crypto.randomUUID(),
        answer: decode(answer)
      }))

      return ({
        id: self.crypto.randomUUID(),
        // key: id,
        question: decode(question.question),
        options: randomizeAnswers(incorrectAnswers, correctAnswer),
        correctAnswer: correctAnswer,
        selectedAnswer: null
      })
    })
  }
  
  function randomizeAnswers(arr, object) {
    let randomIndex = Math.floor(Math.random() * (arr.length + 1))
    arr.splice(randomIndex, 0, object)
    return arr
  }
  

  function newQuiz() {
    setAnswersSubmitted(false)
    setScore(0)
    setRestartQuiz(prevState => !prevState)
  }

  return (
    <>
      <img className="yellow-blob" src={yellowBlob} alt="" />
      {displayStart ?
        <Start
          setDisplayStart={setDisplayStart}
        />
        : <Quiz
          questionsData={questionsData}
          setQuestionsData={setQuestionsData}
          answersSubmitted={answersSubmitted}
          setAnswersSubmitted={setAnswersSubmitted}
          score={score}
          setScore={setScore}
          newQuiz={newQuiz}
        />}
      <img className="blue-blob" src={blueBlob} alt="" />
    </>
  )
}

export default App