import Day from './Day'
import { useState } from "react"
import LaskuKomponentti from './LaskuKomponentti'
import * as LaskuFunktiot from './LaskuFunktiot'

const mainContainerStyle =
{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 150
}

const tableContainerStyle =
{
  flexDirection: 'row',
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: 400,
  height: 150
}

function Päivälaskuri() {

  const päivät = [
    { id: 0, päiväNimi: "maanantai" },
    { id: 1, päiväNimi: "tiiistai" },
    { id: 2, päiväNimi: "keskiviikko" },
    { id: 3, päiväNimi: "torstai" },
    { id: 4, päiväNimi: "perjantai" },
    { id: 5, päiväNimi: "lauantai" },
    { id: 6, päiväNimi: "sunnuntai" },
  ];

  const [viikkoTaulukko, setViikkotaulukko] = useState(päivät)

  const vaihdaTunnit = (e, id) => {
    let tmpViikkoTaulukko = [...viikkoTaulukko]

    let tmpPäivä = tmpViikkoTaulukko.find(päivä => päivä.id === id)

    tmpPäivä.tunnit = e.target.value

    setViikkotaulukko(tmpViikkoTaulukko)
  }



  return (
    <div style={mainContainerStyle}>
      <h1>Työtunnit</h1>
      <div style={tableContainerStyle}>

        {viikkoTaulukko.map((päivä) =>

          <div key={päivä.id}>

            <Day päivä={päivä} vaihdaTunnit={vaihdaTunnit} />
          </div>
        )}
      </div>
      <h2>forEach</h2>
      <div style={{ flexDirection: 'row', display: 'flex', width: 400, justifyContent: 'space-evenly' }}>

        <LaskuKomponentti nimi={"keskiarvo"} arvo={LaskuFunktiot.laskeKeskiarvoFor(viikkoTaulukko)} viikkoTaulukko={viikkoTaulukko} />
        <LaskuKomponentti nimi={"Min"} arvo={LaskuFunktiot.laskeMinFor(viikkoTaulukko)} viikkoTaulukko={viikkoTaulukko} />
        <LaskuKomponentti nimi={"Max"} arvo={LaskuFunktiot.laskeMaxFor(viikkoTaulukko)} viikkoTaulukko={viikkoTaulukko} />

      </div >
      <h2>Reducer</h2>
      <div style={{ flexDirection: 'row', display: 'flex', width: 400, justifyContent: 'space-evenly' }}>

        <LaskuKomponentti nimi={"keskiarvo"} arvo={LaskuFunktiot.laskeKeskiarvoReducerilla(viikkoTaulukko)} viikkoTaulukko={viikkoTaulukko} />
        <LaskuKomponentti nimi={"Min"} arvo={LaskuFunktiot.laskeMinReducer(viikkoTaulukko)} viikkoTaulukko={viikkoTaulukko} />
        <LaskuKomponentti nimi={"Max"} arvo={LaskuFunktiot.laskeMaxReducer(viikkoTaulukko)} viikkoTaulukko={viikkoTaulukko} />
      </div>
    </div>
  );
}

export default Päivälaskuri;