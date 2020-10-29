import { useState } from "react"

const mainContainerStyle =
{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50
}

const tableContainerStyle =
{
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 400,
    height: 50
}

function TaulukkoJärjestelijä() {

    const objektiLista =
        [
            { "ma": 44 },
            { "pe": 100 },
            { "ke": 21 },
            { "ti": 66 },
            { "la": 22 },
        ]

    const objekti =
    {
        "ma": 44,
        "pe": 100,
        "ke": 21,
        "ti": 66,
        "la": 22,
    }


    const [intTaulukko, setIntTaulukko] = useState([1, 4, 100, 2, 5, 4])
    const [stringTaulukko, setStringTaulukko] = useState(["1", "4", "100", "2", "5", "4"])
    const [objektiTaulukko, setObjektiTaulukko] = useState(objektiLista)

    const järjestäIntTaulukko = () => {
        let tmptaulukko = [...intTaulukko]

        tmptaulukko.sort((a, b) => a - b)

        setIntTaulukko(tmptaulukko)
    }

    const järjestäStringTaulukko = () => {
        let tmptaulukko = [...stringTaulukko]

        tmptaulukko.sort()

        setStringTaulukko(tmptaulukko)
    }

    const järjestäObjektiTaulukkoValuenMukaan = () => {
        let tmptaulukko = [...objektiTaulukko]

        tmptaulukko.sort((a, b) => Object.values(a) - Object.values(b))

        setObjektiTaulukko(tmptaulukko)
    }

    const järjestäObjektiTaulukkoAvaimenMukaan = () => {
        let tmptaulukko = [...objektiTaulukko]

        tmptaulukko.sort((a, b) => annaNumeroarvoPäivälle(Object.keys(a)) - annaNumeroarvoPäivälle(Object.keys(b)))

        setObjektiTaulukko(tmptaulukko)
    }

    const annaNumeroarvoPäivälle = (päivä) => {

        switch (päivä[0]) {
            case "ma":
                return 1
            case "ti":
                return 2
            case "ke":
                return 3
            case "to":
                return 4
            case "pe":
                return 5
            case "la":
                return 6
            case "su":
                return 7
            default:
                return 0
        }
    }

    const palautaObjektitaulukko = () =>
    {
        setObjektiTaulukko(objektiLista)
    }

    //Laittaa objektitaulukkoon pelkästään objektit joiden value on parillinen
    const parillistaObjektitaulukko = () => {
        let tmptaulukko = objektiTaulukko.filter(object => Object.values(object) % 2 === 0)
        setObjektiTaulukko(tmptaulukko)
    }

    //Laittaa objektitaulukkoon pelkästään objektit joiden avaimessa on toinen kirjain "e"
    const objektitaulukonToinenKirjainE = () => {
        let tmptaulukko = objektiTaulukko.filter(object => (Object.keys(object)[0]).charAt(1) === "e")
        setObjektiTaulukko(tmptaulukko)
    }

    const objektistaListaksi = () =>
    {
        console.log(objekti)

        let objektinAvaimet = Object.keys(objekti)
        let objektinValuet = Object.values(objekti)
        let objektistaLista = objektinAvaimet.map((avain, i) => ({[avain]: objektinValuet[i]}))

        console.log(objektistaLista)
    }

   

    //2.8 Ilman parametreja sort muuttaa taulukon arvot stringeiksi ja asettaa ne järjestykseen UTF-16 merkkien numeroinnin mukaan.
    //Jos käytetään comparea, sort ottaa kaksi parametria, joita se käyttää compare funktion kanssa vertailemaan sortattavan taulukon arvoja
    //Jos comparen tulos on positiivinen, comparessa käytetty b laitetaan uudessa taulukossa matalampaan indeksiin kuin a
    //Jos comparent tulos on negatiivinen, comparessa käytetty a laitetaan uudessa taulukossa matalampaan indeksiin kuin b
    //jos comparen tulos on 0, a ja b indeksi ei muutu toistensa suhteen

    return (
        <div style={mainContainerStyle}>
            <h1>Taulukko järjestelijä</h1>

            <h4>Int Taulukko</h4>
            <div style={tableContainerStyle}>

                {intTaulukko.map((alkio, i) =>
                    <h5 key={i}>{alkio}</h5>
                )}
            </div>
            <h4>String Taulukko</h4>
            <div style={tableContainerStyle}>

                {stringTaulukko.map((alkio, i) =>
                    <h5 key={i}>{alkio}</h5>
                )}
            </div>
            <h4>Objekti Taulukko</h4>
            <div style={tableContainerStyle}>

                {objektiTaulukko.map((alkio, i) =>
                    <div key={i}>
                        <h5>{Object.keys(alkio)}</h5>
                        <h5>{Object.values(alkio)}</h5>
                    </div>
                )}
            </div>
            <div style={{ margin: 50, display: 'flex', flexDirection:'column', justifyContent:'space-between', height: 200 }}>
                <button onClick={järjestäIntTaulukko}>Järjestä Int taulukko (2.6)</button>
                <button onClick={järjestäStringTaulukko}>Järjestä String taulukko (2.7)</button>
                <button onClick={järjestäObjektiTaulukkoValuenMukaan}>Järjestä Objekti taulukko valuen mukaan (2.9)</button>
                <button onClick={järjestäObjektiTaulukkoAvaimenMukaan}>Järjestä Objekti taulukko avaimen mukaan (2.10)</button>
                <button onClick={palautaObjektitaulukko}>Palauta objektitaulukko</button>
                <button onClick={parillistaObjektitaulukko}>Objektitaulukko parillista (2.11)</button>
                <button onClick={objektitaulukonToinenKirjainE}>Objectitaulukko toinen kirjain E (2.12)</button>
                <button onClick={objektistaListaksi}>Objektista Lista - console.log:ssa (2.13)</button>
            </div>
        </div>
    );
}

export default TaulukkoJärjestelijä;