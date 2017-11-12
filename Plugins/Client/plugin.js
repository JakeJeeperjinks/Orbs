// Client PLugin by : Triston Stuart

let serv = exports;

serv.load = (settings, express) => {
    let port = settings.port;
    console.log(String('[Client Plugin] Loading Client Server on port : ' + port).bold);
    let clientServer = express();

    clientServer.use('/' + settings.serverStaticFilesPath, express.static(__dirname + '/' + settings.clientPath));
    clientServer.get('/', (req, res) => {
        res.sendFile(__dirname + '/' + settings.clientPath + '/' + settings.clientIndex + '.html')
    });
    clientServer.get('/test', (req, res) => {
        res.send('Client is up and running!');
    });
    clientServer.listen(port)
}
