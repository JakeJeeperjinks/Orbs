exports.check = function(settings){
    if (!settings.port){
        settings.port = 802;
    }
    if (!settings.gamesizeX){
        settings.gamesizeX = 1000;
    }
    if (!settings.gamesizeY){
        settings.gamesizeY = 1000;
    }
    if (!settings.foodMax){
        settings.foodMax = 5000;
    }
    if (!settings.foodGen){
        settings.foodGen = 5;
    }
    if (!settings.foodStart){
        settings.foodStart = 1000;
    }
    if (!settings.playersMax){
        settings.playersMax = 15;
    }
    if (!settings.ipMax){
        settings.ipMax = 4;
    }
    if (!settings.splitMax){
        settings.aplitMax = 16;
    }
    if (!settings.cellSpeed){
        settings.cellSpeed = 3;
    }
    if (!settings.eatPercent){
        settings.eatPercent = 0.5;
    }
    if (!settings.rgbMin1){
        settings.rgbMin1 = 0;
    }
    if (!settings.rgbMin2){
        settings.rgbMin2 = 0;
    }
    if (!settings.rgbMin3){
        settings.rgbMin3 = 0;
    }
    if (!settings.rgbMax1){
        settings.rgbMax1 = 255;
    }
    if (!settings.rgbMax2){
        settings.rgbMax2 = 255;
    }
    if (!settings.rgbMax3){
        settings.rgbMax3 = 255;
    }
    if (!settings.colorOpacity){
        settings.colorOpacity = 127;
    }
    if (!settings.playerSpawnSize){
        settings.playerSpawnSize = 128;
    }
    if (!settings.check){
        settings.check = 'No check defined. Use : check';
    }
    return settings
}
