let tools = {
    quadrant : (mouseX, mouseY) => {
        if (mouseX == 0) {
            if (mouseY == 0) {
                return 'center'
            }else if (mouseY > 0) {
                return 'north'
            }else if (mouseY < 0) {
                return 'south'
            }
        }else if (mouseX > 0) {
            if (mouseY == 0) {
                return 'east'
            }else if (mouseY > 0) {
                return 'quadrant1'
            }else if (mouseY < 0) {
                return 'quadrant4'
            }
        }else if (mouseX < 0) {
            if (mouseY == 0) {
                return 'west'
            }else if (mouseY > 0) {
                return 'quadrant2'
            }else if (mouseY < 0) {
                return 'quadrant3'
            }
        }
    },
    inteceptCircleLineSeg : (circle, line) => {
        var a, b, c, d, u1, u2, ret, retP1, retP2, v1, v2;
        v1 = {};
        v2 = {};
        v1.x = line.p2.x - line.p1.x;
        v1.y = line.p2.y - line.p1.y;
        v2.x = line.p1.x - circle.center.x;
        v2.y = line.p1.y - circle.center.y;
        b = (v1.x * v2.x + v1.y * v2.y);
        c = 2 * (v1.x * v1.x + v1.y * v1.y);
        b *= -2;
        d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
        if(isNaN(d)){ // no intercept
            return [];
        }
        u1 = (b - d) / c;  // these represent the unit distance of point one and two on the line
        u2 = (b + d) / c;
        retP1 = {};   // return points
        retP2 = {}
        ret = []; // return array
        if(u1 <= 1 && u1 >= 0){  // add point if on the line segment
            retP1.x = line.p1.x + v1.x * u1;
            retP1.y = line.p1.y + v1.y * u1;
            ret[0] = retP1;
        }
        if(u2 <= 1 && u2 >= 0){  // second add point if on the line segment
            retP2.x = line.p1.x + v1.x * u2;
            retP2.y = line.p1.y + v1.y * u2;
            ret[ret.length] = retP2;
        }
        return ret;
    }
}
module.exports = (cell, mouseX, mouseY, width, height) => {
    let newcell = new vector(cell.x, cell.y);
    newcell.mass = cell.mass/2
    newcell.radius = cell.radius/2
    newcell.color = cell.color

    cell.mass = cell.mass/2
    cell.radius = cell.radius/2

    let quadrant = tools.quadrant(mouseX, mouseY);
    if (quadrant == 'north' || quadrant == 'south' || quadrant == 'east' || quadrant == 'west'){
        if (quadrant == 'north'){
            cell.y += cell.radius * 2
        }else if (quadrant == 'south'){
            cell.y += -(cell.radius * 2)
        }else if (quadrant == 'east'){
            cell.x += cell.radius * 2
        }else if (quadrant == 'west'){
            cell.x += -(cell.radius * 2)
        }
    }else {
        let a = new vector(0, 0)
        let b = new vector(mouseX-(width/2), mouseY-(height/2));
        let radius = cell.radius;
        var angleDeg = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI
        var angleRadians = Math.atan2(b.y - a.y, b.x - a.x)
        var slope = Math.round(Math.tan(angleRadians) * 100)/100
        var line = {
            p1 : a,
            p2 : b,
        }
        var circle = {
            radius : radius,
            center : new vector(0, 0)
        }
        var intersection = tools.inteceptCircleLineSeg(circle, line)[0]
        newcell.x += (intersection.x * 2);
        newcell.y += (intersection.y * 2);
    }
    return [cell, newcell];
}
