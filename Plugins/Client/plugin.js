// Client Plugin by : Triston Stuart

let serv = exports;

serv.gamePlugin = false;
let server;
let SETTINGS;
let EXPRESS;

serv.load = (settings, express) => {
  SETTINGS = settings;
  console.log(String('[Client Plugin] Loading Client Server on port : ' + SETTINGS.port).bold);
  let clientServer = express();
  EXPRESS = express;

  clientServer.use('/' + settings.serverStaticFilesPath, express.static(__dirname + '/' + settings.clientPath));
  clientServer.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + settings.clientPath + '/' + settings.clientIndex + '.html')
  });
  clientServer.get('/test', (req, res) => {
    res.send('Client is up and running!');
  });
  server = clientServer.listen(settings.port);
}

serv.commands = [
  {
    commandType: 'help',
    command: (arguments) => {
      // Command : help client
      return 'Client Commands (use as normal commands) : \nrefresh-client | Refreshes Client Server. Use after changing port.\nport-client [PORT (NUMBER)] | Changes the host port. Use refresh-client afterwards.\n'.bold
    }
  },
  {
    commandType: 'command',
    name: 'refresh-client',
    command: (arguments) => {
      // Command refresh-client
      if (SETTINGS && EXPRESS && serv){
        server.close();
        let clientServer = EXPRESS();

        clientServer.use('/' + SETTINGS.serverStaticFilesPath, EXPRESS.static(__dirname + '/' + SETTINGS.clientPath));
        clientServer.get('/', (req, res) => {
          res.sendFile(__dirname + '/' + SETTINGS.clientPath + '/' + SETTINGS.clientIndex + '.html')
        });
        clientServer.get('/test', (req, res) => {
          res.send('Client is up and running!');
        });
        server = clientServer.listen(SETTINGS.port);
        return ('Client Refreshed! Port : ' + SETTINGS.port + ' \n').bold
      }else {
        return 'ERROR : Could not refresh client, client server has not been started. \n'.bold
      }
    }
  },
  {
    commandType: 'command',
    name: 'port-client',
    command: (arguments) => {
      // Command refresh-client
      if (SETTINGS && EXPRESS && serv){
        if (arguments.length > 0){
          SETTINGS.port = Number(arguments[0])
          return ('Port Set To : ' + SETTINGS.port + ' \n').bold
        }else {
          return 'No port number specified \n'.bold
        }

      }else {
        return 'ERROR : Could not set port , client server has not been started. \n'.bold
      }
    }
  }
]
