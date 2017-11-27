// Serv will be acessable to other files, via exports!
let serv = exports;

// Will serv be in the game engine?
serv.gamePlugin = true;

// What to do when plugin Loaded via the orbs engine. This is not necessary if you are using
serv.load = (settings, express) => {
    // Settings automatically loaded in!
    // Express inclueded for webservers/websockets!

    // Use Javascript as normal!
    console.log('[Example Plugin] Hi, im an example plugin! Check me out in the plugins folder (./Plugins/Example)!');
}

// What to do when loaded by game engine. (Access Players, Cells, Websocket Requests)
serv.game = (req, onupdate) => {
    // Req aka Requests, are how plugins get information.
    // onupdate is to look for players joining, game ticks, player spliting, player pressing w, ect.

    onupdate.player.join = (player) => {
        // player.name would give you the players Name.
        // This line of code would be executed everytime a player joins.

        // Use request to get player's cell(s).
        let playerCell = req.players.cells(player.id);

        // Ask for new websocket. If your plugin is sending and recieving sensitive data try setting 'public' to 'private'.
        let websocket = req.websocket('/exampleplugin', 'public');
        // If websocket approved
        if (websocket.approved){
            // When a client joins a websocket. If private use onupdate.websocket['/exampleplugin'][websocket.key].message
            onupdate.websocket['/exampleplugin'].message = (e) => {
                let data = JSON.parse(e);
                // Could use data.message to see a message sent from client.
            }
        }else {

        }
    }
}
