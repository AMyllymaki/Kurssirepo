import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { UserContext } from '../App.js'
import { useContext } from 'react';
import logo from '../images/selmaStill.png'



//This is from material-ui documentation
const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}


function Kysymys(props) {


    const { kysymys, vastausVaihtoehdot, oikeatVastaukset } = props.kysymys
    //const vastaukset = props.kysymysVastaukset

    const { state } = useContext(UserContext)

    const handleChange = (i) => {
      //  props.handleCheckboxChange(vastaukset.tenttiID, vastaukset.kysymysID, i)
    }

    return (

        <Paper style={{ width: '100%', padding: 15 }}>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                {state.näytäVastaukset ?

                    <div >
                        {kysymys}
                        {vastausVaihtoehdot.map((vastausVaihtoehto, i) =>

                            <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <Checkbox
                                    //checked={vastaukset.vastaukset[i]}
                                    checked={false}
                                    color="primary"
                                    disableRipple={true}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}

                                />
                                <GreenCheckbox

                                    checked={vastausVaihtoehto.oikea_vastaus}
                                    color="primary"
                                    disableRipple={true}
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />

                                {vastausVaihtoehto.vaihtoehto}

                            </div>)}
                    </div>
                    :
                    <div style={{}}>
                        {kysymys}
                        {vastausVaihtoehdot.map((vastausVaihtoehto, i) =>

                            <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <Checkbox
                                    //checked={vastaukset.vastaukset[i]}
                                    checked={false}
                                    onChange={() => handleChange(i)}

                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                {vastausVaihtoehto.vaihtoehto}
                            </div>)}
                    </div>
                }



                <div style={{ padding: 50 }}>

                    {//arrayEquals(vastaukset.vastaukset, oikeatVastaukset) && state.näytäVastaukset &&
                       // <img width={50} height={50} src={logo} alt="Loading..." />
                    }

                </div>
            </div>
        </Paper>
    )
}

export default Kysymys