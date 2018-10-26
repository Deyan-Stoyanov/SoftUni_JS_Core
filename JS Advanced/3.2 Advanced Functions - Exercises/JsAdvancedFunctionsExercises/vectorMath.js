let solution = (function () {
    return {
        add: function (v1, v2) {
            return [v1[0] + v2[0], v1[1] + v2[1]];
        },
        multiply: function (v1, s) {
            return [v1[0] * s, v1[1] * s];
        },
        length: function (v1) {
            return Math.sqrt(Math.pow(v1[0], 2) + Math.pow(v1[1], 2));
        },
        dot: function (v1, v2) {
            return (v1[0] * v2[0]) + (v1[1] * v2[1]);
        },
        cross: function (v1, v2) {
            return (v1[0] * v2[1]) - (v1[1] * v2[0]);
        }
    };
}());

console.log(solution.add([1, 1], [1, 0]));
