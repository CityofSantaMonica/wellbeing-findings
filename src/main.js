(function () {
  "use strict";

  angular
    .module("wellbeing-findings", [])
    .config(function($sceDelegateProvider){
      $sceDelegateProvider.resourceUrlWhitelist([
        "self",
        "https://cityofsantamonica.github.io/**"
      ]);
    })
    .component("wellbeingFindings", {
      bindings: {
        root: "@",
      },
      controller: ["$http", wellbeingFindings],
      template: '<ng-include src="$ctrl.templateUrl"></ng-include>'
    });

    function wellbeingFindings ($http) {
      var ctrl = this;

      ctrl.$onInit = function () {
        ctrl.reset();
        ctrl.templateUrl = ctrl.root + "wellbeing-findings.html";
        $http.get(ctrl.root + "filter.json", { cache: true }).then(function (results) {
          ctrl.filter = results.data
        });
        $http.get(ctrl.root + "data.json", { cache: true }).then(function (results) {
            ctrl.data = results.data;
        });
      };

      ctrl.change = function(property) {
        var value = ctrl.search[property];
        if(value !== true){
            delete ctrl.search[property];
        }
      };

      ctrl.reset = function() {
        ctrl.search = {$: ""};
      }
    }
})();
