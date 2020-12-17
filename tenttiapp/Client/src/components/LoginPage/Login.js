
import { UserContext } from '../../App.js'
import { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { loginUsername } from '../HttpRequests/loginRequests.js'
import { registerUser } from '../HttpRequests/registerRequests.js'




function Login() {


    const LoginWithUsername = async () => {

        let credentials =
        {
            käyttäjätunnus: username,
            salasana: password,
        }

        try {
            let LoggedUser = await loginUsername(credentials)

            console.log(LoggedUser)

            localStorage.setItem('jwtToken', LoggedUser.data.token);

            dispatch({ type: "MuutaKäyttäjäID", payload: LoggedUser.data.user.id })
            dispatch({ type: "MuutaKäyttäjäRooli", payload: LoggedUser.data.user.rooli })

        }
        catch (e) {
            console.log(e)
        }
    }

    const RegisterUser = async () => {

        if (password !== passwordAgain) {
            console.log("eri salasanat")
            return
        }

        let credentials =
        {
            käyttäjätunnus: username,
            salasana: password,
        }

        try {
            await registerUser(credentials)

            setIsLogin(!isLogin)
        }
        catch
        {

        }
    }

   

    const changeLoginType = () => {

        dispatch({ type: "MuutaPassword", payload: "" })
        dispatch({ type: "MuutaPasswordAgain", payload: "" })
        setIsLogin(!isLogin)
       
    }

    const [isLogin, setIsLogin] = useState(true)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")

    const { state, dispatch } = useContext(UserContext)


    return (<div style={{ width: '100%', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 100 }}>

        {isLogin ?
            <div style={{ display: "flex", flexDirection: 'column', width: '50%', justifyContent: 'space-between' }}>
                <h1>Kirjautuminen</h1>

                <TextField
                
                    style={{ height: 65 }}
                    text={username}
                    variant="outlined"
                    label="Käyttäjätunnus"
                    onChange={(e) => setUsername(e.target.value) }/>


                <TextField
          
                    style={{ height: 65 }}
                    text={password}
                    variant="outlined"
                    type="password"
                    label="Salasana"
                    onChange={(e) => setPassword(e.target.value) }/>


            </div>
            :
            <div style={{ display: "flex", flexDirection: 'column', width: '50%' }}>
                <h1>Tilin luonti</h1>

                <TextField
              
                    style={{ height: 65 }}
                    label={"Käyttäjätunnus"}
                    text={username}
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value) } />



                <TextField
            
                    style={{ height: 65 }}
                    label={"Salasana"}
                    text={password}
                    type="password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value) } />

                <TextField
    
                    style={{ height: 65 }}
                    label={"Salasana uudestaan"}
                    text={passwordAgain}
                    type="password"
                    variant="outlined"
                    onChange={(e) => setPasswordAgain(e.target.value) } />


            </div>


        }
        <div style={{ display: "flex", flexDirection: "row", width: '50%', paddingTop: 30, justifyContent: 'flex-end' }}>
            <Button style={{ marginRight: 5 }} color="primary" variant="contained" onClick={changeLoginType}>{isLogin ? "Uusi tili" : "Takaisin kirjautumiseen"}</Button>
            {isLogin ?
                <Button color="primary" variant="contained" onClick={LoginWithUsername}>Kirjaudu</Button>
                :
                <Button color="primary" variant="contained" onClick={RegisterUser}>Luo tili</Button>
            }
        </div>
    </div >)


}

export default Login