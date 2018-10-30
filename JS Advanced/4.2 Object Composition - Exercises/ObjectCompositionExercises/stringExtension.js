(function extendString() {
    String.prototype.ensureStart = function (str) {
        let currentString = this.valueOf().toString();
        if (!currentString.startsWith(str)) {
            return str + currentString;
        }
        return currentString;
    };

    String.prototype.ensureEnd = function (str) {
        let currentString = this.valueOf().toString();
        if (!currentString.endsWith(str)) {
            return currentString + str;
        }
        return currentString;
    };

    String.prototype.isEmpty = function () {
        return this.valueOf().toString() === "";
    };

    String.prototype.truncate = function (n) {
        let currentString = this.valueOf().toString();
        let result;
        if (currentString.length <= n) {
            result = currentString;
        } else if (currentString.indexOf(" ") > -1 && currentString.indexOf(" ") < n - 3) {
            let tempArr = currentString.split(' ');
            let tempresult = "";
            for (let s of tempArr) {
                if (tempresult.trim().length + s.trim().length + 3 >= n) {
                    tempresult = tempresult.trim();
                    break;
                }
                tempresult += (s + " ");
            }
            result = tempresult + "...";
        } else if (n <= 3) {
            result = ".".repeat(n);
        } else {
            result = currentString.substring(0, n - 3) + "...";
        }
        return result;
    };

    String.format = function (str, ...params) {
        for (let p of params) {
            str = str.replace(/\{[0-9]+\}/, p);
        }
        return str;
    };
})();

let str = 'my string';
str = str.ensureStart('my');
str = str.ensureStart('hello ');
str = str.truncate(16);
str = str.truncate(14);
str = str.truncate(8);
str = str.truncate(4);
str = str.truncate(2);
str = String.format('The {0} {1} fox', 'quick', 'brown');
str = String.format('jumps {0} {1}', 'dog');
