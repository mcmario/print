app
  .component('currEmployeeComparisonVariant', {
    bindings: {
      sqlVariant: '=',
      oneSVariant: '=',
      adVariant: '=',
      comparisonObject: '=',
    },
    templateUrl: 'static/templates/component.curr.employee.comparison.variant.html',
    controller: 'currEmployeeComparisonVariantCtrl'
  })
;