let SoftUniFy = require("./softUniFy");
let expect = require("chai").expect;

describe("SoftUniFy tests", () => {
    let softunify;
    beforeEach(() => {
        softunify = new SoftUniFy();
    });
    describe("Initialization tests", () => {
        it("should be instance ot SoftUniFy class", () => {
            expect(softunify).to.be.instanceOf(SoftUniFy);
            expect(typeof softunify.allSongs).to.be.equal("object");
        });
    });

    describe("downloadSong tests", () => {
        it("when artist not present, should add an empty artist", () => {
            softunify.downloadSong("pesho", "firstSong", "Song Lyrics");
            expect(softunify.allSongs["pesho"].rate).to.be.equal(0);
            expect(softunify.allSongs["pesho"].votes).to.be.equal(0);
            expect(softunify.allSongs["pesho"].songs[0]).to.be.equal("firstSong - Song Lyrics");
        });
        it("when artist is present, should add song to artist", () => {
            softunify.downloadSong("pesho", "firstSong", "Song Lyrics");
            softunify.downloadSong("pesho", "secondSong", "Second Song Lyrics");
            expect(softunify.allSongs["pesho"].songs[0]).to.be.equal("firstSong - Song Lyrics");
            expect(softunify.allSongs["pesho"].songs[1]).to.be.equal("secondSong - Second Song Lyrics");
            expect(softunify.allSongs["pesho"].songs.length).to.be.equal(2);
        });
        it("when chained, should not throw error", () => {
            expect(() => softunify.downloadSong("pesho", "firstSong", "Song Lyrics").downloadSong("pesho", "secondSong", "Second Song Lyrics")).to.not.throw(Error);
        });
    });
    describe("playSong tests", () => {
        it("when allSongs is empty, should return error message", () => {
            expect(softunify.playSong("firstSong")).to.be.equal("You have not downloaded a firstSong song yet. Use SoftUniFy's function downloadSong() to change that!");
        });
        it("when allSongs not empty, but searched song not downloaded, should return error message", () => {
            softunify.downloadSong("pesho", "notFirstSong", "Song Lyrics").downloadSong("pesho", "alsoNotFirstSong", "Song Lyrics");
            expect(softunify.playSong("firstSong")).to.be.equal("You have not downloaded a firstSong song yet. Use SoftUniFy's function downloadSong() to change that!");
        });
        it("when allSongs not empty and searched song already downloaded, should return error message", () => {
            softunify.downloadSong("pesho", "firstSong", "Song Lyrics");
            let result = softunify.playSong("firstSong").split(/[\n]/g);
            expect(result[0]).to.be.equal("pesho:");
            expect(result[1]).to.be.equal("firstSong - Song Lyrics");
        });
    });
    describe("songsList tests", () => {
        it("when list empty, should return an error message", () => {
            expect(softunify.songsList).to.be.equal("Your song list is empty");
        });
        it("when one song downloaded, should return that song", () => {
            softunify.downloadSong("pesho", "firstSong", "Song Lyrics");
            expect(softunify.songsList).to.be.equal("firstSong - Song Lyrics");
        });
        it("when multiple songs downloaded, should return a string with all songs", () => {
            softunify.downloadSong("pesho", "firstSong", "Song Lyrics").downloadSong("pesho", "secondSong", "Second Song Lyrics");
            let result = softunify.songsList.split(/[\n]/g);
            expect(result[0]).to.be.equal("firstSong - Song Lyrics");
            expect(result[1]).to.be.equal("secondSong - Second Song Lyrics");
        });
    });
    describe("rateArtist tests", () => {
        it("when artist not added, should return error message", () => {
            expect(softunify.rateArtist("gosho")).to.be.equal("The gosho is not on your artist list.");
        });
        it("when artist not added and rating there, should return error message", () => {
            softunify.downloadSong("pesho", "firstSong", "Song Lyrics");
            expect(softunify.rateArtist("gosho", 5)).to.be.equal("The gosho is not on your artist list.");
        });
        it("when artist added, should return the rating", () => {
            softunify.downloadSong("pesho", "firstSong", "Song Lyrics");
            expect(softunify.rateArtist("pesho")).to.be.equal(0);
        });
        it("when artist added and multiple ratings added, should return correct rating", () => {
            softunify.downloadSong("pesho", "firstSong", "Song Lyrics");
            softunify.rateArtist("pesho", 5);
            softunify.rateArtist("pesho", 7);
            softunify.rateArtist("pesho", 9);
            expect(softunify.allSongs["pesho"]["rate"]).to.be.equal(21);
            expect(softunify.allSongs["pesho"]["votes"]).to.be.equal(3);
            expect(softunify.rateArtist("pesho")).to.be.equal(7);
        });
    });
});
