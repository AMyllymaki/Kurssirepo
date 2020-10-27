import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core'
import Ruutu from './components/Ruutu'
import { haeRandom, haeÄlykäsPeli } from './components/Koneäly'

const mainContainerStyle =
{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 100
}

const peliContainer =
{
  marginTop: 20,
  padding: 20,
  backgroundColor: "black"
}

const valikkoButtonStyle =
{
  width: 170,
  fontSize: 20,
  margin: 2
}



const voittoArray1 = [0, 1, 2]
const voittoArray2 = [3, 4, 5]
const voittoArray3 = [6, 7, 8]
const voittoArray4 = [0, 3, 6]
const voittoArray5 = [1, 4, 7]
const voittoArray6 = [2, 5, 8]
const voittoArray7 = [0, 4, 8]
const voittoArray8 = [2, 4, 6]

const voittoArrays = [voittoArray1, voittoArray2, voittoArray3, voittoArray4, voittoArray5, voittoArray6, voittoArray7, voittoArray8]

let PeliKäynnissä = true

function App() {


  //Risti = 1, Nolla = 2
  const [ristikko, setRistikko] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [nollanVuoro, setVuoro] = useState(true)
  const [tietokoneVastustaja, setTietokoneVastustaja] = useState(false)
  const [tietokoneOnRandom, setTietokoneOnRandom] = useState(true)
  const [nollaAloittaa, setNollaAloittaa] = useState(true)


  useEffect(() => {

    if (tietokoneVastustaja) {
      if (!nollanVuoro) {
        if (tietokoneOnRandom) {
          asetaRistinolla(haeRandom(ristikko))
        }
        else {
          asetaRistinolla(haeÄlykäsPeli(ristikko, voittoArrays))
        }
      }
    }
  })

  const getSymbol = (paikka) => {
    if (ristikko[paikka] === 1) {
      return "X"
    }
    else if (ristikko[paikka] === 2) {
      return "O"
    }

    return ""
  }

  const asetaRistinolla = (event) => {

    if (!PeliKäynnissä) {
      return
    }

    let paikka = event

    if (ristikko[paikka] !== 0) {
      return
    }

    let päivitettyRistikko = [].concat(ristikko)
    päivitettyRistikko[paikka] = getVuoro()
    setVuoro(!nollanVuoro)
    setRistikko(päivitettyRistikko)
  }

  const getVuoro = () => {
    if (nollanVuoro) {
      return 2
    }
    else {
      return 1
    }
  }

  //0 peli jatkuu, 1 risti voittaa, 2 nolla voittaa, 3 tasapeli
  const tarkistaVoitto = () => {

    for (let i = 0; i < voittoArrays.length; i++) {
      let pisteitäNollalle = 0

      for (let j = 0; j < voittoArrays[i].length; j++) {
        let voittoRuutu = voittoArrays[i][j]

        if (ristikko[voittoRuutu] === 1) {
          pisteitäNollalle--
        }
        else if (ristikko[voittoRuutu] === 2) {
          pisteitäNollalle++
        }

        if (pisteitäNollalle === voittoArrays[i].length) {
          return 2
        }
        else if (pisteitäNollalle === -voittoArrays[i].length) {
          return 1
        }
      }
    }

    if (!ristikko.includes(0)) {
      return 3
    }

    return 0
  }

  const haeVuoroTaiVoittaja = () => {

    switch (tarkistaVoitto()) {
      case 0:
        if (nollanVuoro) {
          return "O Vuoro"
        }
        return "X Vuoro"
      case 1:
        PeliKäynnissä = false
        return "Ristit voitti"
      case 2:
        PeliKäynnissä = false
        return "Nollat voitti"
      case 3:
        PeliKäynnissä = false
        return "Tasapeli"
      default:
        return ""
    }
  }

  const haeVuoronVäri = () => {
    if (!PeliKäynnissä) {
      return "black"
    }

    if (nollanVuoro) {
      return "red"
    }

    return "blue"
  }

  const resetoiPeli = (Aloittaja) => {


    setRistikko([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setVuoro(Aloittaja)
    PeliKäynnissä = true
  }


  const vaihdaKonevastus = () => {
    setTietokoneVastustaja(!tietokoneVastustaja)
  }

  const vaihdaKoneenTaso = () => {
    setTietokoneOnRandom(!tietokoneOnRandom)
  }


  const valitseAloittaja = () => {
    setNollaAloittaa(!nollaAloittaa)
    resetoiPeli(!nollaAloittaa)
  }



  return (
    <div style={mainContainerStyle}>

      <h1>Ristinolla</h1>
      <div style={{ flexDirection: 'row' }}>
        <button style={valikkoButtonStyle} onClick={(e) => resetoiPeli(nollaAloittaa)}>Reset</button>
        <button style={valikkoButtonStyle} onClick={valitseAloittaja}>{nollaAloittaa ? "Nolla Aloittaa" : "X Aloittaa"}</button>
      </div>
      <div style={{ flexDirection: 'row' }}>

        <button style={valikkoButtonStyle}
          onClick={vaihdaKonevastus}>{tietokoneVastustaja ? "Konevastus" : "Ei konevastusta"} </button>

        {tietokoneVastustaja ?
          <button style={valikkoButtonStyle} onClick={vaihdaKoneenTaso}>{tietokoneOnRandom ? "Kone Random" : "Kone Älykäs"}</button>
          :
          []
        }
      </div>
      <div style={peliContainer}>

        <Grid container direction="row" style={{ width: 309 }}>

          {ristikko.map((ruutu, i) => <Ruutu onClick={asetaRistinolla} key={i} value={i} symbol={getSymbol(i)} />)}

        </Grid>
      </div>

      <h1 style={{ color: haeVuoronVäri() }}>{haeVuoroTaiVoittaja()}</h1>
    </div>
  );
}

export default App;
