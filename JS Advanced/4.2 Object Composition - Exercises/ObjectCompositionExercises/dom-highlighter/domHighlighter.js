function markDeepestNode(identifier) {
    let element = $(identifier);
    let children = $(element).find('*');
    let lowestLevel = 0;
    let deepest;
    let parents;
    for (let c of children) {
        let depth = $(c).parents().length;
        if (depth > lowestLevel) {
            deepest = c;
            lowestLevel = depth;
        }
    }
    $(deepest).addClass("highlight");
    parents = $(deepest).parentsUntil(identifier);
    for (let p of parents) {
        $(p).addClass("highlight");
    }
}
