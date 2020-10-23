
import React from 'react';
import { Grid } from '@material-ui/core'

function Ruutu(props) {


    //<button style={{width: 100, height: 100, fontSize: 20, margin: 1}}
    //</button>

    const haeSymboli = () => {
        if (props.symbol === "X") {
            return (
                <svg width="100" height="100">

                    <line x1="25" y1="25" x2="75" y2="75" stroke="black" strokeWidth="15" strokeLinecap="round" />
                    <line x1="75" y1="25" x2="25" y2="75" stroke="black" strokeWidth="15" strokeLinecap="round" />
                    <line x1="25" y1="25" x2="75" y2="75" stroke="blue" strokeWidth="10" strokeLinecap="round" />
                    <line x1="75" y1="25" x2="25" y2="75" stroke="blue" strokeWidth="10" strokeLinecap="round" />
                </svg>
            )
        }
        else if (props.symbol === "O") {
            return (<svg width="100" height="100">

                <circle cx="50%" cy="50%" r="35.35" stroke="black" strokeWidth="4" fill="red" />
            </svg>)
        }

        return []
    }

    return (

        < Grid item xs={4} >
            <div onClick={(e) => props.onClick(props.value)} style={{ backgroundColor: "white", width: 100, height: 100, borderWidth: 1, border: '2px solid black' }}>

                {haeSymboli()}
            </div>
        </Grid >

    )
}

export default Ruutu