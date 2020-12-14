import ServerSettings from '../../ServerSettings.js'
import axios from 'axios';

export const registerUser = async (credentials) => {
  
    try {
        let result = await axios.post(ServerSettings.baseURL + "/rekisteroi/", credentials)

        if (result.statusText === "OK") {


            return result

        } else {
            throw ("Rekisteröinti ei onnistunut")
        }
    }
    catch (exception) {

        throw (exception)
    }
}
