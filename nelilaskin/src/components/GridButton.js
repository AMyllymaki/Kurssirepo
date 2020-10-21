
import React from 'react';
import { Grid } from '@material-ui/core'

function GridButton(props) {

    return (

        < Grid item xs={3} >
            <button style={{width: 100, height: 50, marginBottom: 10,  fontSize: 20}}
             onClick={props.onClick} value={props.value} >{props.symbol}</button>
        </Grid >

    )
}

export default GridButton