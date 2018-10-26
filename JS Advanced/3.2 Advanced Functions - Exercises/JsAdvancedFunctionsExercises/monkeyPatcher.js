function solution(command) {
    switch (command) {
        case "upvote":
            this.upvotes = this.upvotes + 1;
            break;
        case "downvote":
        this.downvotes = this.downvotes + 1;
            break;
        case "score":
            let rating = "new";
            if(this.upvotes + this.downvotes < 10){
                rating = "new";
            }else if (this.upvotes / (this.upvotes + this.downvotes) > 0.66) {
                rating = "hot";
            } else if (this.upvotes < this.downvotes) {
                rating = "unpopular";
            } else if (this.upvotes > 100 || this.downvotes > 100) {
                rating = "controversial";
            }
            let tempUpvotes = this.upvotes + this.downvotes > 50 ? this.upvotes + Math.ceil(Math.max(this.upvotes, this.downvotes) * 0.25) : this.upvotes;
            let tempDownvotes = this.upvotes + this.downvotes > 50 ? this.downvotes + Math.ceil(Math.max(this.upvotes, this.downvotes) * 0.25) : this.downvotes;
            return  this.upvotes + this.downvotes > 50 ? [tempUpvotes, tempDownvotes, tempUpvotes - tempDownvotes, rating] :  [this.upvotes, this.downvotes, this.upvotes - this.downvotes, rating];
        default:
            break;
    }
}
