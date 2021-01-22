const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });
CLIENTS = []

wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(data) {

        let jsonData = JSON.parse(data)

        let client = {
            client: ws,
            name: jsonData.name
        }

        let userExists = false
 
        CLIENTS.forEach(theClient => {

            if(theClient.name === client.name)
            {
                console.log("User already found!")
                userExists = true
            }
        });

        if(!userExists)
        {
            CLIENTS.push(client)
        }

        if (jsonData.target === "") {


            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {

                    client.send(data);
                }
            });
        }
        else {
            CLIENTS.forEach(theClient => {


                if (theClient.name === jsonData.target) {

                    theClient.client.send(data);
                }
            });
        }
    });
});
