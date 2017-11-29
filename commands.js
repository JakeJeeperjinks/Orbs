// Add plugin integreation
module.exports = (data, game) => {
    let arguments = data.split(' ');
    if (arguments.length == 1){
        // Single Command
        let cmd = arguments[0];
        if (cmd == 'help'){
            return 'Commands : \nhelp | Displays this :)'.bold
        }
    }else {

    }
}
