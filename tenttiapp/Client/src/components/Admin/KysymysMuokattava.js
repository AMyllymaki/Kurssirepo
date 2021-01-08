import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

//This is from material-ui documentation

function KysymysMuokattava(props) {


    const { kysymys, vastausVaihtoehdot, oikeatVastaukset } = props.kysymys

    const checkboxClicked = (e, i) => {
        props.handleInputChange(e.target.checked, props.tenttiID, props.kysymysID, i, true)
    }

    const muutaKysymyksenKuvaus = (e) => {
        props.handleInputChange(e.target.value, props.tenttiID, props.kysymysID)
    }

    const muutaVastauksenKuvaus = (e, i) => {
        props.handleInputChange(e.target.value, props.tenttiID, props.kysymysID, i)
    }

    const PoistaVastaus = (i) => {
        props.handleDelete(props.tenttiID, props.kysymysID, i)
    }

    const PoistaKysymys = () => {
        props.handleDelete(props.tenttiID, props.kysymysID)
    }

    const handleLisäys = () => {
        props.handleAdding(props.tenttiID, props.kysymysID)
    }

    //Testausta varten
    const haeKysymysKomponentinNimi = (kysymysNimi, i) => {

      
        if (kysymysNimi === "Kysymyksen kuvaus" || kysymysNimi === undefined) {
        
            return "tyhjä_kysymys"
        }

        let paluuarvo = "kysymys" + i

        return paluuarvo
    }

    //Testausta varten
    const haeVastausvaihtoehtoKomponentinNimi = (vastausVaihtoehtoNimi, i) => {

        if (vastausVaihtoehtoNimi === "") {

            return "tyhjä_vastausvaihtoehto"
        }

        let paluuarvo = "vastausvaihtoehto" + i

        return paluuarvo
    }

    return (

        <Paper style={{ width: '100%', padding: 15 }}>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                <div style={{ width: '100%' }}>
                    <TextField
                        name={haeKysymysKomponentinNimi(kysymys, props.kysymysnro)}
                        fullWidth
                        label={kysymys}
                        variant="outlined"
                        onChange={(e) => muutaKysymyksenKuvaus(e)} />

                    <IconButton onClick={() => PoistaKysymys()}>
                        <DeleteIcon />
                    </IconButton>

                    {vastausVaihtoehdot.map((vastausVaihtoehto, i) =>

                        <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Checkbox
                                checked={vastausVaihtoehto.oikea_vastaus}
                                onChange={(e) => checkboxClicked(e, vastausVaihtoehto.id)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <TextField
                                name={haeVastausvaihtoehtoKomponentinNimi(vastausVaihtoehto.vaihtoehto, i)}
                                fullWidth
                                label={vastausVaihtoehto.vaihtoehto}
                                variant="outlined"
                                onChange={(e) => muutaVastauksenKuvaus(e, vastausVaihtoehto.id)} />

                            <IconButton onClick={() => PoistaVastaus(vastausVaihtoehto.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>)}

                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton name={"LisääVastausvaihtoehto"} onClick={() => handleLisäys()} >
                            <AddCircleRoundedIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default KysymysMuokattava