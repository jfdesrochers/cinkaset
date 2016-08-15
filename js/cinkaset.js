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