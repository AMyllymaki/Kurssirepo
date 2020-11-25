const kysymysMatikka1 =
{
  id: 1,
  aihe: "Aritmetiikka",
  kuvaus: "Paljonko on 9+10?",
  vastausVaihtoehdot: [
    "21",
    "19",
    "20",
    "15"],
  oikeatVastaukset: [false, true, false, false]
}

const kysymysMatikka1a =
{
  id: 2,
  aihe: "Aritmetiikka",
  kuvaus: "Paljonko on 10*2?",
  vastausVaihtoehdot: [
    "2",
    "20",
    "10",
    "5"],
  oikeatVastaukset: [false, true, false, false]
}

const kysymysMatikka1b =
{
  id: 3,
  aihe: "Aritmetiikka",
  kuvaus: "Paljonko on 50/2?",
  vastausVaihtoehdot: [
    "2",
    "50",
    "52",
    "25"],
  oikeatVastaukset: [false, false, false, true]
}

const kysymysMatikka1c =
{
  id: 4,
  aihe: "Aritmetiikka",
  kuvaus: "Paljonko on 9-10?",
  vastausVaihtoehdot: [
    "1",
    "19",
    "-1",
    "7"],
  oikeatVastaukset: [false, false, true, false]
}

const kysymysMatikka1d =
{
  id: 5,
  aihe: "Aritmetiikka",
  kuvaus: "Paljonko on 22+28?",
  vastausVaihtoehdot: [
    "50",
    "5",
    "30",
    "2"],
  oikeatVastaukset: [true, false, false, false]
}

const kysymysMatikka2 =
{
  id: 6,
  aihe: "Todennäköisyys",
  kuvaus: "Kuinka todennäköistä on voittaa 2 kolikonheittoa putkeen",
  vastausVaihtoehdot: [
    "25%",
    "50%",
    "75%",
    "40%"],
  oikeatVastaukset: [true, false, false, false]
}



const kysymysMatikka2a =
{
  id: 7,
  aihe: "Todennäköisyys",
  kuvaus: "Kuinka todennäköistä on voittaa 3 kolikonheittoa putkeen",
  vastausVaihtoehdot: [
    "20%",
    "10%",
    "12.5%",
    "5%"],
  oikeatVastaukset: [false, false, true, false]
}



const kysymysMatikka2b =
{
  id: 8,
  aihe: "Todennäköisyys",
  kuvaus: "Kuinka todennäköistä on voittaa 4 kolikonheittoa putkeen",
  vastausVaihtoehdot: [
    "5%",
    "10%",
    "6.25%",
    "2.25%"],
  oikeatVastaukset: [false, false, true, false]
}

const kysymysMatikka2c =
{
  id: 9,
  aihe: "Todennäköisyys",
  kuvaus: "Kuinka todennäköistä on saada värisuora pokerissa aloituskäteen",
  vastausVaihtoehdot: [
    "1/64974",
    "1/3200",
    "1/45234",
    "1/83257"],
  oikeatVastaukset: [true, false, false, false]
}

const kysymysMatikka2d =
{
  id: 10,
  aihe: "Todennäköisyys",
  kuvaus: "Mikä on loton palautusprosentti",
  vastausVaihtoehdot: [
    "54,3%",
    "61,6%",
    "87%",
    "41,1%"],
  oikeatVastaukset: [false, false, false, true]
}

const kysymysMatikka3 =
{
  id: 11,
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
  id: 12,
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
  id: 13,
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
  id: 14,
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
  id: 15,
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
  id: 16,
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
  kysymykset: [kysymysMatikka1, kysymysMatikka1a, kysymysMatikka1b, kysymysMatikka1c, kysymysMatikka1d, kysymysMatikka2, kysymysMatikka2a, kysymysMatikka2b, kysymysMatikka2c, kysymysMatikka2d ],
}

const AlkuperäisetTentit = [tentti1, tentti2]

export default AlkuperäisetTentit