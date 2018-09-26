(function () {
  let module = angular.module('app.form.components', ['moment-picker', 'angular-sortable-view'])

    .component('fcInputText', {
      bindings: {
        fcId: '@',
        fcName: '@',
        fcLabel: '@',
        fcPlaceholder: '@',
      },
      template:
        `<div class="form-group">
                <label class="control-label">{{::$ctrl.fcLabel}}
                  <input 
                    type="text"
                    name="{{::$ctrl.fcName}}" 
                    id="{{::$ctrl.fcId}}" 
                    class="form-control"
                    placeholder="{{::$ctrl.fcPlaceholder || $ctrl.fcLabel}}">
                </label>
              </div>`
    })

    .component('fcInputRadio', {
      bindings: {
        fcId: '@',
        fcName: '@',
        fcTitle: '@',
        fcPlaceholders: '<',
        fcValues: '<',
      },
      template:
        `<div class="form-group">
          <h5 class="control-label">{{::$ctrl.fcTitle}}</h5>
          <div 
            class="radio" 
            ng-repeat="(key, item) in $ctrl.fcValues track by $index">
              <label>
                <input
                  id="{{$ctrl.fcId + key}}" 
                  name="{{::$ctrl.fcName}}"
                  value="{{::item}}" type="radio">
                <span class="radio_circle"></span>
                {{::($ctrl.fcPlaceholders[key] || item)}}
              </label>
          </div>
        </div>`
    })

    .component('fcInputSelect', {
      bindings: {
        fcId: '@',
        fcName: '@',
        fcLabel: '@',
        fcValues: '<',
      },
      template:
        `<div class="form-group">
              <label class="control-label">{{::$ctrl.fcLabel}}
                 <select
                  id="{{::$ctrl.fcId}}"
                  class="form-control"
                  name="{{::$ctrl.fcName}}"
                 >
                 <option ng-repeat="item in $ctrl.fcValues" value="{{::item}}">{{::item}}</option>
                 </select>
              </label>
          </div>`
    })

    .component('fcInputCheckbox', {
      bindings: {
        fcId: '@',
        fcName: '@',
        fcTitle: '@',
        fcPlaceholders: '<',
        fcValues: '<',
      },
      template:
        `<div class="form-group">
          <h5 class="control-label">{{::$ctrl.fcTitle}}</h5>
          <div 
            class="checkbox" 
            ng-repeat="(key, item) in $ctrl.fcValues track by $index">
              <label>
                <input name="{{::$ctrl.fcName}}"
                  value="{{::item}}" type="checkbox">
                <span class="checkbox_square"></span>
                {{::$ctrl.fcPlaceholders[key]}}
              </label>
          </div>
        </div>`,
    })

    .component('fcTextarea', {
      bindings: {
        fcId: '@',
        fcName: '@',
        fcLabel: '@',
        fcPlaceholder: '@',
      },
      template:
        `<div class="form-group">
                <label class="control-label">{{::$ctrl.fcLabel}}
                  <textarea 
                    class="form-control"
                    id="{{::$ctrl.fcId}}"
                    name="{{::$ctrl.fcName}}" 
                    placeholder="{{::$ctrl.fcPlaceholder || $ctrl.fcLabel}}"></textarea>
                </label>
              </div>`
    })

    .component('fcRange', {
      bindings: {
        fcId: '@',
        fcName: '@',
        fcTitle: '@',
        fcRangeValues: '<'
      },
      template:
        `
          <div class="form-group">
            <h5 class="control-label">{{::$ctrl.fcTitle}}</h5>
            <input id="{{::$ctrl.fcId}}" name="{{::$ctrl.fcName}}" type="hidden" value="{{fcRangeValues}}">
            <div sv-root sv-part="fcRangeValues">
                <div ng-repeat="item in fcRangeValues" sv-element>
                  <div>{{item}}</div>
                </div>
              </div>
          </div>
        `,
      controller: ['$scope', function ($scope) {
        let ctrl = this;
        ctrl.$onInit = function () {
          $scope.fcRangeValues = ctrl.fcRangeValues;
        };
      }]
    })

    .component('fcInputDate', {
      bindings: {
        fcId: '@',
        fcName: '@',
        fcLabel: '@',
        fcLocale: '@',
        fcFormat: '@',
      },
      template:
        `<div class="form-group">
            <div 
              class="control-label"
              locale="{{::$ctrl.fcLocale || 'uk'}}"
              moment-picker="fcInputDateValue"
              format="{{::$ctrl.fcFormat || 'DD/MM/YYYY'}}">
                {{::$ctrl.fcLabel}}
              <br>
              <button
                  ng-model-options="{ updateOn: 'blur' }">
                Вказати
              </button>
              <span>{{fcInputDateValue}}</span>
            </div>
            <input 
              id="{{::$ctrl.fcId}}" 
              type="hidden" 
              name="{{::$ctrl.fcName}}" 
              value="{{fcInputDateValue}}">
          </div>`,
      controller: ['$scope', function ($scope) {
      }]
    })

    .component('fcInputTextGroup', {
      bindings: {
        fcTitle: '@',
        fcIds: '<',
        fcNames: '<',
        fcLabels: '<',
        fcPlaceholders: '<',
      },
      template:
        `<div>
          <h5 class="control-label">{{::$ctrl.fcTitle}}</h5>
          <fc-input-text
            ng-repeat="(key,item) in $ctrl.fcNames"
            fc-name="{{::$ctrl.fcNames[key]}}"
            fc-label="{{::$ctrl.fcLabels[key]}}" 
            fc-placeholder="{{::$ctrl.fcPlaceholders[key]}}" 
          ></fc-input-text>
         </div>`
    })

    .component('fcDynamicInputTextGroup', {
      bindings: {
        fcTitle: '@',
        fcNames: '<',
        fcLabels: '<',
      },
      template:
        `<div
          ng-repeat="(key, item) in components track by $index">
          <fc-input-text-group
               fc-title="{{::$ctrl.fcTitle}} {{::key+1}}"
               fc-names="::$ctrl.fcNames"
               fc-labels="::$ctrl.fcLabels"
          ></fc-input-text-group>
          <div class="form-group">
          <button
            ng-if="$last"
            ng-click="$ctrl.addComponent(key)" 
           >додати
           </button>
           <button
            ng-if="$last && !$first"
            ng-click="$ctrl.removeComponent(key)" 
           >видалити
           </button>
         </div></div>`,
      controller: ['$scope', function ($scope) {
        let ctrl = this;
        $scope.components = [];
        $scope.components.push(1);

        ctrl.addComponent = function () {
          $scope.components.push(1);
        };

        ctrl.removeComponent = function () {
          $scope.components.pop();
        };
      }]
    })
  ;
})();