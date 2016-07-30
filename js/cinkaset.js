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

var Dashdata = function () {
    // Private
    var self = {};

    // Public
    self.error = m.prop("");

    return self;
};

var Dashapp = {
    controller: function(data) {
        // Private
        var self = {};

        // Public
        self.data = data;

        return self;
    },

    view: function(ctrl) {
        var notLoaded = ctrl.frontpage();
        return m("div.container-fluid", [

        ]);
    }
};