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



const voittoArray1 = [0, 1, 2]
const voittoArray2 = [3, 4, 5]
const voittoArray3 = [6, 7, 8]
const voittoArray4 = [0, 3, 6]
const voittoArray5 = [1, 4, 7]
const voittoArray6 = [2, 5, 8]
const voittoArray7 = [0, 4, 8]
const voittoArray8 = [2, 4, 6]

const voittoArrays = [voittoArray1, voittoArray2, voittoArray3, voittoArray4, voittoArray5, voittoArray6, voittoArray7, voittoArray8]

var PeliKäynnissä = true

function App() {


  //Risti = 1, Nolla = 2
  const [ristikko, setRistikko] = useState(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0));
  const [nollanVuoro, setVuoro] = useState(true)
  const [tietokoneVastustaja, setTietokoneVastustaja] = useState(false)
  const [tietokoneOnRandom, setKoneRandom] = useState(true)
  const [nollaAloittaa, setAloittaja] = useState(true)

  useEffect(() => {

    if (tietokoneVastustaja) {
      if (!nollanVuoro) {
        if (tietokoneOnRandom) {
          setRistinolla(haeRandom(ristikko))
        }
        else {
          setRistinolla(haeÄlykäsPeli(ristikko, voittoArrays))
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

  const setRistinolla = (event) => {

    if (!PeliKäynnissä) {
      return
    }

    let paikka = event

    if (ristikko[paikka] !== 0) {
      return
    }

    let päivitettyRistikko = ristikko
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

  const HaeVuoroTaiVoittaja = () => {

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
    }
  }

  const HaeVuoronVäri = () => {
    if (!PeliKäynnissä) {
      return "black"
    }

    if (nollanVuoro) {
      return "red"
    }

    return "blue"
  }

  const resetoiPeli = (Aloittaja) => {

   
    setRistikko(new Array(0, 0, 0, 0, 0, 0, 0, 0, 0));
    setVuoro(Aloittaja)
    PeliKäynnissä = true
  }


  const vaihdaKonevastus = () => {
    setTietokoneVastustaja(!tietokoneVastustaja)
  }

  const vaihdaKoneenTaso = () => {
    setKoneRandom(!tietokoneOnRandom)
  }


  const valitseAloittaja = () => {
    setAloittaja(!nollaAloittaa)
    resetoiPeli(!nollaAloittaa)
  }



  return (
    <div style={mainContainerStyle}>

      <h1>Ristinolla</h1>
      <div style={{ flexDirection: 'row' }}>
        <button style={{ width: 100, fontSize: 20, margin: 2 }} onClick={(e) => resetoiPeli(nollaAloittaa)}>Reset</button>
        <button style={{ width: 150, fontSize: 20, margin: 2 }} onClick={valitseAloittaja}>{nollaAloittaa ? "Nolla Aloittaa" : "X Aloittaa"}</button>
      </div>
      <div style={{ flexDirection: 'row' }}>

        <button style={{ width: 200, fontSize: 20, margin: 2 }}
          onClick={vaihdaKonevastus}>{tietokoneVastustaja ? "Konevastus" : "Ei konevastusta"} </button>

        {tietokoneVastustaja ?
          <button style={{ width: 200, fontSize: 20, margin: 2 }} onClick={vaihdaKoneenTaso}>{tietokoneOnRandom ? "Kone Random" : "Kone Älykäs"}</button>
          :
          []
        }
      </div>
      <div style={peliContainer}>

        <Grid>
          <Grid container direction="row" justify="flex-end">
            <Ruutu backgroundColor="#dfe1e5" onClick={setRistinolla} value={0} symbol={getSymbol(0)} />
            <Ruutu backgroundColor="#dfe1e5" onClick={setRistinolla} value={1} symbol={getSymbol(1)} />
            <Ruutu backgroundColor="#dfe1e5" onClick={setRistinolla} value={2} symbol={getSymbol(2)} />
          </Grid>
          <Grid container direction="row" justify="flex-end">
            <Ruutu backgroundColor="#dfe1e5" onClick={setRistinolla} value={3} symbol={getSymbol(3)} />
            <Ruutu backgroundColor="#dfe1e5" onClick={setRistinolla} value={4} symbol={getSymbol(4)} />
            <Ruutu backgroundColor="#dfe1e5" onClick={setRistinolla} value={5} symbol={getSymbol(5)} />
          </Grid>
          <Grid container direction="row" justify="flex-end">
            <Ruutu backgroundColor="#dfe1e5" onClick={setRistinolla} value={6} symbol={getSymbol(6)} />
            <Ruutu backgroundColor="#dfe1e5" onClick={setRistinolla} value={7} symbol={getSymbol(7)} />
            <Ruutu backgroundColor="#dfe1e5" onClick={setRistinolla} value={8} symbol={getSymbol(8)} />
          </Grid>
        </Grid>
      </div>

      <h1 style={{ color: HaeVuoronVäri() }}>{HaeVuoroTaiVoittaja()}</h1>
    </div>
  );
}

export default App;
