

function LaskuKomponentti(props) {
    return (


        <div>
            <h3>{props.nimi}</h3>
            <h3 style={{ textAlign: 'center' }}>{props.arvo}</h3>
        </div>
    )
}

export default LaskuKomponentti