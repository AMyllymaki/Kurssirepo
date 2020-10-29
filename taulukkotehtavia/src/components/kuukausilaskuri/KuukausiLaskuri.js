import { useState } from "react"
import Kuukausi from "./Kuukausi"

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

function KuukausiLaskuri() {

    const kuukaudet = [
        { id: 0, kuukaudenNimi: "tammikuu" },
        { id: 1, kuukaudenNimi: "helmikuu" },
        { id: 2, kuukaudenNimi: "maaliskuu" },
        { id: 3, kuukaudenNimi: "huhtikuu" },
        { id: 4, kuukaudenNimi: "toukokuu" },
        { id: 5, kuukaudenNimi: "kesäkuu" },
        { id: 6, kuukaudenNimi: "heinäkuu" },
        { id: 7, kuukaudenNimi: "elokuu" },
        { id: 8, kuukaudenNimi: "syyskuu" },
        { id: 9, kuukaudenNimi: "lokakuu" },
        { id: 10, kuukaudenNimi: "marraskuu" },
        { id: 11, kuukaudenNimi: "joulukuu" },

    ];

    const [kuukausiTaulukko, setKuukausiTaulukko] = useState(kuukaudet)
    const [yleisPalkka, setYleisPalkka] = useState("")
    const [vero, setVero] = useState("")

    const vaihdaPalkka = (e, id) => {
        let tmpKuukausiTaulukko = [...kuukausiTaulukko]

        let tmpKuukausi = tmpKuukausiTaulukko.find(kuukausi => kuukausi.id === id)

        tmpKuukausi.palkka = e.target.value

        setKuukausiTaulukko(tmpKuukausiTaulukko)
    }

    const korotaPalkkaa = (prosentti) => {

        let tmpKuukausiTaulukko = [...kuukausiTaulukko]
        let kertomismäärä = (1 + prosentti / 100)


        tmpKuukausiTaulukko.forEach(kuukausi => {

            if (kuukausi.palkka !== undefined && kuukausi.palkka !== "") {
                kuukausi.palkka = parseInt(kuukausi.palkka) * kertomismäärä
            }
        });

        setKuukausiTaulukko(tmpKuukausiTaulukko)
    }

    const muutaYleispalkkaa = (e) => {
        setYleisPalkka(e.target.value)
    }

    const asetaYleispalkka = () => {
        let tmpKuukausiTaulukko = [...kuukausiTaulukko]

        tmpKuukausiTaulukko.forEach(kuukausi => {
            kuukausi.palkka = yleisPalkka
        });

        setKuukausiTaulukko(tmpKuukausiTaulukko)
    }

    const muutaVeroa = (e) => {
        setVero(e.target.value)
    }

    const verota = () => {
        let tmpKuukausiTaulukko = [...kuukausiTaulukko]
        let kertomismäärä = 1 - vero / 100


        tmpKuukausiTaulukko.forEach(kuukausi => {

            if (kuukausi.palkka !== undefined && kuukausi.palkka !== "") {
                kuukausi.palkka = parseInt(kuukausi.palkka) * kertomismäärä
            }
        });

        setKuukausiTaulukko(tmpKuukausiTaulukko)
    }

    const getVuositulot = () => 
    {

        let kuukaudet = kuukausiTaulukko.filter(kuukausi => kuukausi.palkka !== undefined && kuukausi.palkka !== "")
        let palkat = kuukaudet.map(kuukausi => parseFloat(kuukausi.palkka));
    
        if(palkat.length === 0)
        {
            return "Ei tiedossa"
        }

        let reducer = (acc, cur) => acc + cur

        return (palkat.reduce(reducer)).toFixed(2)
    }

    return (
        <div style={mainContainerStyle}>
            <h1>Palkkalaskuri</h1>
            <div style={tableContainerStyle}>

                {kuukausiTaulukko.map((kuukausi) =>

                    <div key={kuukausi.id}>

                        <Kuukausi kuukausi={kuukausi} vaihdaPalkka={vaihdaPalkka} />

                    </div>
                )}
            </div>
            <div style={{ margin: 20 }}>
                <input onChange={(e) => muutaYleispalkkaa(e)} value={yleisPalkka}></input>
                <button onClick={() => asetaYleispalkka()}>Aseta kuukausipalkka</button>
            </div>
            <button onClick={() => korotaPalkkaa(50)}>Korota Palkkaa 50%</button>
            <div style={{ margin: 20 }}>
           
                <input onChange={(e) => muutaVeroa(e)} value={vero}></input>
                {" Vero%"}
            </div>
            <button onClick={() => verota()}>Verota</button>
            <div>
                <h3>{"Vuositulot: " + getVuositulot()}</h3>
              
            </div>
        </div>
    );
}

export default KuukausiLaskuri;