var ArrayList = /** @class */ (function () {
    function ArrayList() {
        this.items = [];
    }
    ArrayList.prototype.insert = function (item) {
        this.items.push(item);
    };
    ArrayList.prototype.toString = function () {
        return this.items.join(' ');
    };
    ArrayList.prototype.swap = function (m, n) {
        var temp = this.items[m];
        this.items[m] = this.items[n];
        this.items[n] = temp;
    };
    ArrayList.prototype.bubbleSort = function () {
        var items = this.items;
        var length = this.items.length;
        for (var j = length - 1; j >= 0; j--) {
            for (var i = 0; i < j; i++) {
                if (this.items[i] > this.items[i + 1]) {
                    // let temp = this.items[i]
                    // this.items[i] = this.items[i + 1]
                    // this.items[i + 1] = temp
                    this.swap(i, i + i);
                    // this.items = swap(items, i, i + 1)
                }
            }
        }
    };
    return ArrayList;
}());
function swap(arr, m, n) {
    var temp = arr[m];
    arr[m] = arr[n];
    arr[n] = temp;
    return arr;
}
var a = new ArrayList();
var arr = [123, 234, 546, 67, 78, 12, 54, 34, 312];
for (var i = 0; i < arr.length; i++) {
    a.insert(arr[i]);
}
// a.swap(1, 5)
a.bubbleSort();
console.log(a.items);
