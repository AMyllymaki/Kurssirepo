
import { UserContext } from '../../App.js'
import { useContext } from 'react';

import KysymysMuokattava from './KysymysMuokattava'
import logo from '../../images/selmaSpin.gif'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import { uusiKysymys } from '../kysymysObjekti'
import { uusiTentti } from '../tenttiObjekti'

function VastausListaAdmin() {

    const { state, dispatch } = useContext(UserContext)

    const valitseTentti = (tentti) => {

        dispatch({ type: "PiilotaVastaukset" })
        dispatch({ type: "MuutaValittuTentti", payload: tentti.id })
    }

    //Jos tenttiID ja kysymysID -> Lisätään vastausvaihtoehto
    //Jos tenttiID -> lisätään kysymys
    //muuten -> lisätään tentti
    const lisääKomponentti = (tenttiID = undefined, kysymysID = undefined) => {

        let tmpTentit = JSON.parse(JSON.stringify(state.tentit))

        if (tenttiID === undefined) {
            tmpTentit.push((uusiTentti()))
            dispatch({ type: "MuutaTenttejä", payload: tmpTentit })
            return
        }


        let tenttiJohonLisätään = haeIDllä(tenttiID, tmpTentit)
        let kysymysJohonLisätään = haeIDllä(kysymysID, tenttiJohonLisätään.kysymykset)

        if (tenttiID !== undefined && kysymysID !== undefined) {

            kysymysJohonLisätään.vastausVaihtoehdot.push("")
            kysymysJohonLisätään.oikeatVastaukset.push(false)
        }
        else if (tenttiID !== undefined) {

            tenttiJohonLisätään.kysymykset.push(uusiKysymys())
        }

        dispatch({ type: "MuutaTenttejä", payload: tmpTentit })
    }

    //Jos tenttiID ja kysymysID ja i -> Muuta vastausvaihtoehtoa
    //Jos tenttiID ja kysymysID -> Muuta kysymyskuvausta
    //Jos tenttiID -> Muuta tenttinimeä
    const muutaKomponenttia = (uusiArvo, tenttiID, kysymysID = undefined, i = undefined, oikeaVastausMuutos = false) => {

        let tmpTentit = JSON.parse(JSON.stringify(state.tentit))

        let muutettuTentti = haeIDllä(tenttiID, tmpTentit)
        let muutettuKysymys = haeIDllä(kysymysID, muutettuTentti.kysymykset)

        if (oikeaVastausMuutos) {

            muutettuKysymys.oikeatVastaukset[i] = uusiArvo
        }
        else if (kysymysID !== undefined && i !== undefined) {

            muutettuKysymys.vastausVaihtoehdot[i] = uusiArvo
        }
        else if (kysymysID !== undefined) {

            muutettuKysymys.kuvaus = uusiArvo
        }
        else {
            muutettuTentti.nimi = uusiArvo

        }

        dispatch({ type: "MuutaTenttejä", payload: tmpTentit })
    }

    //Jos tenttiID ja kysymysID ja i -> Poista vastaus
    //Jos tenttiID ja kysymysID -> Poista kysymys
    //Jos tenttiID -> Poista tentti
    const poistaKomponentti = (tenttiID, kysymysID = undefined, i = undefined) => {

        let tmpTentit = JSON.parse(JSON.stringify(state.tentit))

        let PoistettavanTentti = haeIDllä(tenttiID, tmpTentit)
        let PoistettavanKysymys = haeIDllä(kysymysID, PoistettavanTentti.kysymykset)

        if (kysymysID !== undefined && i !== undefined) {

            PoistettavanKysymys.vastausVaihtoehdot.splice(i, 1)
            PoistettavanKysymys.oikeatVastaukset.splice(i, 1)

        }
        else if (kysymysID !== undefined) {

            PoistettavanTentti.kysymykset = PoistettavanTentti.kysymykset.filter(kysymys => kysymys.id !== kysymysID)
        }
        else {
            tmpTentit = tmpTentit.filter(tentti => tentti.id !== tenttiID)
        }

        console.log(tmpTentit)

        dispatch({ type: "MuutaTenttejä", payload: tmpTentit })
    }


    const haeIDllä = (id, taulukko) => {

        if (id === undefined) {
            return undefined
        }

        return taulukko.find(alkio => alkio.id === id)
    }

    const checkValittuTentti = (valittuTentti) => {

        if (valittuTentti === undefined) {
            return undefined
        }

        return valittuTentti.id
    }


    const muutaTenttiä = (e, tentti) => {

        muutaKomponenttia(e.target.value, tentti.id)
    }

    let valittuTentti = haeIDllä(state.valittuTenttiIndex, state.tentit)

    return (<div style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
            {state.tentit.map((tentti, i) =>

                <div key={i} style={{ display: 'flex', flexDirection: 'row' }} >
                    <div onClick={() => valitseTentti(tentti)}>
                        <TextField

                            color={tentti.id === checkValittuTentti(state.valittuTenttiIndex) ? "primary" : "secondary" }
                            fullWidth
                            label={tentti.nimi}
                            variant="outlined"
                            onChange={(e) => muutaTenttiä(e, tentti)} />
                    </div>
                    <IconButton onClick={() => poistaKomponentti(tentti.id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}

            <IconButton onClick={() => lisääKomponentti()} >
                <AddCircleRoundedIcon />
            </IconButton>

        </div>

        {
            state.loading ?
                <div style={{ width: '100%' }}>
                    <img src={logo} alt="Loading..." />
                </div>
                :
                valittuTentti !== undefined && <div style={{ width: '100%' }}>
                    {valittuTentti.kysymykset.map(kysymys =>
                        <KysymysMuokattava
                            key={kysymys.id}
                            tenttiID={valittuTentti.id}
                            kysymysID={kysymys.id}
                            handleInputChange={muutaKomponenttia}
                            handleDelete={poistaKomponentti}
                            handleAdding={lisääKomponentti}
                            kysymys={kysymys} />
                    )}

                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                        <IconButton onClick={() => lisääKomponentti(valittuTentti.id)} >
                            <AddCircleRoundedIcon />
                        </IconButton>
                    </div>
                </div>
        }
    </div>
    )
}

export default VastausListaAdmin