function hasId(array, id, key) {
    key = key || 'id';
    return array.some(function(itm) {
        return itm[key] === id;
    });
}

function parseDate(sdate) {
    var months = ['jan.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'jui.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    var pdate = /(\d{2})\/(\d{2})\/(\d{2})/g.exec(sdate);
    return parseInt(pdate[2]) + ' ' + months[parseInt(pdate[1]) - 1] + ' 20' + pdate[3];
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

var ResultFunction = function(fct) {
    var data = 0;
    return function(item, hours) {
        if (arguments.length > 0) {
            data = fct(item, hours);
            return data;
        } else {
            return data;
        }
    };
};

var DataRenderer = function() {
    var items = [];
    var self = {};

    self.addItem = function(item) {
        items.push(item);
    };

    self.canRender = function(reportlist) {
        var allpresent = true;
        var allcats = items.map(function(item) {
            return [item.title + ' - ' + item.subtitle,
                item.reqclasses.some(function(cls) {
                    if (reportlist.indexOf(cls) >= 0) {
                        return true;
                    } else {
                        allpresent = false;
                        return false;
                    }
                })
            ];
        });
        return {'canrender': allpresent, 'cats': allcats}
    };

    self.renderToContext = function(data) {
        var tops = items.map(function(item) {
            var curTop = {'name': 'Aucun Associé', 'id': '0000000', 'result': 0};
            data.forEach(function(assoc) {
                if (assoc.hours <= 0) {return}
                var res = item.result(assoc.results, assoc.hours);
                if (res > curTop.result) {
                    curTop = {'name': assoc.name, 'id': assoc.id, 'result': res};
                }
            });
            return curTop;
        });

        var ctx = {page: []};
        data.forEach(function(assoc) {
            if (assoc.hours <= 0) {return}
            var page = {};
            page.assocname = assoc.name;
            page.assocno = assoc.id;
            page.datefrom = assoc.datefrom;
            page.dateto = assoc.dateto;
            page.block = items.map(function(item, idx) {
                var block = {};
                var result = item.result(assoc.results, assoc.hours);
                block.posw = item.position[0];
                block.posh = item.position[1];
                block.bgstatus = result >= item.objective ? "success" : (result + result * 0.1) >= item.objective ? "warning" : "danger";
                block.mvpstatus = assoc.id === tops[idx].id ? "mvp" : "nomvp";
                if (result < item.objective) {
                    block.progress = Math.floor(result / item.objective * 100);
                    block.objective = "Objectif: " + item.objective.toFixed(item.unitdecimals);
                } else if (result < tops[idx].result) {
                    block.progress = Math.floor(result / tops[idx].result * 100);
                    block.objective = "Meilleur Score: " + tops[idx].result.toFixed(item.unitdecimals);
                } else {
                    block.progress = 100;
                    block.objective = "Meilleur Score: " + tops[idx].result.toFixed(item.unitdecimals);
                }
                block.result = result.toFixed(item.unitdecimals);
                block.unit = item.unit;
                block.title = item.title;
                block.subtitle = item.subtitle;
                block.cardtext = item.cardtext(assoc.results, assoc.hours);
                return block;
            });
            ctx.page.push(page);
        });
        return ctx;
    };

    return self;
};

// Add data and objectives

var dr = DataRenderer();

dr.addItem({
    'title': 'Class Attach',
    'subtitle': 'Ordinateurs Mac',
    'position': [1, 1],
    'reqclasses': ['c0'],
    'result': new ResultFunction(function (item) {
        return item['c0']['data'];
    }),
    'cardtext': new ResultFunction(function (item) {
        return 'Vous êtes ' + item['c0']['rank'] + (item['c0']['rank'] === 1 ? 'er dans l\'équipe' : 'e dans l\'équipe');
    }),
    'unitdecimals': 2,
    'unit': 'unités',
    'objective': 4.00
});

dr.addItem({
    'title': 'Class Attach',
    'subtitle': 'Ordinateurs',
    'position': [2, 1],
    'reqclasses': ['c1'],
    'result': new ResultFunction(function (item) {
        return item['c1']['data'];
    }),
    'cardtext': new ResultFunction(function (item) {
        return 'Vous êtes ' + item['c1']['rank'] + (item['c1']['rank'] === 1 ? 'er dans l\'équipe' : 'e dans l\'équipe');
    }),
    'unitdecimals': 2,
    'unit': 'unités',
    'objective': 4.00
});

dr.addItem({
    'title': 'Class Attach',
    'subtitle': 'Imprimantes',
    'position': [3, 1],
    'reqclasses': ['c2'],
    'result': new ResultFunction(function (item) {
        return item['c2']['data'];
    }),
    'cardtext': new ResultFunction(function (item) {
        return 'Vous êtes ' + item['c2']['rank'] + (item['c2']['rank'] === 1 ? 'er dans l\'équipe' : 'e dans l\'équipe');
    }),
    'unitdecimals': 2,
    'unit': 'unités',
    'objective': 3.00
});

dr.addItem({
    'title': 'Class Attach',
    'subtitle': 'Tablettes',
    'position': [1, 2],
    'reqclasses': ['c3'],
    'result': new ResultFunction(function (item) {
        return item['c3']['data'];
    }),
    'cardtext': new ResultFunction(function (item) {
        return 'Vous êtes ' + item['c3']['rank'] + (item['c3']['rank'] === 1 ? 'er dans l\'équipe' : 'e dans l\'équipe');
    }),
    'unitdecimals': 2,
    'unit': 'unités',
    'objective': 3.50
});

dr.addItem({
    'title': 'Class Attach',
    'subtitle': 'Smartphones',
    'position': [2, 2],
    'reqclasses': ['c4'],
    'result': new ResultFunction(function (item) {
        return item['c4']['data'];
    }),
    'cardtext': new ResultFunction(function (item) {
        return 'Vous êtes ' + item['c4']['rank'] + (item['c4']['rank'] === 1 ? 'er dans l\'équipe' : 'e dans l\'équipe');
    }),
    'unitdecimals': 2,
    'unit': 'unités',
    'objective': 5.00
});

dr.addItem({
    'title': 'Plans de protection',
    'subtitle': 'Ventes ($/heure)',
    'position': [3, 2],
    'reqclasses': ['888aa'],
    'result': new ResultFunction(function (item, hours) {
        return item['888aa']['sales'] / hours;
    }),
    'cardtext': new ResultFunction(function (item) {
        return 'Total vendu: ' + item['888aa']['sales'].toFixed(2) + ' $';
    }),
    'unitdecimals': 2,
    'unit': '$ / heure',
    'objective': 15.00
});

dr.addItem({
    'title': 'Plans de protection',
    'subtitle': 'Efficacité (qté/heure)',
    'position': [1, 3],
    'reqclasses': ['888aa'],
    'result': new ResultFunction(function (item, hours) {
        return item['888aa']['units'] / hours * 100;
    }),
    'cardtext': new ResultFunction(function (item) {
        return 'Qté de plans vendus: ' + item['888aa']['units'].toFixed(0)
    }),
    'unitdecimals': 0,
    'unit': '% d\'efficacité',
    'objective': 25
});

dr.addItem({
    'title': 'Techno-Centre',
    'subtitle': 'Ventes ($/heure)',
    'position': [2, 3],
    'reqclasses': ['887aa'],
    'result': new ResultFunction(function (item, hours) {
        return item['887aa']['sales'] / hours;
    }),
    'cardtext': new ResultFunction(function (item) {
        return 'Total vendu: ' + item['887aa']['sales'].toFixed(2) + ' $';
    }),
    'unitdecimals': 2,
    'unit': '$ / heure',
    'objective': 10.00
});

dr.addItem({
    'title': 'Mix Macintosh',
    'subtitle': 'Efficacité (%)',
    'position': [3, 3],
    'reqclasses': ['330304a', '331345a', '330304a', '331345a', '331314a', '330346a', '331355a', '331315a', '330302a',
        '330351a', '331316a', '330303a', '331352a'],
    'result': new ResultFunction(function (item) {
        return ((item['330304a']['units']+item['331345a']['units'])/(item['330304a']['units']+item['331345a']['units']+
            item['331314a']['units']+item['330346a']['units']+item['331355a']['units']+item['331315a']['units']+
            item['330302a']['units']+item['330351a']['units']+item['331316a']['units']+item['330303a']['units']+
            item['331352a']['units'])*100) || 0;
    }),
    'cardtext': new ResultFunction(function (item) {
        return 'Macs vendus: ' + (item['330304a']['units']+item['331345a']['units']) + ' / PCs vendus: ' +
            (item['331314a']['units']+item['330346a']['units']+item['331355a']['units']+item['331315a']['units']+
            item['330302a']['units']+item['330351a']['units']+item['331316a']['units']+item['330303a']['units']+
            item['331352a']['units']);
    }),
    'unitdecimals': 2,
    'unit': '% d\'efficacité',
    'objective': 15.00
});


var Reportdata = function () {
    // Private
    var self = {};

    // Public
    self.error = m.prop("");
    self.reportlist = m.prop([]);
    self.reportdata = m.prop([]);
    self.reportcheck = m.prop({});
    self.loadReport = function(files) {
        try {
            var f = files[0];
            var reader = new FileReader();
            self.reportlist([]);
            self.reportdata([]);
            self.reportcheck({});
            self.error("");
            reader.onload = function (e) {
                m.startComputation();
                try {
                    var j = JSON.parse(reader.result);
                    var assocs = [];
                    var reports = [];
                    j.reportlist.forEach(function (rpt) {
                        reports.push(rpt.slice(0, -12));
                    });
                    if (hasId(j['class'], 'Succ', 'level')) {
                        reports.push.apply(reports, ['c0', 'c1', 'c2', 'c3', 'c4']);
                    }
                    j.reports.forEach(function (rpt) {
                        for (var idx in rpt.assoc) {
                            if (rpt.assoc.hasOwnProperty(idx)) {
                                if (!hasId(assocs, idx)) {
                                    assocs.push({
                                        'id': idx,
                                        'name': rpt.assoc[idx]['name'].trim(),
                                        'datefrom': parseDate(rpt.datefrom),
                                        'dateto': parseDate(rpt.dateto),
                                        'hours': 0,
                                        'results': {}
                                    })
                                }
                            }
                        }
                    });
                    assocs.forEach(function (assoc) {
                        j.reports.forEach(function (rpt) {
                            if (rpt.assoc.hasOwnProperty(assoc.id)) {
                                assoc.results[rpt.header] = {
                                    'units': rpt.assoc[assoc.id]['units'],
                                    'sales': rpt.assoc[assoc.id]['sales'], 'vmt': rpt.assoc[assoc.id]['vmt'],
                                    'trans': rpt.assoc[assoc.id]['trans']
                                };
                            } else {
                                assoc.results[rpt.header] = {'units': 0, 'sales': 0, 'vmt': 0, 'trans': 0};
                            }
                        });
                        j['class'].forEach(function (cls) {
                            if (cls.level == 'Succ') {
                                if (!cls.assoc.some(function (ass) {
                                    if (ass['assno'] === assoc.id) {
                                        ass['cats'].forEach(function (data, idx) {
                                            assoc.results['c' + idx] = {'data': data, 'rank': ass['ranks'][0]};
                                        });
                                        return true;
                                    }
                                })) {
                                    for (var idx=0; idx < 5; idx++) {
                                        assoc.results['c' + idx] = {'data': 0, 'rank': 0};
                                    }
                                }
                            }
                        });
                    });
                    self.reportlist(reports);
                    self.reportdata(assocs);
                    self.reportcheck(dr.canRender(reports));
                } catch(err) {
                    self.error('Une erreur est survenue. Assurez-vous d\'avoir chargé le bon fichier! (' + err.message + ')');
                } finally {
                    m.endComputation();
                }
            };
            reader.readAsText(f);
        } catch(err) {
            self.error('Une erreur est survenue. Assurez-vous d\'avoir chargé le bon fichier! (' + err.message + ')');
        }
    };

    return self;
};

var Reportapp = {
    controller: function(data) {
        // Private
        var self = {};

        // Public
        self.data = data;

        self.getsetHours = function(item) {
            return function(hours) {
                if (arguments.length > 0) {
                    item.hours = parseInt(hours);
                }
                return item.hours.toString();
            }
        };

        self.generateReport = function() {
            var ctx = dr.renderToContext(data.reportdata());
            var tmpl = Handlebars.templates.report(ctx);
            var win = window.open();
            win.document.write(tmpl);
        };

        return self;
    },

    view: function(ctrl) {
        return m("div.container", [
            m("div.row.pt3",
                m("div.panel.panel-default", [
                    m("div.panel-heading.app-title", "Cinkaset par J-F Desrochers"),
                    m("div.panel-body.text-center", [
                        ctrl.data.error().length ? m("div.alert.alert-danger", ctrl.data.error()) : "",
                        m("span", {className: "btn btn-primary btn-lg btn-file"}, [
                            m("span#browsecaption", "Charger un daily.report..."),
                            m("input", {type: "file", onchange: m.withAttr("files", ctrl.data.loadReport)})
                        ])
                    ])
                ])
            ),
            ctrl.data.reportdata().length ? m("div.row",
                m(ctrl.data.reportcheck().canrender ? "div.panel.panel-success" : "div.panel.panel-danger", [
                    m("div.panel-heading", ctrl.data.reportcheck().canrender ? "Vous avez toutes les données nécessaires pour générer les rapports!" : "Il manque des données pour continuer, SVP voir ci-dessous :"),
                    m("div.panel-body", [
                        m("ul.checklist", [ctrl.data.reportcheck().cats.map(function(item) {
                            return m(item[1] ? "li.text-success" : "li.text-danger", item[0]);
                        })])
                    ])
                ])
            ) : "",
            (ctrl.data.reportdata().length && ctrl.data.reportcheck().canrender) ? m("div.row",
                m("div.panel.panel-primary", [
                    m("div.panel-heading", "Veuillez entrer les heures des associés ci-dessous :"),
                    m("div.panel-body", [
                        m("ul.list-group",  [
                            m("div.lead", "Note: Aucun rapport ne sera généré pour les associés avec 0 heures."),
                            ctrl.data.reportdata().map(function(item) {
                                return m("li.list-group-item.hoursitem", m("div.row", [
                                    m("div.col-sm-3", m("em", item.id)),
                                    m("div.col-sm-4", m("strong", item.name)),
                                    m("div.col-sm-5", [
                                        m("input.form-control.pull-right", {onchange: m.withAttr("value", ctrl.getsetHours(item)), value: ctrl.getsetHours(item)()}),
                                        m("div.pull-right.hlabel", "Heures : ")
                                    ])
                                ]))
                            })
                        ])
                    ])
                ])
            ) : "",
            (ctrl.data.reportdata().length && ctrl.data.reportcheck().canrender) ? m("div.row",
                m("div.panel.panel-default", [
                    m("div.panel-heading", "Une fois prêt, cliquez sur le bouton ci-dessous pour générer le rapport :"),
                    m("div.panel-body.text-center", [
                        m("button.btn.btn-primary.btn-lg", {onclick: ctrl.generateReport}, "Générer le rapport...")
                    ])
                ])
            ) : ""
        ]);
    }
};