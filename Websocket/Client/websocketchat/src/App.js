
import { useReducer, useEffect, useRef } from 'react'

const URL = 'ws://localhost:3030'

function reducer(state, action) {

  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "ChangeText":

      newState.chatMessage = action.payload
      return newState

    case "ChangeAddMessageToChat":

      newState.allChatMessages.push(action.payload)
      return newState

    case "ChangeUsername":
      newState.username = action.payload
      return newState

    case "ChangeChatMessageTargetName":
      newState.chatMessageTargetName = action.payload
      return newState


    default:
      throw new Error();
  }
}

const initialState = {
  chatMessage: "",
  chatMessageTargetName: "",
  allChatMessages: [],
  username: "Bob",
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  const ws = useRef(null)

  useEffect(() => {

    ws.current = new WebSocket(URL)

    ws.current.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected")
    }

    ws.current.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      console.log("Got Message")
      const message = JSON.parse(evt.data)

      dispatch({ type: "ChangeAddMessageToChat", payload: message })

    }

    ws.current.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      ws.current = new WebSocket(URL)
    }
  }, []);



  const sendMessage = () => {
    if (state.chatMessage === "") {
      return
    }

    console.log(state)

    const message = { name: state.username, message: state.chatMessage, target: state.chatMessageTargetName }


    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message))
    }
    else {
      console.log("Wait a second!")
      return
    }


    dispatch({ type: "ChangeAddMessageToChat", payload: message })
    dispatch({ type: "ChangeText", payload: "" })

  }

  const changeChatMessage = (e) => {

    dispatch({ type: "ChangeText", payload: e.target.value })

  }

  const changeUsername = (e) => {
    dispatch({ type: "ChangeUsername", payload: e.target.value })
  }

  const changeNameTarget = (e) => {
    dispatch({ type: "ChangeChatMessageTargetName", payload: e.target.value })
  }


  const getChatName = (message) => {

    if (message.target === "") {
      return message.name + ":"
    }
    else if (message.target === state.username) {
      return "From " + message.name + ":"
    }
    else {
      return "To " + message.target + ":"
    }

  }

  const getChatColor = (message) => {
    if (message.target === "") {
      return 'green'
    }
    else if (message.target === state.username) {
      return 'purple'
    }
    else {
      return 'purple'
    }
  }

  const getNameToPrivateChat = (message) => {
    dispatch({ type: "ChangeChatMessageTargetName", payload: message.name })
  }


  return (
    <div className="App" style={mainStyle}>

      <div style={messageBox}>
        <div style={rowStyle}>
          <b style={smallMarginRight}>Username: </b>
          <input name={"username_field"} onChange={(e) => changeUsername(e)} value={state.username} />
        </div>
        <br />

        <div style={rowStyle}>
          <b style={smallMarginRight}>Message: </b>
          <input style={smallMarginRight} name={"chatmessage_field"} onChange={(e) => changeChatMessage(e)} value={state.chatMessage} />

        </div>
        <br />
        <div style={rowStyle}>
          <b style={smallMarginRight}>Private Message Name: </b>
          <input style={smallMarginRight} name={"chatmessage_field"} onChange={(e) => changeNameTarget(e)} value={state.chatMessageTargetName} />

        </div>
        <br />
        <button name={"sendmessage_button"} onClick={sendMessage}>Send Message</button>
        <br />
      </div>
      <div style={chatBox}>
        {state.allChatMessages.map((message, i) =>

          <div key={i} style={rowStyle}>
            <b onClick={() => getNameToPrivateChat(message)} style={{ marginRight: 5, color: getChatColor(message) }}>{getChatName(message)}</b>
            <b onClick={() => getNameToPrivateChat(message)} style={{ color: getChatColor(message) }}>{message.message}</b>
            <br />
          </div>

        )}
      </div>
    </div>
  );
}


const mainStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 100
}

const rowStyle = {
  display: 'flex',
  flexDirection: 'row'
}

const smallMarginRight = {

  marginRight: 5
}

const chatBox = {

  border: "1px solid black",
  height: 500,
  width: '50%'
}

const messageBox = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  width: '50%'
}

export default App;
