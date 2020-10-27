


const rand = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const haeRandom = (ristikko) => {


    let mahdollisetRuudut = []

    //Filter ei toimi tässä tilanteessa, koska taulukkoon lisätään i eikä ristikon arvoja
    for (let i = 0; i < ristikko.length; i++) {
        if (ristikko[i] === 0) {
            mahdollisetRuudut.push(i)
        }
    }

    let randomKohta = rand(mahdollisetRuudut.length)

    return mahdollisetRuudut[randomKohta]
}


const haeÄlykäsPeli = (ristikko, voittoArrays) => {

    let xLaudalla = laskeX(ristikko)

    //Ensimmäinen nappi keskelle jos mahdollista, muuten random kulmaan
    if (xLaudalla === 0) {
        if (ristikko[4] === 0) {
            return 4
        }
        else {
            let kulmaluku = rand(4)

            //Palauttaa jonkun kulmaposition riippuen randomista
            switch (kulmaluku) {
                case 0:
                    return 0
                case 1:
                    return 2
                case 2:
                    return 6
                case 3:
                    return 8
                default:
                    return 0
            }
        }
    }

    //Jos voit voittaa -> Voita
    //Jos vastustaja voi voittaa -> Estä

    let LisättäväRuutu = haeVoittotilanteet(ristikko, voittoArrays)

    if (LisättäväRuutu !== false) {
        return LisättäväRuutu
    }

    //Jos ympyröitä on keskellä ja X vastakkaisessa kulmassa -> laita johonkin kulmaan
    if (xLaudalla === 1) {
        let kulmaRuutu = laskeKulma(ristikko)

        if (kulmaRuutu !== false) {
            return kulmaRuutu
        }
    }

    //Etsi paikka josta saa eniten voittomahdollisuuksia ensi vuorolle ja palauta niistä yksi
    return haeParasRuutu(ristikko, voittoArrays)
}


const laskeKulma = (ristikko) => {
    if (ristikko[4] === 2) {
        if (ristikko[0] === 1 && ristikko[8] === 2) {
            return 2
        }

        if (ristikko[2] === 1 && ristikko[6] === 2) {
            return 0
        }

        if (ristikko[6] === 1 && ristikko[2] === 2) {
            return 8
        }

        if (ristikko[8] === 1 && ristikko[0] === 2) {
            return 6
        }
    }

    return false
}

//Risti = 1, Nolla = 2
const laskeX = (ristikko) => {
    let x = 0;

    for (let i = 0; i < ristikko.length; i++) {
        if (ristikko[i] === 1) {
            x++
        }
    }

    return x
}


const haeVoittotilanteet = (ristikko, voittoArrays) => {

    //Estetään voitto vain jos mikään mahdollisuus ei voita tai false jos tätäkaan ruutua ei ole
    let voitonEstoRuutu = false

    for (let i = 0; i < voittoArrays.length; i++) {
        let pisteitäRistille = 0

        for (let j = 0; j < voittoArrays[i].length; j++) {
            let voittoRuutu = voittoArrays[i][j]

            if (ristikko[voittoRuutu] === 1) {
                pisteitäRistille++
            }
            else if (ristikko[voittoRuutu] === 2) {
                pisteitäRistille--
            }

            if (pisteitäRistille === 2) {

                for (let k = 0; k < voittoArrays[k].length; k++) {
                    let voittoRuutu2 = voittoArrays[i][k]

                    if (ristikko[voittoRuutu2] === 0) {
                        return voittoRuutu2
                    }
                }
            }

            if (pisteitäRistille === -2) {

                for (let k = 0; k < voittoArrays[k].length; k++) {
                    let voittoRuutu2 = voittoArrays[i][k]

                    if (ristikko[voittoRuutu2] === 0) {
                        voitonEstoRuutu = voittoRuutu2
                    }
                }
            }
        }
    }

    return voitonEstoRuutu
}

const haeParasRuutu = (ristikko, voittoArrays) => {


    const tyhjätRuudut = []
    //Pisteen jokaisesta mahdollisuudesta voittaa ensi vuorolla lisäämällä nyt tyhjään ruutuun
    const tyhjäRuutujenPisteet = []


    for (let i = 0; i < ristikko.length; i++) {
        if (ristikko[i] === 0) {
            tyhjätRuudut.push(i)
            tyhjäRuutujenPisteet.push(0)
        }
    }

    for (let i = 0; i < tyhjätRuudut.length; i++) {
        for (let j = 0; j < voittoArrays.length; j++) {
            let pisteitäRistille = 0

            for (let k = 0; k < voittoArrays[j].length; k++) {

                let voittoRuutu = voittoArrays[j][k]


                if (ristikko[voittoRuutu] === 1 || voittoRuutu === tyhjätRuudut[i]) {




                    pisteitäRistille++
                }



                if (pisteitäRistille === 2) {

                    tyhjäRuutujenPisteet[i] = tyhjäRuutujenPisteet[i] + 1
                    break
                }
            }
        }
    }


    let isoinNumero = Math.max.apply(Math, (tyhjäRuutujenPisteet))



    let parhaimmatRuudut = []

    for (let i = 0; i < tyhjäRuutujenPisteet.length; i++) {
        if (tyhjäRuutujenPisteet[i] === isoinNumero) {
            parhaimmatRuudut.push(tyhjätRuudut[i])
        }
    }

    if (parhaimmatRuudut.length === 0) {
        return 0
    }



    //Otetaan joku parhaista kohdista
    let randomKohta = rand(parhaimmatRuudut.length)

    return parhaimmatRuudut[randomKohta]
}

export { haeRandom, haeÄlykäsPeli }
