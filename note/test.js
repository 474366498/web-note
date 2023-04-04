var log = console.log;
function myInstanceof(l, r) {
    if (typeof l !== 'object' || l === null)
        return false;
    var p = Object.getPrototypeOf(l);
    while (true) {
        if (p === null)
            return false;
        if (p == r.prototype)
            return true;
        p = Object.getPrototypeOf(p);
    }
}
log(myInstanceof(1, String));
