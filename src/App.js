import React,{useState,useEffect} from 'react';
import './App.css';

function App() {
  const [data,setData]=useState(0)

  useEffect(()=>{
    fetch("/api").then(
      res=>res.json(res)
    ).then(
      data=>{
        setData(data)
        console.log(data)
      } 
    )
  },[])
  return (
    <div className="App">
      <h2>hello</h2>{
      (typeof data.similar_pairs==='undefined')?(
      <p>loading...</p>
      )
      :( data.similar_pairs.map((member,i)=>(
        <p key={i}>{member}</p>
      )))}
    </div>
  );
}

export default App;
