(function () {
  "use strict";

  var dataRoot = "https://raw.githubusercontent.com/CityofSantaMonica/WellbeingData";

  angular
    .module("wellbeing-findings", ["ngTable"])
    .config(function($sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
        "self",
        "https://cityofsantamonica.github.io/**",
        dataRoot + "/**"
      ]);
    })
    .component("wellbeingFindings", {
      bindings: {
        root: "@",
      },
      controller: ["filterFilter", "$http", "NgTableParams", wellbeingFindings],
      template: '<ng-include src="$ctrl.templateUrl"></ng-include>'
    });

    function wellbeingFindings ($filter, $http, NgTableParams) {
      var ctrl = this;

      ctrl.$onInit = function () {
        ctrl.templateUrl = ctrl.root + "wellbeing-findings.html";

        $http.get(ctrl.root + "filter.json", { cache: true }).then(function (results) {
          ctrl.filter = results.data
        });
        $http.get(dataRoot + "/master/Findings/data.json", { cache: true }).then(function (results) {
            ctrl.data = results.data;
            ctrl.reset();
        });
      };

      ctrl.change = function(property) {
        var value = ctrl.search[property];
        if (value !== true){
            delete ctrl.search[property];
        }

        var filterData = $filter(ctrl.data, ctrl.search);
        var filterTextData = ctrl.tableParams.filter();
        ctrl.tableParams = new NgTableParams(
          { sorting: { Finding: "asc" }, count: ctrl.data.length },
          { dataset: filterData, counts: []}
        );
        ctrl.tableParams.filter(filterTextData);
      };

      ctrl.reset = function() {
        ctrl.search = {$: ""};
        ctrl.tableParams = new NgTableParams(
          { sorting: { Finding: "asc" }, count: ctrl.data.length },
          { dataset: ctrl.data, counts: []}
        );
      }
    }
})();
