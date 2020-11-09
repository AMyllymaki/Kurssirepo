import { useEffect, useReducer, createContext } from "react"
import Button from '@material-ui/core/Button';
import AlkuperäisetTentit from './components/AlkuperäisetTentit'

import VastausLista from './components/VastausLista'
import VastausListaAdmin from './components/Admin/VastausListaAdmin'


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


const luoVastaukset = (tentit, forceFromState = false) => {

  let storedData = window.localStorage.getItem('vastaukset')


  if (storedData !== null && storedData !== undefined && JSON.parse(storedData) !== null && !forceFromState) {

    return JSON.parse(storedData)
  }
  else {


    let vastaukset = []

    //tentti consia käytetään staten luomisessa, joten ei käytetä vielä state.tentit
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



const luoTentit = () => {

  let storedData = window.localStorage.getItem('tentit')


  if (storedData !== null && storedData !== undefined && JSON.parse(storedData) !== null) {

    return JSON.parse(storedData)
  }

  return AlkuperäisetTentit
}



const nollaaVastaukset = () => {
  window.localStorage.removeItem('vastaukset')
}


const initialTentit = luoTentit()


const initialState =
{
  näytäVastaukset: false,
  valittuTenttiIndex: undefined,
  vastaukset: luoVastaukset(initialTentit),
  loading: false,
  tentit: initialTentit,
  admin: true,
}

const reducer = (state = initialState, action) => {

  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {

    case "MuutaTenttejä":
      newState.tentit = action.payload

      //Tätä ei ehkä saa tehdä tässä. Jatkossa pitäisi nollata vain jonkun tietyn kysymyksen tiedot
      nollaaVastaukset()

      return newState
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
      newState.valittuTenttiIndex = action.payload
      return newState
    case "MuutaVastaukset":
      newState.vastaukset = action.payload
      return newState
    case "LuoTentit":
      newState.tentit = action.payload
      return newState
    case "VaihdaKäyttäjä":
      newState.admin = action.payload
      return newState
    default:
      return newState
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)



  useEffect(() => {

    window.localStorage.setItem('vastaukset', JSON.stringify(state.vastaukset))



  }, [state.vastaukset]);

  useEffect(() => {


    window.localStorage.setItem('tentit', JSON.stringify(state.tentit))

  }, [state.tentit]);


  const nollaaKaikki = () => {
    window.localStorage.clear()
    let initialTentit = luoTentit()
    let vastaukset = luoVastaukset(initialTentit)

    dispatch({ type: "LuoTentit", payload: initialTentit })
    dispatch({ type: "MuutaVastaukset", payload: vastaukset })
  }

  const vaihdaKäyttäjää = () => {
    let vastaukset = luoVastaukset(state.tentit, true)
    dispatch({ type: "MuutaVastaukset", payload: vastaukset })
    dispatch({ type: "VaihdaKäyttäjä", payload: !state.admin })
  }

  return (

    <UserContext.Provider value={{ state, dispatch }}>
      <div style={{ backgroundColor: '#3F51B5' }}>
        <div style={{ height: 64, width: '100%', display: 'flex', alignItems: 'center', paddingLeft: 24 }}>
          <Button onClick={nollaaVastaukset} style={{ color: 'white' }}>Tentit</Button>
          <Button onClick={nollaaVastaukset} style={{ color: 'white' }}>Nollaa-vastaukset</Button>
          <Button onClick={vaihdaKäyttäjää} style={{ color: 'white' }}>{state.admin ? "Vaihda Normikäyttäjäksi" : "Vaihda Adminiksi"}</Button>
          
        </div>
      </div>

      <div style={mainContainerStyle}>
        <div style={tableContainerStyle}>
          {state.admin ?
            <VastausListaAdmin />
            :
            <VastausLista />
          }

        </div>
      </div>
    </UserContext.Provider>

  );
}

export { App, UserContext }

