import { useEffect, useReducer, createContext, useState } from "react"
import Button from '@material-ui/core/Button';
import AlkuperäisetTentit from './components/AlkuperäisetTentit'

import VastausLista from './components/VastausLista'
import VastausListaAdmin from './components/Admin/VastausListaAdmin'
import { createData, fetchData, patchData, fetchVastaukset, createVastaukset, patchVastaukset } from './components/AxiosFunctions'
import { haeTentit } from "./components/HttpRequests/tenttiRequests.js"

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

//Bugeja (tai jotain sinne päin)

//Vastaukset katoavat jos käydään admin puolella. 
//Tämä on koska jos admin puolella tehdään muutoksia niin vastaukset eivät ole välttämättä enää järkeviä



const UserContext = createContext(null)

const nollaaVastaukset = () => {
  window.localStorage.removeItem('vastaukset')
}

const initialState =
{
  näytäVastaukset: false,
  valittuTenttiIndex: undefined,
  vastaukset: undefined,
  loading: false,
  tentit: undefined,
  admin: false,
  näytäGraafi: false,
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
    case "NäytäGraafi":
      newState.näytäGraafi = true
      return newState
    case "PiilotaGraafi":
      newState.näytäGraafi = false
      return newState
    default:
      return newState
  }
}


function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {

    luoTentit().then((response) => {
      if (response !== undefined) {


        //luoVastaukset(response)
        dispatch({ type: "LuoTentit", payload: response })

      }
    })

  }, [])


  const luoTentit = async () => {

    let luodutTentit = await haeTentit().then((response) => {

      if (response.data !== undefined) {

        let tentit = response.data

        tentit.forEach(tentti => {

          tentti.kysymykset = []
        });

        return response.data
      }

    }).catch((exception) => {

      createData(AlkuperäisetTentit)
    })

    if (luodutTentit === undefined) {
      luodutTentit = AlkuperäisetTentit
    }

    return luodutTentit
  }




  const luoVastaukset = async (tenttis, forceFromState = false) => {

    if (tenttis === undefined) {
      return
    }

    if (!forceFromState) {

      let luodutVastaukset = await fetchVastaukset().then((response) => {



        if (response.data !== undefined) {

          return response.data
        }

      }).catch((exception) => {

        return undefined
      })

      if (luodutVastaukset !== undefined) {

        dispatch({ type: "MuutaVastaukset", payload: luodutVastaukset })
        return
      }
    }

    let vastaukset = []

    //tentti constia käytetään staten luomisessa, joten ei käytetä vielä state.tentit
    tenttis.forEach(tentti => {

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


    dispatch({ type: "MuutaVastaukset", payload: vastaukset })

    if (forceFromState) {

    }
    else {
      createVastaukset(vastaukset)
    }

  }


  const vaihdaKäyttäjää = () => {
    //  let vastaukset = luoVastaukset(state.tentit, true)
    dispatch({ type: "VaihdaKäyttäjä", payload: !state.admin })
  }

  const tentit = () => {

  }

  return (

    <UserContext.Provider value={{ state, dispatch }}>
      {state.tentit === undefined ?
        []
        :
        <div>
          <div style={{ backgroundColor: '#3F51B5' }}>
            <div style={{ height: 64, width: '100%', display: 'flex', alignItems: 'center', paddingLeft: 24 }}>
              <Button onClick={tentit} style={{ color: 'white' }}>Tentit</Button>
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
        </div>
      }

    </UserContext.Provider>

  );
}

export { App, UserContext }

