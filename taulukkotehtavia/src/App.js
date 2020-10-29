
import { useState } from "react"
import PäiväLaskuri from './components/päivälaskuri/Päivälaskuri'
import KuukausiLaskuri from './components/kuukausilaskuri/KuukausiLaskuri'
import TaulukkoJärjestelijä from './components/TaulukkoJärjestelijä'



function App() {

  const [ohjelma, setOhjelma] = useState("taulukkojärjestelijä")


  const getOhjelma = () => {
    switch (ohjelma) {
      case "päivälaskuri":
        return <PäiväLaskuri />
      case "kuukausilaskuri":
        return <KuukausiLaskuri />
      case "taulukkojärjestelijä":
        return <TaulukkoJärjestelijä />
      default:
        return []
    }
  }

  const vaihdaOhjelma = (ohjelma) => {
    setOhjelma(ohjelma)
  }

  return (
    <div >
      <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center' }}>
        <button onClick={() => vaihdaOhjelma("päivälaskuri")} >Päivälaskuri</button>
        <button onClick={() => vaihdaOhjelma("kuukausilaskuri")}>KuukausiLaskuri</button>
        <button onClick={() => vaihdaOhjelma("taulukkojärjestelijä")}>Taulukkojärjestelijä</button>
      </div>
      {getOhjelma()}
    </div>
  );
}

export default App;
