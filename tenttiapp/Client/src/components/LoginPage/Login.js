
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
            käyttäjätunnus: state.username,
            salasana: state.password,
        }

        try {
            let LoggedUser = await loginUsername(credentials)

         
           localStorage.setItem('jwtToken', LoggedUser.data.token);
            
            dispatch({ type: "MuutaPasswordAgain", payload: "" })
            dispatch({ type: "MuutaPassword", payload: "" })
            dispatch({ type: "MuutaUsername", payload: "" })
            dispatch({ type: "MuutaKäyttäjäID", payload: LoggedUser.data.user.id })
            dispatch({ type: "MuutaKäyttäjäRooli", payload: LoggedUser.data.user.rooli })
            
         
           
         
     
        }
        catch(e)
        {
            console.log(e)
        }
    }

    const RegisterUser = async () => {

        if (state.password !== state.passwordAgain) {
            console.log("eri salasanat")
            return
        }

        let credentials =
        {
            käyttäjätunnus: state.username,
            salasana: state.password,
        }

        try {
            await registerUser(credentials)

            console.log("Tili luotu!")
            dispatch({ type: "MuutaPasswordAgain", payload: "" })
            dispatch({ type: "MuutaPassword", payload: "" })
            dispatch({ type: "MuutaUsername", payload: "" })
            updateTextfields()
            setIsLogin(!isLogin)
        }
        catch
        {

        }
    }

    //Textfields need a changing key if the value is changed outside the component
    //The key needs to be new unique one every time
    const updateTextfields = () => {

        let newTextfieldKeys = textFieldKeys

        
        for (let i = 0; i < newTextfieldKeys.length; i++) {
            newTextfieldKeys[i] = newTextfieldKeys[i] + 5
        }

        setTextFieldKeys(newTextfieldKeys)
    }

    const changeLoginType = () => {

        dispatch({ type: "MuutaPassword", payload: "" })
        dispatch({ type: "MuutaPasswordAgain", payload: "" })
        setIsLogin(!isLogin)
        updateTextfields()
    }

    const [isLogin, setIsLogin] = useState(true)
    const [textFieldKeys, setTextFieldKeys] = useState([0, 1, 2, 3, 4])
    const { state, dispatch } = useContext(UserContext)


    return (<div style={{ width: '100%', display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 100 }}>

        {isLogin ?
            <div style={{ display: "flex", flexDirection: 'column', width: '50%', justifyContent: 'space-between' }}>
                <h1>Kirjautuminen</h1>

                <TextField
                    key={textFieldKeys[0]}
                    style={{ height: 65 }}
                    text={state.username}
                    variant="outlined"
                    label="Käyttäjätunnus"
                    onChange={(e) => dispatch({ type: "MuutaUsername", payload: e.target.value })} />


                <TextField
                    key={textFieldKeys[1]}
                    style={{ height: 65 }}
                    text={state.password}
                    variant="outlined"
                    type="password"
                    label="Salasana"
                    onChange={(e) => dispatch({ type: "MuutaPassword", payload: e.target.value })} />


            </div>
            :
            <div style={{ display: "flex", flexDirection: 'column', width: '50%' }}>
                <h1>Tilin luonti</h1>

                <TextField
                    key={textFieldKeys[2]}
                    style={{ height: 65 }}
                    label={"Käyttäjätunnus"}
                    text={state.username}
                    variant="outlined"
                    onChange={(e) => dispatch({ type: "MuutaUsername", payload: e.target.value })} />



                <TextField
                    key={textFieldKeys[3]}
                    style={{ height: 65 }}
                    label={"Salasana"}
                    text={state.password}
                    type="password"
                    variant="outlined"
                    onChange={(e) => dispatch({ type: "MuutaPassword", payload: e.target.value })} />

                <TextField
                    key={textFieldKeys[4]}
                    style={{ height: 65 }}
                    label={"Salasana uudestaan"}
                    text={state.passwordAgain}
                    type="password"
                    variant="outlined"
                    onChange={(e) => dispatch({ type: "MuutaPasswordAgain", payload: e.target.value })} />


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