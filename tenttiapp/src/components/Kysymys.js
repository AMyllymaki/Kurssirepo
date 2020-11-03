
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


function Kysymys(props) {

    const { kuvaus, vastausVaihtoehdot, oikeatVastaukset } = props.kysymys
    const vastaukset = props.kysymysVastaukset

    const handleChange = (i) => {
        props.handleCheckboxChange(vastaukset.tenttiID, vastaukset.kysymysID, i)
    }

    return (
        <Paper style={{ width: '100%' }}>
            {props.näytäVastaukset ?

                <div style={{ padding: 10 }}>
                    {kuvaus}
                    {vastausVaihtoehdot.map((vastausVaihtoehto, i) =>

                        <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Checkbox
                                checked={vastaukset.vastaukset[i]}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}

                            />
                            <GreenCheckbox
                                checked={oikeatVastaukset[i]}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                            {vastausVaihtoehto}
                        </div>)}
                </div>
                :
                <div style={{ padding: 10 }}>
                    {kuvaus}
                    {vastausVaihtoehdot.map((vastausVaihtoehto, i) =>

                        <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Checkbox
                                checked={vastaukset.vastaukset[i]}
                                onChange={() => handleChange(i)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            {vastausVaihtoehto}
                        </div>)}
                </div>
            }

        </Paper>
    )
}

export default Kysymys