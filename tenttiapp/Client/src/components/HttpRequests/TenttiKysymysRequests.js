import ServerSettings from '../../ServerSettings.js'
import axios from 'axios';
import { haeVastausVaihtoehdotJaLiitäKysymykseen } from "./vastausVaihtoehtoRequests.js"


export const haeTentinKysymykset = async (id) => {
    try {
        let result = await axios.get(ServerSettings.baseURL + "/tenttikysymys/" + id)


        if (result.statusText === "OK") {

            console.log("Tenttikysymys " + id)
            console.log(result.data)

            let kysymykset = result.data

            let actions = kysymykset.map(kysymys => haeVastausVaihtoehdotJaLiitäKysymykseen(kysymys))

            return Promise.all(actions).then(data => {return data})

        } else {
            throw ("Tenttikysymyshaussa ongelmia")
        }
    }
    catch (exception) {

        throw (exception)
    }
}

export const lisääKysymysTenttiin = async (tenttiID, kysymysID) => {


    let tenttikysymysID =
    {
        tentti_id: tenttiID,
        kysymys_id: kysymysID,
    }

    try {

        const result = await axios.post(ServerSettings.baseURL + "/tenttikysymys/", tenttikysymysID)

        if (result.statusText === "OK") {

            return true

        } else {
            throw ("Tenttilisäyksessä ongelmia")
        }
    }
    catch (exception) {

        throw (exception)
    }
}

