import { useState, useEffect, useReducer, createContext } from "react"
import Button from '@material-ui/core/Button';
import Kysymys from './components/Kysymys'
import logo from './images/selmaSpin.gif'
import Fade from 'react-reveal/Fade';

const mainContainerStyle =
{
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 20,
  marginBottom: 50,

}

const tableContainerStyle =
{
  flexDirection: 'column',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: 1184,
}

const UserContext = createContext(null)


const luoVastaukset = () => {

  let storedData = window.localStorage.getItem('data')


  if (storedData !== null && storedData !== undefined && JSON.parse(storedData) !== null) {

    return JSON.parse(storedData)
  }
  else {


    let vastaukset = []

    tentit.forEach(tentti => {

      let tenttiID = tentti.id

      tentti.kysymykset.forEach(kysymys => {

        let vastaus =
        {
          tenttiID: tenttiID,
          kysymysID: undefined,
          vastaukset: [],
        }

        vastaus.kysymysID = kysymys.id
        vastaus.vastaukset = new Array(kysymys.vastausVaihtoehdot.length).fill(false)

        vastaukset.push(vastaus)
      })
    });

    return vastaukset
  }
}

const kysymysMatikka1 =
{
  id: 1,
  kuvaus: "Paljonko on 9+10?",
  vastausVaihtoehdot: [
    "21",
    "19",
    "20",
    "15"],
  oikeatVastaukset: [false, true, false, false]
}

const kysymysMatikka2 =
{
  id: 2,
  kuvaus: "Paljonko on 5*10?",
  vastausVaihtoehdot: [
    "50",
    "100/2",
    "20+20",
    "0"],
  oikeatVastaukset: [true, true, false, false]
}

const kysymysMatikka3 =
{
  id: 3,
  kuvaus: "Mitkä näistä ovat alkulukuja?",
  vastausVaihtoehdot: [
    "1",
    "3",
    "10",
    "14"],
  oikeatVastaukset: [false, true, false, false]
}

const kysymysMatikka4 =
{
  id: 4,
  kuvaus: "Paljonko on 2+2*4?",
  vastausVaihtoehdot: [
    "10",
    "16",
    "8",
    "4"],
  oikeatVastaukset: [true, false, false, false]
}



const kysymysKemia1 =
{
  id: 1,
  kuvaus: "Montako atomia on vesimolekyylissä?",
  vastausVaihtoehdot: [
    "2",
    "3",
    "17",
    "1801528"],
  oikeatVastaukset: [false, true, false, false]
}

const kysymysKemia2 =
{
  id: 2,
  kuvaus: "Mikä olomuodon muutos härmistyminen on?",
  vastausVaihtoehdot: [
    "Kiinteästä nesteeksi",
    "Nesteestä kaasuksi",
    "Kaasusta suoraan kiinteäksi",
    "Kiinteästä suoraan kaasuksi"],
  oikeatVastaukset: [false, false, true, false]
}

const kysymysKemia3 =
{
  id: 3,
  kuvaus: "Minkä kahden alkuaineen seosta kutsutaan pronssiksi?",
  vastausVaihtoehdot: [
    "Kupari",
    "Rauta",
    "Sinkki",
    "Tina"],
  oikeatVastaukset: [true, false, false, true]
}

const kysymysKemia4 =
{
  id: 4,
  kuvaus: "Onko kuu tehty juustosta?",
  vastausVaihtoehdot: [
    "Kyllä",
    "Ei",
    "Riippuu kuusta",
  ],
  oikeatVastaukset: [false, false, true]
}

const tentti1 =
{
  id: 1,
  nimi: "Kemia perusteet",
  kysymykset: [kysymysKemia1, kysymysKemia2, kysymysKemia3, kysymysKemia4]
}

const tentti2 =
{
  id: 2,
  nimi: "Matikka perusteet",
  kysymykset: [kysymysMatikka1, kysymysMatikka2, kysymysMatikka3, kysymysMatikka4],
}

const tentit = [tentti1, tentti2]




const nollaaVastaukset = () => {
  window.localStorage.clear()
}

const rand = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const initialState =
{
  näytäVastaukset: false,
  valittuTentti: undefined,
  vastaukset: luoVastaukset(),
  loading: false,
}

const reducer = (state = initialState, action) => {

  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "NäytäVastaukset":
      newState.näytäVastaukset = true
      return newState
    case "PiilotaVastaukset":
      newState.näytäVastaukset = false
      return newState
    case "Lataa":
      newState.loading = true
      return newState
    case "LopetaLataus":
      newState.loading = false
      return newState
    case "MuutaValittuTentti":
      newState.valittuTentti = action.payload
      return newState
    case "MuutaVastaukset":
      newState.vastaukset = action.payload
      return newState

  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  let lataus = undefined

  useEffect(() => {

    window.localStorage.setItem('data', JSON.stringify(state.vastaukset))

  }, [state.vastaukset]);

  const valitseVastaus = (tenttiID, kysymysID, i) => {

    let tmpVastaukset = [...state.vastaukset]
    let vastaus = tmpVastaukset.find(vastaus => vastaus.tenttiID === tenttiID && vastaus.kysymysID === kysymysID)

    vastaus.vastaukset[i] = !vastaus.vastaukset[i]

    dispatch({ type: "MuutaVastaukset", payload: tmpVastaukset })
  }

  const checkValittuTentti = () => {

    if (state.valittuTentti === undefined) {
      return undefined
    }

    return state.valittuTentti.id
  }

  const haeVastaus = (tenttiID, kysymysID) => {

    let palautettavaVastaus = state.vastaukset.find(vastaus => vastaus.tenttiID === tenttiID && vastaus.kysymysID === kysymysID)

    return palautettavaVastaus
  }

  const muutaNäytävastaukset = () => {

    if (state.näytäVastaukset) {

      dispatch({ type: "PiilotaVastaukset" })
    }
    else {
      dispatch({ type: "NäytäVastaukset" })
    }

  }

  const valitseTentti = (tentti) => {
    lataa()
    dispatch({ type: "PiilotaVastaukset" })
    dispatch({ type: "MuutaValittuTentti", payload: tentti })
  }

  const lataa = () => {
    if (lataus !== undefined) {
      clearTimeout(lataus)
    }

    dispatch({ type: "Lataa" })

    lataus = setTimeout(() => {

      dispatch({ type: "LopetaLataus" })

    }, 1000 * rand(5));
  }



  return (

      <UserContext.Provider value={{ state, dispatch }}>
        <div style={{ backgroundColor: '#3F51B5' }}>
          <div style={{ height: 64, width: '100%', display: 'flex', alignItems: 'center', paddingLeft: 24 }}>
            <Button onClick={nollaaVastaukset} style={{ color: 'white' }}>Tentit</Button>
            <Button onClick={nollaaVastaukset} style={{ color: 'white' }}>Tietoa Sovelluksesta</Button>
          </div>
        </div>

        <div style={mainContainerStyle}>
          <div style={tableContainerStyle}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              {tentit.map((tentti, i) =>

                <Fade right>
                  <Button key={i} color="primary" variant={tentti.id === checkValittuTentti() ? "outlined" : "text"} onClick={() => valitseTentti(tentti)} >{tentti.nimi}</Button>
                </Fade>
              )}
            </div>


            {state.loading ?
              <div style={{ width: '100%' }}>
                <img src={logo} alt="Loading..." />
              </div>
              :
              state.valittuTentti !== undefined && <div style={{ width: '100%' }}>
                {state.valittuTentti.kysymykset.map(kysymys =>
                  <Kysymys key={kysymys.id} kysymysVastaukset={haeVastaus(state.valittuTentti.id, kysymys.id)} handleCheckboxChange={valitseVastaus} kysymys={kysymys} />
                )}

                <Button color="primary" variant="contained" onClick={muutaNäytävastaukset}>
                  {state.näytäVastaukset ?
                    "Piilota Vastaukset"
                    :
                    "Näytä vastaukset"
                  }
                </Button>

              </div>
            }

          </div>
        </div>
      </UserContext.Provider>
 
  );
}

export { App, UserContext }

