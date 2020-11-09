const kysymysMatikka1 =
{
  id: 1,
  kuvaus: "Paljonko on 9+10?",
  vastausVaihtoehdot: [
    "21",
    "19",
    "20",
    "15"],
  oikeatVastaukset: [false, true, false, false]
}

const kysymysMatikka2 =
{
  id: 2,
  kuvaus: "Paljonko on 5*10?",
  vastausVaihtoehdot: [
    "50",
    "100/2",
    "20+20",
    "0"],
  oikeatVastaukset: [true, true, false, false]
}

const kysymysMatikka3 =
{
  id: 3,
  kuvaus: "Mitkä näistä ovat alkulukuja?",
  vastausVaihtoehdot: [
    "1",
    "3",
    "10",
    "14"],
  oikeatVastaukset: [false, true, false, false]
}

const kysymysMatikka4 =
{
  id: 4,
  kuvaus: "Paljonko on 2+2*4?",
  vastausVaihtoehdot: [
    "10",
    "16",
    "8",
    "4"],
  oikeatVastaukset: [true, false, false, false]
}



const kysymysKemia1 =
{
  id: 1,
  kuvaus: "Montako atomia on vesimolekyylissä?",
  vastausVaihtoehdot: [
    "2",
    "3",
    "17",
    "1801528"],
  oikeatVastaukset: [false, true, false, false]
}

const kysymysKemia2 =
{
  id: 2,
  kuvaus: "Mikä olomuodon muutos härmistyminen on?",
  vastausVaihtoehdot: [
    "Kiinteästä nesteeksi",
    "Nesteestä kaasuksi",
    "Kaasusta suoraan kiinteäksi",
    "Kiinteästä suoraan kaasuksi"],
  oikeatVastaukset: [false, false, true, false]
}

const kysymysKemia3 =
{
  id: 3,
  kuvaus: "Minkä kahden alkuaineen seosta kutsutaan pronssiksi?",
  vastausVaihtoehdot: [
    "Kupari",
    "Rauta",
    "Sinkki",
    "Tina"],
  oikeatVastaukset: [true, false, false, true]
}

const kysymysKemia4 =
{
  id: 4,
  kuvaus: "Onko kuu tehty juustosta?",
  vastausVaihtoehdot: [
    "Kyllä",
    "Ei",
    "Riippuu kuusta",
  ],
  oikeatVastaukset: [false, false, true]
}

const tentti1 =
{
  id: 0,
  nimi: "Kemia perusteet",
  kysymykset: [kysymysKemia1, kysymysKemia2, kysymysKemia3, kysymysKemia4]
}

const tentti2 =
{
  id: 1,
  nimi: "Matikka perusteet",
  kysymykset: [kysymysMatikka1, kysymysMatikka2, kysymysMatikka3, kysymysMatikka4],
}

const AlkuperäisetTentit = [tentti1, tentti2]

export default AlkuperäisetTentit