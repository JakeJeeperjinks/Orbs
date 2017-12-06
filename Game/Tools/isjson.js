module.exports = (x) => {
    try {
        JSON.parse(x);
    } catch (e) {
        return false;
    }
    return true;
}
