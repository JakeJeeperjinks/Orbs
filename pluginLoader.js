const fs = require('fs');
const ini = require('ini');

exports.load = function(all, plugin){
    if (all){
        // Load all plugins in folder.

        let plugins = [];
        fs.readdirSync('./Plugins').forEach(file => {
            let stats = fs.statSync(file)
            if (stats.isDirectory()){
                plugins[plugins.length] = file;
                console.log(String('[Game Info] Loading Plugin ' + file).bold)
            }else {
                console.log(String(file + ' Not in a folder, cant load it as a plugin.').bold.red)
            }
        });


    }else {
        // Load individual plugin
    }
}
