(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['report'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"reportpage\">\n            <div class=\"reporttitle\">"
    + alias4(((helper = (helper = helpers.assocname || (depth0 != null ? depth0.assocname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"assocname","hash":{},"data":data}) : helper)))
    + "</div>\n            <div class=\"reportsubtitle\">"
    + alias4(((helper = (helper = helpers.assocno || (depth0 != null ? depth0.assocno : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"assocno","hash":{},"data":data}) : helper)))
    + "</div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.block : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            <img src=\"img/beglogo.png\" class=\"footer-img\">\n            <div class=\"footer-text\">Rapport de performance de l'associé</div>\n            <div class=\"footer-dates\">du "
    + alias4(((helper = (helper = helpers.datefrom || (depth0 != null ? depth0.datefrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"datefrom","hash":{},"data":data}) : helper)))
    + "<br>au "
    + alias4(((helper = (helper = helpers.dateto || (depth0 != null ? depth0.dateto : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dateto","hash":{},"data":data}) : helper)))
    + "</div>\n        </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div class=\"card shadow w"
    + alias4(((helper = (helper = helpers.posw || (depth0 != null ? depth0.posw : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"posw","hash":{},"data":data}) : helper)))
    + " h"
    + alias4(((helper = (helper = helpers.posh || (depth0 != null ? depth0.posh : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"posh","hash":{},"data":data}) : helper)))
    + " bg-"
    + alias4(((helper = (helper = helpers.bgstatus || (depth0 != null ? depth0.bgstatus : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bgstatus","hash":{},"data":data}) : helper)))
    + "\">\n                <div class=\"card-inside\">\n                    <div class=\""
    + alias4(((helper = (helper = helpers.mvpstatus || (depth0 != null ? depth0.mvpstatus : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mvpstatus","hash":{},"data":data}) : helper)))
    + "\"><i class=\"fa fa-trophy\"></i>&nbsp; Champion de cette catégorie !</div>\n                    <div class=\"chart-bg\">\n                        <div class=\"bg-progress\" style=\"width: "
    + alias4(((helper = (helper = helpers.progress || (depth0 != null ? depth0.progress : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"progress","hash":{},"data":data}) : helper)))
    + "%\"></div>\n                    </div>\n                    <div class=\"card-chart\">\n                        <div class=\"card-score\">"
    + alias4(((helper = (helper = helpers.result || (depth0 != null ? depth0.result : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"result","hash":{},"data":data}) : helper)))
    + "</div>\n                        <div class=\"card-unit\">"
    + alias4(((helper = (helper = helpers.unit || (depth0 != null ? depth0.unit : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"unit","hash":{},"data":data}) : helper)))
    + "</div>\n                        <div class=\"card-score-subtext\">"
    + alias4(((helper = (helper = helpers.objective || (depth0 != null ? depth0.objective : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"objective","hash":{},"data":data}) : helper)))
    + "</div>\n                    </div>\n                    <div class=\"card-title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n                    <div class=\"card-subtitle\">"
    + alias4(((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subtitle","hash":{},"data":data}) : helper)))
    + "</div>\n                    <div class=\"card-text\">"
    + alias4(((helper = (helper = helpers.cardtext || (depth0 != null ? depth0.cardtext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cardtext","hash":{},"data":data}) : helper)))
    + "</div>\n                </div>\n            </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!DOCTYPE html>\n<html class=\"\">\n    <head>\n        <meta charset=\"utf-8\">\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        <title>Cinkaset par Jean-François Desrochers</title>\n        <link href=\"css/vendor/fonts.css\" rel=\"stylesheet\" type=\"text/css\">\n        <link href=\"css/cinkasetreports.css\" rel=\"stylesheet\">\n        <style type=\"text/css\">\n\n        </style>\n    </head>\n    <body>\n        <input type=\"button\" class=\"printbutton\" onclick=\"window.print()\" value=\"Imprimer...\">\n        <input type=\"button\" class=\"printbutton\" onclick=\"window.close()\" value=\"Fermer la fenêtre\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.page : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </body>\n</html>";
},"useData":true});
})();