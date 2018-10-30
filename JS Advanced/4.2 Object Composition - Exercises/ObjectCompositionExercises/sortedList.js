function list() {
    let myList = {};
    myList.arr = [];
    myList.sort = function () {
        myList.arr.sort((a, b) => {
            if(typeof a == "string" && typeof b == "string"){
                return a.toString().localeCompare(b.toString());
            }
            return a - b;
        });
    };
    myList.add = function (element) {
        this.arr.unshift(element);
        this.sort();
        return this;
    };
    myList.remove = function (index) {
        if (index < this.arr.length) {
            this.arr = this.arr.filter((v, i) => i !== index);
        }
        this.sort();
    };
    myList.get = function (index) {
        if (index < this.arr.length) {
            return this.arr[index];
        }
    };
    // myList.size = this.arr.length;
    Object.defineProperty(myList, "size", {
        get: function () {
            return this.arr.length;
        },
        set: function () {
            this["value"] = this.arr.length;
        }
    });
    return myList;
}
