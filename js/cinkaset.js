function hasId(array, id, key) {
    key = key || 'id';
    return array.some(function(itm) {
        return itm[key] === id;
    });
}

function showLoading(show, title, message) {
    if (show) {
        document.getElementById("loadtitle").textContent = title;
        document.getElementById("loadmessage").textContent = message;
        document.getElementById("loadscreen").classList.add("show");
    } else {
        document.getElementById("loadscreen").classList.remove("show");
    }
}

function loadingDone(title, message, reload) {
    document.getElementById("loadtitle").textContent = title;
    document.getElementById("loadmessage").textContent = message;
    var loadscreen = document.getElementById("loadscreen");
    loadscreen.classList.add("done");
    reload = reload || false;
    setTimeout(function() {
        loadscreen.classList.remove("show");
        loadscreen.classList.remove("done");
        if (reload) m.redraw();
    }, 2000);
}

var Reportdata = function () {
    // Private
    var self = {};

    // Public
    self.error = m.prop("");
    self.report = {};
    self.loadReport = function(files) {
        var f = files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var j = JSON.parse(reader.result);
            var assocs = [];
            var reports = [];
            j.reportlist.forEach(function(rpt) {
                reports.push(rpt.slice(0, -12));
            });
            if (hasId(j['class'], 'Succ', 'level')) {
                reports.push.apply(reports, ['c0', 'c1', 'c2', 'c3', 'c4']);
            }
            j.reports.forEach(function(rpt) {
                for (var idx in rpt.assoc) {
                    if (rpt.assoc.hasOwnProperty(idx)) {
                        if (!hasId(assocs, idx)) {
                            assocs.push({'id': idx, 'name': rpt.assoc[idx]['name'].trim(), 'results': []})
                        }
                    }
                }
            });
            assocs.forEach(function(assoc) {
                j.reports.forEach(function(rpt){
                    if (rpt.assoc.hasOwnProperty(assoc.id)) {
                        assoc.results.push({'id': rpt.header, 'units': rpt.assoc[assoc.id]['units'],
                            'sales': rpt.assoc[assoc.id]['sales'], 'vmt': rpt.assoc[assoc.id]['vmt'],
                            'trans': rpt.assoc[assoc.id]['trans']});
                    } else {
                        assoc.results.push({'id': rpt.header, 'units': 0, 'sales': 0, 'vmt': 0, 'trans': 0});
                    }
                });
                j['class'].forEach(function(cls){
                    if (cls.level == 'Succ') {
                        cls.assoc.forEach(function(ass) {
                            if (ass['assno'] === assoc.id) {
                                ass['cats'].forEach(function(data, idx) {
                                    assoc.results.push({'id': 'c' + idx, 'data': data});
                                });
                            }
                        });
                    }
                });
            });
            console.log(reports);
            console.log(assocs);
        };
        reader.readAsText(f);
    };

    return self;
};

var Reportapp = {
    controller: function(data) {
        // Private
        var self = {};

        // Public
        self.data = data;

        return self;
    },

    view: function(ctrl) {
        return m("div.container", [
            m("div.row.pt3",
                m("div.panel.panel-default", [
                    m("div.panel-heading.app-title", "Cinkaset"),
                    m("div.panel-body.text-center", [
                        m("span", {className: "btn btn-primary btn-lg btn-file"}, [
                            m("span#browsecaption", "Charger un daily.report..."),
                            m("input", {type: "file", onchange: m.withAttr("files", ctrl.data.loadReport)})
                        ])
                    ])
                ])
            )
        ]);
    }
};