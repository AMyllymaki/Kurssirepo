import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

//This is from material-ui documentation

function KysymysMuokattava(props) {


    const { kuvaus, vastausVaihtoehdot, oikeatVastaukset } = props.kysymys

    const checkboxClicked = (e, i) =>
    {
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

    const handleLisäys = () =>
    {
        props.handleAdding(props.tenttiID, props.kysymysID)
    }


    return (

        <Paper style={{ width: '100%', padding: 15 }}>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                <div style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label={kuvaus}
                        variant="outlined"
                        onChange={(e) => muutaKysymyksenKuvaus(e)} />

                    <IconButton onClick={() => PoistaKysymys()}>
                        <DeleteIcon />
                    </IconButton>

                    {vastausVaihtoehdot.map((vastausVaihtoehto, i) =>

                        <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Checkbox
                                checked={oikeatVastaukset[i]}
                                onChange={(e) => checkboxClicked(e,i)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <TextField
                                fullWidth
                                label={vastausVaihtoehto}
                                variant="outlined"
                                onChange={(e) => muutaVastauksenKuvaus(e, i)} />

                            <IconButton onClick={() => PoistaVastaus(i)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>)}

                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton   onClick={() => handleLisäys()} >
                            <AddCircleRoundedIcon/>
                        </IconButton>
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default KysymysMuokattava