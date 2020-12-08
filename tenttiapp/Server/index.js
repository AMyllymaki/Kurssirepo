const cors = require('cors')

const express = require('express')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(cors()) 
const port = 4000

// notice here I'm requiring my database adapter file
// and not requiring node-postgres directly
const db = require('./db');


//TODO

//Käytettävien komponenttien muodostaminen serverillä useammalla haulla?

//Liitostaulujen luonti:
//(käyttäjän lisääminen kurssille, tentin lisääminen kurssille, tentin ja käyttäjän yhdistäminen, kysymysten lisääminen tenttiin)

//Nodesta ei nyt lähde erroreita

//Saman kysymyksen lisääminen tenttiin kaataa asioita (sama muissa liitostauluissa myöhemmin)


//TÄN KOODIMÄÄRÄN VOI FIKSAA ROUTEILLA!

{//Käyttäjä queryt
    app.delete('/kayttaja/:id', (req, res) => {
        db.query('DELETE FROM käyttäjä WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })

    app.get('/kayttaja/:id', (req, res) => {
        db.query('SELECT * FROM käyttäjä WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows[0])
        })
    })

    app.get('/kayttaja/', (req, res) => {
        db.query('SELECT * FROM käyttäjä', (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

    app.post('/kayttaja/', (req, res) => {

        let etunimi = req.body.etunimi
        let sukunimi = req.body.sukunimi
        let sähköposti = req.body.sähköposti
        let salasana = req.body.salasana
        let rooli = req.body.rooli

        let SQLRequest = "INSERT INTO käyttäjä(etunimi, sukunimi, sähköposti, salasana, rooli) VALUES ($1,$2,$3,$4,$5)"

        db.query(SQLRequest, [etunimi, sukunimi, sähköposti, salasana, rooli], (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })
}

{//Kurssi queryt
    app.delete('/kurssi/:id', (req, res) => {
        db.query('DELETE FROM kurssi WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })

    app.get('/kurssi/:id', (req, res) => {
        db.query('SELECT * FROM kurssi WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows[0])
        })
    })

    app.get('/kurssi/', (req, res) => {
        db.query('SELECT * FROM kurssi', (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

    app.post('/kurssi/', (req, res) => {

        let kurssi = req.body.kurssi

        let SQLRequest = "INSERT INTO kurssi(kurssi) VALUES ($1)"

        db.query(SQLRequest, [kurssi], (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })
}

{//Tentti queryt
    app.delete('/tentti/:id', (req, res) => {
        db.query('DELETE FROM tentti WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })

    app.get('/tentti/:id', (req, res) => {
        db.query('SELECT * FROM tentti WHERE id = $1', [req.params.id], (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
            }
            res.send(result.rows[0])
        })
    })

    app.get('/tentti/', (req, res) => {
        db.query('SELECT * FROM tentti', (err, result) => {


            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

    app.put('/tentti/:id', (req, res) => {

        let nimi = req.body.nimi
        let minimipisteet = req.body.minimipisteet
        let SQLRequest = "UPDATE tentti SET nimi=$2, minimipisteet=$3 WHERE id = $1"

        db.query(SQLRequest, [req.params.id, nimi, minimipisteet], (err, result) => {

            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })


    })

    //Julkaise tentti
    app.put('/julkaise/tentti/:id', (req, res) => {

        let SQLRequest = "UPDATE tentti SET julkaisuajankohta=now() WHERE id = $1"

        db.query(SQLRequest, [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })

    app.post('/tentti/', (req, res) => {

        let nimi = req.body.nimi
        let minimipisteet = req.body.minimipisteet
        let SQLRequest = "INSERT INTO tentti(nimi, minimipisteet) VALUES ($1, $2) RETURNING id"

        db.query(SQLRequest, [nimi, minimipisteet], (err, result) => {

            if (err) {
                console.log(err)
                return
            }

            res.send(result.rows[0].id)
        })
    })
}

{//Kysymys queryt
    app.delete('/kysymys/:id', (req, res) => {
        db.query('DELETE FROM kysymys WHERE id = $1', [req.params.id], (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })

    app.get('/kysymys/:id', (req, res) => {
        db.query('SELECT * FROM kysymys WHERE id = $1', [req.params.id], (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
            }
            res.send(result.rows[0])
        })
    })

    app.get('/kysymys/', (req, res) => {
        db.query('SELECT * FROM kysymys', (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

    app.post('/kysymys/', (req, res) => {

        let kysymys = req.body.kysymys
        let aihe_id = req.body.aihe_id
        let SQLRequest = "INSERT INTO kysymys(kysymys, aihe_id) VALUES ($1, $2) RETURNING id"

        db.query(SQLRequest, [kysymys, aihe_id], (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0].id)
        })
    })

    app.put('/kysymys/:id', (req, res) => {

        let kysymys = req.body.kysymys
        let aihe_id = req.body.aihe_id
        let SQLRequest = "UPDATE kysymys SET kysymys=$1, aihe_id=$2 WHERE id=$3"

        db.query(SQLRequest, [kysymys, aihe_id, req.params.id], (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })
}

{//Aihe queryt
    app.delete('/aihe/:id', (req, res) => {
        db.query('DELETE FROM aihe WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })

    app.get('/aihe/:id', (req, res) => {
        db.query('SELECT * FROM aihe WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows[0])
        })
    })

    app.get('/aihe/', (req, res) => {
        db.query('SELECT * FROM aihe', (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

    app.post('/aihe/', (req, res) => {

        let aihe = req.body.aihe
        let SQLRequest = "INSERT INTO aihe(aihe) VALUES ($1)"

        db.query(SQLRequest, [aihe], (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })


    app.put('/aihe/:id', (req, res) => {

        let aihe = req.body.aihe
        let SQLRequest = "UPDATE aihe SET aihe=$1 WHERE id=$2"

        db.query(SQLRequest, [aihe, req.params.id], (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })
}

{//Vastausvaihtoehto queryt
    app.delete('/vastausvaihtoehto/:id', (req, res) => {
        db.query('DELETE FROM vastausvaihtoehto WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })

    app.get('/vastausvaihtoehto/:id', (req, res) => {
        db.query('SELECT * FROM vastausvaihtoehto WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows[0])
        })
    })

    app.get('/vastausvaihtoehto/', (req, res) => {
        db.query('SELECT * FROM vastausvaihtoehto', (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

    app.get('/vastausvaihtoehto/kysymys/:id', (req, res) => {
        db.query('SELECT * FROM vastausvaihtoehto WHERE kysymys_id =$1', [req.params.id], (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

    app.post('/vastausvaihtoehto/', (req, res) => {

        let vaihtoehto = req.body.vaihtoehto
        let oikea_vastaus = req.body.oikea_vastaus
        let kysymys_id = req.body.kysymys_id

        let SQLRequest = "INSERT INTO vastausvaihtoehto(vaihtoehto, oikea_vastaus, kysymys_id) VALUES ($1, $2, $3) RETURNING id"

        db.query(SQLRequest, [vaihtoehto, oikea_vastaus, kysymys_id], (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0].id)
        })
    })

    app.put('/vastausvaihtoehto/:id', (req, res) => {

        let vaihtoehto = req.body.vaihtoehto
        let oikea_vastaus = req.body.oikea_vastaus
        let SQLRequest = "UPDATE vastausvaihtoehto SET vaihtoehto=$1, oikea_vastaus=$2  WHERE id=$3"

        db.query(SQLRequest, [vaihtoehto, oikea_vastaus, req.params.id], (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })
}

{//Vastaus queryt
    app.delete('/vastaus/:id', (req, res) => {
        db.query('DELETE FROM vastaus WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })

    app.get('/vastaus/:id', (req, res) => {
        db.query('SELECT * FROM vastaus WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows[0])
        })
    })

    app.get('/vastaus/', (req, res) => {
        db.query('SELECT * FROM vastaus', (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

    //Hae yhden käyttäjän kaikki vastaukset yhteen tenttiin

    app.get('/vastaus/kayttaja/:kayttaja_id/tentti/:tentti_id', (req, res) =>
    {
        let SQLRequest = 'SELECT * FROM vastaus WHERE käyttäjä_id=$1 AND vaihtoehto_id IN (SELECT id FROM vastausvaihtoehto WHERE kysymys_id IN(SELECT id FROM kysymys WHERE id IN (SELECT kysymys_id FROM tenttikysymys WHERE tentti_id = $2)))'

        db.query(SQLRequest,[req.params.kayttaja_id, req.params.tentti_id], (err, result) => {

            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows)
        })
    })

    app.post('/vastaus/', (req, res) => {

        let tyyppi = req.body.tyyppi
        let vaihtoehto_id = req.body.vaihtoehto_id
        let käyttäjä_id = req.body.käyttäjä_id


        let SQLRequest = "INSERT INTO vastaus(tyyppi, vaihtoehto_id, käyttäjä_id, vastauspäivämäärä) VALUES ($1, $2, $3, now()) RETURNING id, vastauspäivämäärä"

        db.query(SQLRequest, [tyyppi, vaihtoehto_id, käyttäjä_id], (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
                return
            }

            res.send(result.rows[0])
        })
    })

    app.put('/vastaus/:id', (req, res) => {

        let tyyppi = req.body.tyyppi
        let SQLRequest = "UPDATE vastaus SET tyyppi=$1, vastauspäivämäärä=now() WHERE id=$2"

        console.log(tyyppi)

        db.query(SQLRequest, [tyyppi, req.params.id], (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })
}

{//Tenttikysymys queryt

    app.delete('/tenttikysymys/:idtentti/kysymys/:idkysymys', (req, res) => {
        db.query('DELETE FROM tenttikysymys WHERE tentti_id = $1 AND kysymys_id = $2', [req.params.idtentti, req.params.idkysymys], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })

    //Hakee yhden tentin kaikki kysymykset
    app.get('/tenttikysymys/:idtentti', (req, res) => {


        db.query('SELECT * FROM kysymys WHERE id IN (SELECT kysymys_id FROM tenttikysymys WHERE tentti_id = $1)', [req.params.idtentti], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows)
          
        })
    })

    //Hakee yhden kysymyksen kaikki tentit
    app.get('/kysymystentti/:idkysymys', (req, res) => {
        db.query('SELECT tentti_id FROM tenttikysymys WHERE kysymys_id = $1', [req.params.idkysymys], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

    app.post('/tenttikysymys/', (req, res) => {

        console.log(req.body)

        let tentti_id = req.body.tentti_id
        let kysymys_id = req.body.kysymys_id

        let SQLRequest = "INSERT INTO tenttikysymys(tentti_id, kysymys_id) VALUES ($1, $2)"

        db.query(SQLRequest, [tentti_id, kysymys_id], (err, result) => {

            console.log(req.params.id)
            if (err) {
                console.log(err)
                return
            }
            res.send(result.rows[0])
        })
    })
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})