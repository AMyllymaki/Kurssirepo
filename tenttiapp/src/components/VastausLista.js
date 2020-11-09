
import { UserContext } from '../App.js'
import { useContext } from 'react';
import rand from './Random'

import Kysymys from './Kysymys'
import logo from '../images/selmaSpin.gif'
import Button from '@material-ui/core/Button';

function VastausLista() {

    const { state, dispatch } = useContext(UserContext)

    let lataus = undefined


    const valitseTentti = (tentti) => {
        lataa()
        dispatch({ type: "PiilotaVastaukset" })
        dispatch({ type: "MuutaValittuTentti", payload: tentti.id })
    }

    const valitseVastaus = (tenttiID, kysymysID, i) => {

        let tmpVastaukset = [...state.vastaukset]
        let vastaus = tmpVastaukset.find(vastaus => vastaus.tenttiID === tenttiID && vastaus.kysymysID === kysymysID)

        vastaus.vastaukset[i] = !vastaus.vastaukset[i]

        dispatch({ type: "MuutaVastaukset", payload: tmpVastaukset })
    }


    const checkValittuTentti = (valittuTentti) => {

        if (valittuTentti === undefined) {
            return undefined
        }

        return valittuTentti.id
    }

    const lataa = () => {
        if (lataus !== undefined) {
            clearTimeout(lataus)
        }

        dispatch({ type: "Lataa" })

        lataus = setTimeout(() => {

            dispatch({ type: "LopetaLataus" })

        }, 1000 * rand(1));
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

    const haeIDllä = (id, taulukko) => {

        if (id === undefined) {
            return undefined
        }

        return taulukko.find(alkio => alkio.id === id)
    }

    let valittuTentti = haeIDllä(state.valittuTenttiIndex, state.tentit)

 
    return (<div style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%',flexWrap:'wrap' }}>
            {state.tentit.map((tentti, i) =>

                <Button key={i} color="primary" variant={tentti.id === checkValittuTentti(valittuTentti) ? "outlined" : "text"} onClick={() => valitseTentti(tentti)} >{tentti.nimi}</Button>
            )}
        </div>

        {
            state.loading ?
                <div style={{ width: '100%' }}>
                    <img src={logo} alt="Loading..." />
                </div>
                :
                valittuTentti !== undefined && <div style={{ width: '100%' }}>
                    {valittuTentti.kysymykset.map(kysymys =>
                        <Kysymys
                            key={kysymys.id}
                            kysymysVastaukset={haeVastaus(valittuTentti.id, kysymys.id)}
                            handleCheckboxChange={valitseVastaus}
                            kysymys={kysymys} />
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
    )
}

export default VastausLista