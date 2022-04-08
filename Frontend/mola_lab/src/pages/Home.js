import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './css/home.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import logo from '../assets/load.gif'
import { FaAngleDoubleLeft } from 'react-icons/fa' 

function Home() {
  const [isLoaded, toggleLoaded] = useState(false)//Make false later
  const [questions, setQuestions] = useState([{}])
  const [currIndex, setIndex] = useState(0)
  const [data, setData] = useState({})
  const [isLoading, toggleLoading] = useState(false)  

  const updateData = (index, optionAsAns) => {
    questions[index].answer = optionAsAns
    data.questions[index].answer = optionAsAns    
    setQuestions(questions)
    if (currIndex>=9){
      pushData()
    }
    else{
      setIndex(currIndex+1)
    }    
  }

  const previous = () => {
    if (currIndex>0){
      setIndex(currIndex-1)
    }
  }

  const skipQuest = () => {
    if (currIndex<9){
      setIndex(currIndex+1)
    }
  }

  const pushData = async () => {  
    if (currIndex>=9){  
      let subnmittedData = await axios.post("http://localhost:8000/questions/submit/" + data._id, data)
      alert("Thank you! Your submission has been recorded.")
      toggleLoaded(false)
    }
  }

  const getList = (
    <div>
      <div className='mbody'>
        <div className='question-section'>
          <div className="question-sub-sect">
            <FaAngleDoubleLeft onClick={previous} size={40} className='back-btn'/>
            <div className='question-count'>            
              <span>{"Question " + (currIndex+1)}</span>/{10}
            </div>
          </div>
          <div className='question-text'>{questions[currIndex].question}</div>
        </div>
        <div className='answer-section'>
        {          
            questions.length>1?(questions[currIndex].options.map((o) => { 
              let x = (questions[currIndex].answer == o)
              //console.log("Question: " + (i+1))
              //console.log(x)
              return (                
                x?(<div className="mbutton-active">{o}</div>)
                :(<div className="mbutton" onClick={() => updateData(currIndex, o)}>{o}</div>)
              )
            })):(<div></div>)
        }
        </div>
      </div>
      <div className='submit_class'>
        <div className={currIndex>=9?'submit-btn':"submit-btn-disabled"} id="submit" onClick={pushData}>Submit</div>
        <div className='skip-btn'id="skip" onClick={skipQuest}>Skip</div>
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
      setIndex(0)
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