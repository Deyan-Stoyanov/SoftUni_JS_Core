function bugTracker() {
    let o = (() => {
        let id = 0;
        let bugs = [];
        let element;
        var commands = {
            report: function (author, description, reproducible, severity) {
                let obj = {
                    id: id,
                    author,
                    description,
                    reproducible,
                    severity,
                    status: "Open"
                };
                bugs.push(obj);
                if (element) {
                    this.fill();
                }
                id++;
            },
            setStatus: function (id, status) {
                bugs.filter(x => x.id == id).forEach(x => x.status = status);
                if (element) {
                    this.fill();
                }
            },
            remove: function (id) {
                bugs = bugs.filter(x => x.id != id);
                if (element) {
                    this.fill();
                }
            },
            sort: function (sort) {
                if (typeof bugs[0][sort] == "string") {
                    bugs = bugs.sort((a, b) => a[sort].localeCompare(b[sort]));
                } else {
                    bugs = bugs.sort((a, b) => a[sort] - b[sort]);
                }
                if (element) {
                    this.fill();
                }
            },
            output: function (el) {
                element = el;
            },
            fill: function () {
                $(element).html("");
                for (let b of bugs) {
                    $(element).append($(`<div id="report_${b.id}" class="report">
                    <div class="body">
                      <p>${b.description}</p>
                    </div>
                    <div class="title">
                      <span class="author">Submitted by: ${b.author}</span>
                      <span class="status">${b.status} | ${b.severity}</span>
                    </div>
                  </div>
                  `));
                }
            }
        };
        return commands;
    })();
    return o;
}
