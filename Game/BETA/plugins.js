// Import
const pluginReq = require(__dirname + '/Game/Plugins/req.js');

// Global
let plugins = {};
let websocketHandle = {
    path : {},
    info : {}
}


// In init
// Set plugins to.. plugins
plugins = plugin_s;
for (let pluginInit=0; pluginInit<plugins.length; pluginInit++){
    // For each plugin

    // Set plugin onupdate and req.
    plugins[pluginInit].onupdate = {};
    plugins[pluginInit].req = pluginReq.req;

    // Initialize Plugin, sending its req and onupdate to be updated.
    plugins[pluginInit].game(plugins[pluginInit].req, plugins[pluginInit].onupdate);
}
