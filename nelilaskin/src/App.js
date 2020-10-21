import React, { useState } from 'react';
import { Grid } from '@material-ui/core'
import GridButton from './components/GridButton'



const mainContainerStyle =
{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 100
}

const laskinContainerStyle =
{
  marginTop: 20,
  padding: 20,
  backgroundColor: "#add8e6"

}

const numerokenttäStyle =
{
  margin: 10,
  marginBottom: 30,
  backgroundColor: "#AAAAAA",
  padding: 10,
  paddingTop: 5,
  paddingBottom: 5,
  display: "flex",
  width: 400,
  justifyContent: 'center',
  alignItems: 'flex-end',
  flexDirection: 'column'
}

var muistiArvo = undefined

function App() {

  //Luultavasti summa ja laskuoperaation "vasen" puoli kannattaisi käsitellä erillään
  const [summa, setSumma] = useState("0");
  const [summaaKäsitellään, setSummaaKäsitellään] = useState(true)
  const [operaattori, setOperaattori] = useState(undefined);
  const [lisättäväArvo, setLisäarvo] = useState("");
  const [lisäarvoaKäsitellään, setLisäarvoaKäsitellään] = useState(false)


  const muutaSummaa = (value) => setSumma(summa + value)
  const muutaLisäarvoa = (value) => setLisäarvo(lisättäväArvo + value)
  const muutaOperaattori = (value) => setOperaattori(value)


  const numeroPainettu = (event) => {

    let numero = event.target.value

    if (lisäarvoaKäsitellään) {

      //Ei lisätä yli yhtä pistettä
      if (numero === "." && lisättäväArvo.includes(".")) {
        return
      }

      if (lisättäväArvo === "" || lisättäväArvo === "0") {

        if (numero === ".") {
          numero = "0."
        }

        setLisäarvo(numero)
      }
      else {
        muutaLisäarvoa(numero)
      }
    }
    else {

      //kun on painettu yhtäsuuruusmerkkiä niin on summa jonka perään ei pidä enää lisätä painettuja numeroita vaan aloittaa alusta
      //siksi mukana "summaaKäsitellään" lippu
      if (summa === "" || summa === "0" || summaaKäsitellään === false) {
        
        setSummaaKäsitellään(true)

        if (numero === ".") {
          numero = "0."
        }

        setSumma(numero)
      }
      else {

        if (numero === "." && summa.includes(".")) {
          return
        }

        muutaSummaa(numero)
      }
    }
  }

  const operaattoriPainettu = (event) => {
    let operaattori = event.target.value

    setSummaaKäsitellään(false)

    //Kun operaatiota painetaan ja lisättävässä arvossa on jotain (ja sitä käsitellään laskimen näytöllä). Lisätään tämä luku summaan edeltävällä operaattorilla
    //Tässä voisi olla myös ehto sille että joku operaattori on jo aikasemmin valittu. Esim. "5 * 5 +" muutetaan "25 +"
    if (lisättäväArvo !== "" && lisäarvoaKäsitellään) {
      laske()
      setLisäarvo("")
    }
    else {
      setLisäarvo("")
      setLisäarvoaKäsitellään(true)
    }

    muutaOperaattori(operaattori)
  }

  //Muuttaa kaiken statessa alkuarvoihin
  const nollausPainettu = () => {
    setSummaaKäsitellään(true)
    setLisäarvoaKäsitellään(false)
    setLisäarvo("")
    setSumma("0")
    muutaOperaattori(undefined)
  }

  const laske = () => {

    if (operaattori === undefined) {
      return
    }

    let ensimmäinen = summa
    let toinen = lisättäväArvo

    if (lisättäväArvo === "") {
      toinen = summa
      muutaLisäarvoa(toinen)
    }

    let uusiSumma = eval(ensimmäinen + operaattori + toinen)

    if (uusiSumma === 0 || isNaN(uusiSumma)) {
      uusiSumma = "0"
    }

    //uusiSumma sisältää joskus esim. 25.000000004 kun lisätään 24.5 + 0.5, 
    //mahtaako olla evalin pahuuksia. Voi väliaikaisesti ratkaista math.roundilla:
    //Math.round(uusiSumma, 5)    

    setSumma(uusiSumma.toString())
  }

  //Valitaan näytäänkö summa vai mitä summaan ollaan lisäämässä
  const haeNumeronäytönLuku = () => {

    if (lisäarvoaKäsitellään && lisättäväArvo !== "") {
      return lisättäväArvo
    }

    return summa
  }

  const yhtäkuinPainettu = () => {
    setLisäarvoaKäsitellään(false)
    laske()
  }

  const lisääMuistiin = () => {
    if (lisäarvoaKäsitellään && lisättäväArvo !== "") {

      if (muistiArvo === undefined) {
        muistiArvo = lisättäväArvo
      }
      else {
        muistiArvo = parseFloat(muistiArvo) + parseFloat(lisättäväArvo)
        muistiArvo = muistiArvo.toString()
      }
    }
    else {

      if (muistiArvo === undefined) {
        muistiArvo = summa
      }
      else {
        muistiArvo = parseFloat(muistiArvo) + parseFloat(summa)
        muistiArvo = muistiArvo.toString()
      }

    }
  }

  const poistaMuistista = () => {
    if (lisäarvoaKäsitellään && lisättäväArvo !== "") {

      if (muistiArvo === undefined) {
        muistiArvo = -lisättäväArvo
      }
      else {
        muistiArvo = parseFloat(muistiArvo) - parseFloat(lisättäväArvo)
        muistiArvo = muistiArvo.toString()
      }
    }
    else {

      if (muistiArvo === undefined) {
        muistiArvo = -summa
      }
      else {
        muistiArvo = parseFloat(muistiArvo) - parseFloat(summa)
        muistiArvo = muistiArvo.toString()
      }

    }
  }

  const tallennaArvoMuistiin = () => {
    if (lisäarvoaKäsitellään && lisättäväArvo !== "") {
      muistiArvo = lisättäväArvo
    }
    else {
      muistiArvo = summa
    }

  }

  const haeArvoMuistista = () => {

    if(muistiArvo === undefined)
    {
      return
    }

    //BUGI?
    //Jos arvon hakee muistista operaation jälkeen ja tähän numeroon lisää numeroita niin se jatkaa merkkijonoa eikä aloita sitä alusta
    if (lisäarvoaKäsitellään) {
      setLisäarvo(muistiArvo)
    }
    else {
      setSummaaKäsitellään(false)
      setSumma(muistiArvo)
    }
  }

  const tyhjennäMuisti = () => muistiArvo = undefined




  return (
    <div style={mainContainerStyle}>
      <h1>Nelilaskin</h1>
      <div style={laskinContainerStyle}>

        <div style={numerokenttäStyle}>
          <b style={{ fontSize: 24 }}>{haeNumeronäytönLuku()}</b>
        </div>

        <Grid>
          <Grid container direction="row" justify="flex-end">

            <GridButton backgroundColor="#dfe1e5" onClick={tallennaArvoMuistiin} symbol={"MS"} />
            <GridButton backgroundColor="#dfe1e5" onClick={tyhjennäMuisti} symbol={"MC"} />
          </Grid>
          <Grid container direction="row">

            <GridButton backgroundColor="#dfe1e5" onClick={haeArvoMuistista} symbol={"MR"} />
            <GridButton backgroundColor="#dfe1e5" onClick={lisääMuistiin} symbol={"M+"} />
            <GridButton backgroundColor="#dfe1e5" onClick={poistaMuistista} symbol={"M-"} />
            <GridButton backgroundColor="#dfe1e5" onClick={nollausPainettu} symbol={"C"} />
          </Grid>
          <Grid container direction="row">
            <GridButton onClick={numeroPainettu} value="7" symbol={7} />
            <GridButton onClick={numeroPainettu} value="8" symbol={8} />
            <GridButton onClick={numeroPainettu} value="9" symbol={9} />
            <GridButton onClick={operaattoriPainettu} backgroundColor="#dfe1e5" value="/" symbol={"÷"} />
          </Grid>
          <Grid container direction="row">
            <GridButton onClick={numeroPainettu} value="4" symbol={4} />
            <GridButton onClick={numeroPainettu} value="5" symbol={5} />
            <GridButton onClick={numeroPainettu} value="6" symbol={6} />
            <GridButton onClick={operaattoriPainettu} backgroundColor="#dfe1e5" value="*" symbol={"X"} />

          </Grid>
          <Grid container direction="row">
            <GridButton onClick={numeroPainettu} value="1" symbol={1} />
            <GridButton onClick={numeroPainettu} value="2" symbol={2} />
            <GridButton onClick={numeroPainettu} value="3" symbol={3} />
            <GridButton onClick={operaattoriPainettu} backgroundColor="#dfe1e5" value="-" symbol={"-"} />


          </Grid>
          <Grid container direction="row">
            <GridButton onClick={numeroPainettu} value="0" symbol={0} />
            <GridButton onClick={numeroPainettu} value="." symbol={"."} />
            <GridButton onClick={yhtäkuinPainettu} backgroundColor="#4286f4" symbol={"="} />
            <GridButton onClick={operaattoriPainettu} backgroundColor="#dfe1e5" value="+" symbol={"+"} />
          </Grid>
        </Grid>

      </div>
    </div >
  );
}

export default App;
