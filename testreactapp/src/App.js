import React, { useState } from 'react';

//import './App.css';



function App() {
  //Array destructuring
  const [bruttopalkka, setBrutto] = useState(0);
  const [veroprosentti, setVero] = useState(0);


  //Styles
  const textInputStyle = 
  {
    margin: 10,
    display: "flex",
    width: 300,
    justifyContent: 'space-between',
  }

  const mainContainerStyle =
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }


  const muutaBruttoa = (event) => setBrutto(event.target.value)
  const muutaVeroa = (event) => setVero(event.target.value)

  const laskeVeromäärä = () => {
    return  bruttopalkka * veroprosentti / 100
  }

  const laskeNettopalkka = () => {
    return bruttopalkka - laskeVeromäärä()
  }
    
  return (

    <div style={mainContainerStyle}>
      <h1>Verolaskuri!</h1>

        <div style={textInputStyle}>
          <b>Bruttopalkka:</b>
          <input style={{textAlign: 'right'}} onChange={event => muutaBruttoa(event)} value={bruttopalkka}/>
        </div>

        <div style={textInputStyle}>
          <b>Vero%:</b>
          <input style={{textAlign: 'right'}} onChange={event => muutaVeroa(event)} value={veroprosentti}/>
        </div>

    
      <b style={{marginTop: 20}}>{"Veromäärä " + laskeVeromäärä()}</b>
      <b>{"Nettopalkka " + laskeNettopalkka()}</b>

    </div>
  );
}

export default App;
