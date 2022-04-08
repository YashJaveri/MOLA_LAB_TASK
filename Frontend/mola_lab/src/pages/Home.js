import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './css/home.css'
import { useState } from 'react'
import axios from 'axios'
import logo from '../assets/load.gif'

function Home() {
  const [isLoaded, toggleLoaded] = useState(false)//Make false later
  const [questions, setQuestions] = useState([{}])
  const [data, setData] = useState({})
  const [isLoading, toggleLoading] = useState(false)  

  const updateData = (index, optionAsAns) => {
    questions[index].answer = optionAsAns
    data.questions[index].answer = optionAsAns    
    setQuestions(questions)    
  }

  const pushData = async () => {
    console.log("ID: " + data._id)
    console.log(data)
    let subnmittedData = await axios.post("http://localhost:8000/questions/submit/" + data._id, data)
    alert("Thank you! Your submission has been recorded.")
    toggleLoaded(false)
  }

  const loadData = questions.map((q, i) => {
    return (
      <div className='mbody'>
        <div className='question-section'>
          <div className='question-count'>
            <span>{"Question " + (i+1)}</span>/{10}
          </div>
          <div className='question-text'>{q.question}</div>
        </div>
        <div className='answer-section'>
        {
            questions.length>1?(q.options.map((o) => {
              return (
                q.answer === o?(<div className="mbutton-active">{o}</div>)
                :(<div className="mbutton" onClick={() => updateData(i, o)}>{o}</div>)
              )
            })):(<div></div>)
        }
        </div>        
      </div>)
  })

  const getList = (
    <div>
      {loadData}
      <div className='submit_class'>
        <div className='submit-btn'onClick={pushData}>Submit</div>
      </div>
    </div>
  )

  const startSurvey = async () => {    
    try{
      toggleLoading(true)
      let d = await axios.post("http://localhost:8000/questions")
      let _data = d.data.data      
      setQuestions(_data.questions)
      setData(_data)
      toggleLoaded(true)
      toggleLoading(false) 
    }
    catch(e){
      console.log(e)
    }
  }

  return (    
    <div className="main-body">
      {
        isLoaded?(getList):(
          <div className="intro">
            {isLoading?(<img src={logo} alt="loading..." />)
            :(<div>
                <div className='intro-text'>Welcome To Survey Monkey!</div>
                <div className="round-button" onClick={() => startSurvey()}>Start Survey</div>
              </div>
             )}
          </div>
      )}
    </div>
  );
}

export default Home;