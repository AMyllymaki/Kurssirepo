import ServerSettings from '../../ServerSettings.js'
import axios from 'axios';

export const haeTentit = async () => {
    try {
        let result = await axios.get(ServerSettings.baseURL + "/tentti/")

        if (result.statusText === "OK") {

            return result

        } else {
            throw ("Tenttihaussa ongelmia")
        }
    }
    catch (exception) {

        throw (exception)
    }
}

//Palauttaa uuden komponenti ID:n
export const lisääTentti = async (tentti) => {

  
    try {

        const result = await axios.post(ServerSettings.baseURL + "/tentti/", tentti)

        if (result.statusText === "OK") {

         
            return result.data.toString()

        } else {
            throw ("Tenttilisäyksessä ongelmia")
        }
    }
    catch (exception) {

        throw (exception)
    }
}


export const poistaTentti = async (id) => {
    try {
        let result = await axios.delete(ServerSettings.baseURL + "/tentti/" + id)

   
        if (result.statusText === "OK") {

            return result

        } else {
            throw ("Tentin poistossa ongelmia")
        }
    }
    catch (exception) {

        throw (exception)
    }
}

export const muokkaaTenttiä = async (id, tentti) => {
    try {
        let result = await axios.put(ServerSettings.baseURL + "/tentti/" + id, tentti)

      
        if (result.statusText === "OK") {

            return result

        } else {
            throw ("Tentin muokkauksessa ongelmia")
        }
    }
    catch (exception) {

        throw (exception)
    }
}

export const julkaiseTentti = async (id) => {
    try {
        let result = await axios.put(ServerSettings.baseURL + "/julkaise/tentti/" + id)

        if (result.data.length > 0) {

            return result

        } else {
            throw ("Tentin julkaisu ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}