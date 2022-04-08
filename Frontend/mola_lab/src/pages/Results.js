import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import "./css/results.css"
import axios from 'axios'
import { CSVDownload, CSVLink } from "react-csv";

function Results() {
  const [data, setData] = useState([])
  const [survey, setSurvey] = useState([])

  useEffect(() => {
    fetchData()    
  }, [])

  const fetchData = async () => {
    let d = await axios.get("http://localhost:8000/questions/all")
    setData(d.data.data)
  }

  const downloadCSV = async (id) => {
    let d = await axios.get("http://localhost:8000/questions/" + id)
    let data = d.data.data
  }
  
  const getData = data.map((d, index) => {
    let survey = []
    survey.push(["Questions", "Answer"])
    for(let i=0; i<d.questions.length;i++){      
      survey.push([d.questions[i].question, d.questions[i].answer])
    }
    const endDate = new Date(`${d.endTime}`)
    const startDate = new Date(`${d.startTime}`)
    console.log("End:" + endDate)
    console.log("ID: " + d._id + " Start: " + startDate)
    return (
      <Card>        
        <Card.Body>
          <Card.Title>{"Survey " + (index+1)}</Card.Title>
          <Card.Text>
            {"Duration: " + (endDate.getMinutes() - startDate.getMinutes()) + " mins"}
          </Card.Text>
          <div className="download-container">
            <div className="download-btn">
              <CSVLink data={survey} style={{color:'white', textDecoration:'none'}}>
                Download Report
              </CSVLink>              
            </div>
          </div>
        </Card.Body>
      </Card>
    )
  })
  return (
    <div>
      {data.length > 0? (getData):(<div></div>)}
    </div>
  );
}

export default Results;