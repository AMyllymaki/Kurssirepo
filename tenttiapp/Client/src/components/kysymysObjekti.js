
import { v4 as uuidv4 } from 'uuid';

export const uusiKysymys = (id = uuidv4()) => {

    let kysymys =
    {
        id: id,
        kuvaus: "Kysymyksen kuvaus",
        vastausVaihtoehdot: [
            "Vastaus1",
            "Vastaus2",
        ],
        oikeatVastaukset: [false, false]
    }

    return kysymys
}
