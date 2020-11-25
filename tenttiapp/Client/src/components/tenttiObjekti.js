

import { v4 as uuidv4 } from 'uuid';

export const uusiTentti = (id = uuidv4()) => {

    let tentti =
    {
        id: id,
        nimi: "Tentin nimi",
        kysymykset: []
    }

    return tentti
}


