import React from 'react';
import "../css/finishScreen.css"
function FinishScreen ({ score, setGameStart}) {
  return (
    <div className="finish-screen">

    {score > 7 ? 
    <h1>Well done!</h1> 
    : 
    <h1>lmao, fake pokemon nerd confirmed</h1>}
      <h2>{score}/10</h2>
      <button onClick={()=>setGameStart(false)}>Return</button>
    </div>
  );
}   export default FinishScreen;