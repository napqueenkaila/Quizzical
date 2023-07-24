import "./start.css"

export default function Start(props) {
    const {setDisplayStart} = props
    
    function startQuiz() {
        setDisplayStart(false)
    }

    return (
        <div className="start-div">
            <h1 className="title">Quizzical</h1>
            <h3 className="subtitle">Test your knowledge!</h3>
            <button onClick={startQuiz} className="start-btn">Start Quiz</button>
        </div>
    )
}


