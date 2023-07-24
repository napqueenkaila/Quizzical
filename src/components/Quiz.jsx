import "./quiz.css"
import classNames from "classnames"

export default function Quiz(props) {
    const { questionsData, setQuestionsData, newQuiz, answersSubmitted, setAnswersSubmitted, score, setScore } = props

    function handleAnswerClick(questionId, selectedAnswer) {
        setQuestionsData(prevQuestionsData => {
            return prevQuestionsData.map(question => {
                if (question.id === questionId) {
                    return { ...question, selectedAnswer: selectedAnswer }
                } else {
                    return question
                }
            })
        })
    }



    const questionElements = questionsData.map((question) => {
        const answerElements = question.options.map((option) => {
            return (
                <div key={option.id} 
                    onClick={() => handleAnswerClick(question.id, option.answer)}
                    className={
                        classNames(
                            "answer",
                            {"hoverable": !answersSubmitted},
                            { "selected-answer": !answersSubmitted && option.answer === question.selectedAnswer },
                            { "correct-answer": answersSubmitted && option.answer === question.correctAnswer.answer },
                            { "wrong-answer": answersSubmitted && option.answer != question.correctAnswer.answer },
                            {"unselected": answersSubmitted && option.answer != question.correctAnswer.answer && option.answer !== question.selectedAnswer}
                        )
                    }
                >
                    {option.answer}
                </div>
            )
        })
        return (
            <div key={question.id} className="question-container">
                <div className="question">
                    {question.question}
                </div>
                <div className="answer-container">
                    {answerElements}
                </div>
                <hr />
            </div>
        )
    })

    
    function submitQuiz() {
        setAnswersSubmitted(true)
        
        questionsData.forEach((question) => {
            if (question.selectedAnswer === question.correctAnswer.answer) {
                setScore(prevScore => prevScore += 1)
            }
        })
    }

    return (
        <div className='outer-container'>
            <div className='quiz-container'>
                {questionElements}
            </div>
            <div className="quiz-results">
                {
                    answersSubmitted && 
                    <p className="score">You scored {score}/5 correct answers</p>
                }
                {
                    answersSubmitted ?
                        <button className='submit-quiz-btn' onClick={() => newQuiz()}>Play again</button>
                        : <button className="submit-quiz-btn" onClick={() => submitQuiz()}>Check answers</button>
                }

            </div>
        </div>
    )
}

