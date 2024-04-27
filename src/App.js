import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [data, setData] = useState(null);
  const [inputQuestion, setInputQuestion] = useState('');

  useEffect(() => {
    if (inputQuestion.trim() !== '') {
      fetchSimilarQuestionAnswer();
    }
  }, []);

  const fetchSimilarQuestionAnswer = () => {
    fetch("/api", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: inputQuestion })
    }).then(
      res => res.json()
    ).then(
      data => {
        setData(data);
        console.log(data);
      }
    );
  };
  const handleInputChange = (event) => {
    setInputQuestion(event.target.value);
  };
  const handleButtonClick = () => {
    fetchSimilarQuestionAnswer();
  };
  return (
    <div className="App">
      <div className='container'>
      <h2>Find Similar Question & Answer about Interior Design</h2>
      <br/><br/>
      <input
        type="text"
        value={inputQuestion}
        onChange={handleInputChange}
        placeholder="Enter your question..."
        className="form-control form-control-lg mb-2"
      /><br/><br/>
      <button onClick={handleButtonClick}className='btn btn-success '>Find Answer</button>
      <br/><br/>
      {data && (
        <div className='checkbox'>
          {/* <h3>{data.most_similar_question}</h3> */}
  
          <p className="form-control form-control-lg">{data.most_similar_answer}</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;






