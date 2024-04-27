import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState(''); // State to hold input text
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const fetchData = () => {
    fetch("/api")
      .then(res => res.json())
      .then(data => {
        setData(data.similar_pairs);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value); // Update inputText state with input value
  };

  const handleSubmit = () => {
    // Send input text to server
    fetch("/api", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: inputText }), // Send input text as JSON
    })
      .then(res => res.json())
      .then(data => {
        setData(data.similar_pairs);
      })
      .catch(error => console.error('Error submitting data:', error));
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter your question"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        {data.length === 0 ? (
          <p>not find...</p>
        ) : (
          data.map((member, i) => (
            <p key={i}>{member}</p>
          ))
        )}
      </div>
    </div>
  );
}

export default App;





// import React,{useState,useEffect} from 'react';
// import './App.css';

// function App() {
//   const [data,setData]=useState(0)

//   useEffect(()=>{
//     fetch("/api").then(
//       res=>res.json(res)
//     ).then(
//       data=>{
//         setData(data)
//         console.log(data)
//       } 
//     )
//   },[])
//   return (
//     <div className="App">
//       <div>
//       {(typeof data.similar_pairs==='undefined')?(
//       <p>loading...</p>
//       )
//       :( data.similar_pairs.map((member,i)=>(
//         <p key={i}>{member}</p>
//       )))}
//       </div>
      
//     </div>
//   );
// }

// export default App;
