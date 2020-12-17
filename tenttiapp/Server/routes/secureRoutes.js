const express = require('express');
const router = express.Router();
const db = require('../db');


{//Käyttäjä queryt
    router.delete('/kayttaja/:id', (req, res) => {
        db.query('DELETE FROM käyttäjä WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })

    router.get('/kayttaja/:id', (req, res) => {
        db.query('SELECT * FROM käyttäjä WHERE id = $1', [req.params.id], (err, result) => {

            if (err) {
                console.log(err)
            }
            res.send(result.rows[0])
        })
    })

    router.get('/kayttaja/', (req, res) => {
        db.query('SELECT * FROM käyttäjä', (err, result) => {

            console.log("haetaan kayttajat")

            if (err) {
                console.log(err)
            }
            res.send(result.rows)
        })
    })

}

module.exports = router;