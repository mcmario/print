(function () {
  angular.module('form-builder.components', ['builder', 'validator.rules'])
    .config(['$builderProvider', function ($builderProvider) {
        $builderProvider.registerComponent('title', {
          group: 'Default',
          label: 'Заголовок',
          description: '',
          placeholder: '',
          required: false,
          validationOptions: [
            {
              label: 'none',
              rule: '/.*/'
            }, {
              label: 'number',
              rule: '[number]'
            }, {
              label: 'email',
              rule: '[email]'
            }, {
              label: 'url',
              rule: '[url]'
            }
          ],
          template:
            `
                    <h1 class="testing_title">{{label}}</h1>
                  `,
          popoverTemplate: `<form>
                
                <div class="form-group">
                    <label class='control-label'>Заголовок</label>
                    <input type='text' ng-model="label" class='form-control'/>
                </div>
            
                <hr/>
                <div class='form-group'>
                    <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save'/>
                    <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='Cancel'/>
                    <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
                </div>
            </form>
          `
        });
        $builderProvider.registerComponent('textInput', {
          group: 'Default',
          label: 'Text Input',
          description: 'description',
          placeholder: 'placeholder',
          required: false,
          validationOptions: [
            {
              label: 'none',
              rule: '/.*/'
            }, {
              label: 'number',
              rule: '[number]'
            }, {
              label: 'email',
              rule: '[email]'
            }, {
              label: 'url',
              rule: '[url]'
            }
          ],
          template:
            `
            <div class="form-group">
                <label for="{{formName+index}}" class="control-label" ng-class="{'fb-required':required}">{{label}}</label>
                    <input type="text" ng-model="inputText" validator-required="{{required}}" validator-group="{{formName}}" 
                    id="{{formName+index}}" class="form-control" placeholder="{{placeholder}}"/>
                    <p class='help-block'>{{description}}</p>
            </div>
          `,
          popoverTemplate: `<form>
    <div class="form-group">
        <label class='control-label'>Label</label>
        <input type='text' ng-model="label" validator="[required]" class='form-control'/>
    </div>
    <div class="form-group">
        <label class='control-label'>Description</label>
        <input type='text' ng-model="description" class='form-control'/>
    </div>
    <div class="form-group">
        <label class='control-label'>Placeholder</label>
        <input type='text' ng-model="placeholder" class='form-control'/>
    </div>
    <div class="checkbox">
        <label>
            <input type='checkbox' ng-model="required" />
            Required</label>
    </div>
    <div class="form-group" ng-if="validationOptions.length > 0">
        <label class='control-label'>Validation</label>
        <select ng-model="$parent.validation" class='form-control' 
        ng-options="option.rule as option.label for option in validationOptions"></select>
    </div>

    <hr/>
    <div class='form-group'>
        <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save'/>
        <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='Cancel'/>
        <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
    </div>
</form>`
        });
        $builderProvider.registerComponent('textArea', {
          group: 'Default',
          label: 'Text Area',
          description: 'description',
          placeholder: 'placeholder',
          required: false,
          template: `<div class="form-group">
    <label for="{{formName+index}}" class="control-label" ng-class="{'fb-required':required}">{{label}}</label>
        <textarea type="text" ng-model="inputText" validator-required="{{required}}" validator-group="{{formName}}" id="{{formName+index}}" class="form-control" rows='6' placeholder="{{placeholder}}"/>
        <p class='help-block'>{{description}}</p>
</div>`,
          popoverTemplate: `<form>
    <div class="form-group">
        <label class='control-label'>Label</label>
        <input type='text' ng-model="label" validator="[required]" class='form-control'/>
    </div>
    <div class="form-group">
        <label class='control-label'>Description</label>
        <input type='text' ng-model="description" class='form-control'/>
    </div>
    <div class="form-group">
        <label class='control-label'>Placeholder</label>
        <input type='text' ng-model="placeholder" class='form-control'/>
    </div>
    <div class="checkbox">
        <label>
            <input type='checkbox' ng-model="required" />
            Required</label>
    </div>

    <hr/>
    <div class='form-group'>
        <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save'/>
        <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='Cancel'/>
        <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
    </div>
</form>`
        });
        $builderProvider.registerComponent('checkbox', {
          group: 'Default',
          label: 'Checkbox',
          description: 'description',
          placeholder: 'placeholder',
          required: false,
          options: ['value one', 'value two'],
          arrayToText: true,
          template: `<div class="form-group">
    <label for="{{formName+index}}" class="control-label" ng-class="{'fb-required':required}">{{label}}</label>
        <input type='hidden' ng-model="inputText" validator-required="{{required}}" validator-group="{{formName}}"/>
        <div class='checkbox' ng-repeat="item in options track by $index">
            <label><input type='checkbox' ng-model="$parent.inputArray[$index]" value='item'/><span class='checkbox_square'></span>
                {{item}}
            </label>
        </div>
        <p class='help-block'>{{description}}</p>
</div>`,
          popoverTemplate: `<form>
    <div class="form-group">
        <label class='control-label'>Label</label>
        <input type='text' ng-model="label" validator="[required]" class='form-control'/>
    </div>
    <div class="form-group">
        <label class='control-label'>Description</label>
        <input type='text' ng-model="description" class='form-control'/>
    </div>
    <div class="form-group">
        <label class='control-label'>Options</label>
        <textarea class="form-control" rows="3" ng-model="optionsText"/>
    </div>
    <hr/>
    <div class='form-group'>
        <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save'/>
        <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='Cancel'/>
        <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
    </div>
</form>`
        });
        $builderProvider.registerComponent('radio', {
          group: 'Default',
          label: 'Radio',
          description: 'description',
          placeholder: 'placeholder',
          required: false,
          options: ['value one', 'value two'],
          template: `
      <div class="form-group">
    <label for="{{formName+index}}" class="control-label" ng-class="{'fb-required':required}">{{label}}</label>
        <div class='radio' ng-repeat="item in options track by $index">
            <label><input name='{{formName+index}}' ng-model="$parent.inputText" validator-group="{{formName}}" value='{{item}}' type='radio'/> <span class='radio_circle'></span>
                {{item}}
            </label>
        </div>
        <p class='help-block'>{{description}}</p>
</div>`,
          popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
        });
        $builderProvider.registerComponent('datePicker', {
          group: 'Default',
          label: 'datePicker',
          description: 'description',
          placeholder: 'дд/MM/рррр',
          required: true,
          editable: true,
          template:
            `<div class="form-group">
            <label for="{{formName+index}}"
            class="control-label"
            ng-class="{'fb-required':required}">
            {{label}}
            </label>
                <input type="text" mask="39/19/2999"
                ng-model="inputText"
                validator-required="{{required}}"
                 validator-group="{{formName}}"
                 id="{{formName+index}}" class="form-control"
                 placeholder="{{placeholder}}"
                 />
                <p class='help-block'>{{description}}</p>
        </div>`,
          popoverTemplate: `<form>
                            <div class="form-group">
                                <label class='control-label'>Label</label>
                                <input type='text' ng-model="label" validator="[required]" class='form-control'/>
                            </div>
                            <div class="form-group">
                                <label class='control-label'>Description</label>
                                <input type='text' ng-model="description" class='form-control'/>
                            </div>
                            <div class="checkbox">
                                <label>
                                    <input type='checkbox' ng-model="required" />
                                    Required</label>
                            </div>
                        
                            <hr/>
                            <div class='form-group'>
                                <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save'/>
                                <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='Cancel'/>
                                <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
                            </div>
                        </form>`
        });
        return $builderProvider.registerComponent('select', {
          group: 'Default',
          label: 'Select',
          description: 'description',
          placeholder: 'placeholder',
          required: false,
          options: ['value one', 'value two'],
          template: `
      <div class="form-group">
    <label for="{{formName+index}}" class="control-label">{{label}}</label>
        <select ng-options="value for value in options" id="{{formName+index}}" class="form-control"
            ng-model="inputText" ng-init="inputText = options[0]"/>
        <p class='help-block'>{{description}}</p>
</div>`,
          popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
        });
      }]
    );
})();