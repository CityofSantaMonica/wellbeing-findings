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
        ctrl.groups = [
          {
            label: "Zip",
            properties: [
              { property:"zip90401", label:"90401"},
              { property:"zip90402", label:"90402"},
              { property:"zip90403", label:"90403"},
              { property:"zip90404", label:"90404"},
              { property:"zip90405", label:"90405"}
            ]
          },
          {
            label: "Age",
            properties: [
              { property:"Children", label:"Children"},
              { property:"YoungerAge", label:"Younger Age"},
              { property:"MiddleAge", label:"Middle Age"},
              { property:"OlderAge", label:"Older Age"}
            ]
          },
          {
            label: "Race",
            properties: [
              { property:"AfricanAmerican", label:"African American"},
              { property:"Asian", label:"Asian"},
              { property:"Latino", label:"Latino"}
            ]
          },
          {
            label: "Gender",
            properties: [
              { property:"Female", label:"Female"},
              { property:"Male", label:"Male"}
            ]
          }
        ];

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
