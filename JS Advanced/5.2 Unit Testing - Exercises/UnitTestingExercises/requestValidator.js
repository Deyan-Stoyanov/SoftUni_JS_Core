function validateRequest(obj) {
    const errorMessage = "Invalid request header: Invalid ";
    if (!obj.hasOwnProperty("method") || !["GET", "POST", "DELETE", "CONNECT"].includes(obj.method.toUpperCase())) {
        throw new Error(errorMessage + "Method");
    } else if (!obj.hasOwnProperty("uri")  || /[a-zA-Z0-9.]+|\*/g.test(obj.uri) == false) {
        throw new Error(errorMessage + "URI");
    } else if (!obj.hasOwnProperty("version")  || !["HTTP/0.9", "HTTP/1.0", "HTTP/1.1", "HTTP/2.0"].includes(obj.version.toUpperCase())) {
        throw new Error(errorMessage + "Version");
    } else if (!obj.hasOwnProperty("message")  ||/^$|^[^<>\\&'"]+$/g.test(obj.message) == false) {
        throw new Error(errorMessage + "Message");
    }
    return obj;
}

console.log(JSON.stringify({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
}));

let expect = require("chai").expect;

describe("Validate Request", function () {
    it("should return error message when incorrect method passed", function () {
        expect(validateRequest.bind(validateRequest,{
            method: 'OPTIONS',
            uri: 'git.master',
            version: 'HTTP/1.1',
            message: '-recursive'
        })).to.throw(Error, "Invalid request header: Invalid Method");
    });

    it("should return error message when incorrect uri passed", function () {
        expect(validateRequest.bind(validateRequest, {
            method: 'GET',
            uri: '',
            version: 'HTTP/1.1',
            message: '-recursive'
        })).to.throw("Invalid request header: Invalid URI");
    });

    it("should return error message when incorrect version passed", function () {
        expect(validateRequest.bind(validateRequest,{
            method: 'GET',
            uri: 'git.master',
            version: 'HTTP/5.0',
            message: '-recursive'
        })).to.throw("Invalid request header: Invalid Version");
    });

    it("should return error message when incorrect message passed", function () {
        expect(validateRequest.bind(validateRequest,{
            method: 'GET',
            uri: 'git.master',
            version: 'HTTP/1.0',
            message: '<recursive&>'
        })).to.throw("Invalid request header: Invalid Message");
    });

    it("should return object when all passed parameters valid", function () {
        expect(JSON.stringify(validateRequest({
            method: 'GET',
            uri: 'svn.public.catalog',
            version: 'HTTP/1.1',
            message: ''
        }))).to.be.equal(JSON.stringify({
            method: 'GET',
            uri: 'svn.public.catalog',
            version: 'HTTP/1.1',
            message: ''
        }));
    });
});
