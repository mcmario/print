angular.module('builder.components', ['builder', 'validator.rules'])
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
        template: `<div class="block_padding">
        <h1 class="testing_title">{{label}}</h1>
      </div>`,
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
</form>`
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
        template: `<div class="form-group">
    <div class="block_padding">
    <label for="{{formName+index}}" class="control-label" ng-class="{'fb-required':required}">{{label}}</label>
        <input type="text" ng-model="inputText" validator-required="{{required}}" validator-group="{{formName}}" 
        id="{{formName+index}}" class="form-control" placeholder="{{placeholder}}"/>
        <p class='help-block'>{{description}}</p>
    </div>
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
    <div class="block_padding">
    <label for="{{formName+index}}" class="control-label" ng-class="{'fb-required':required}">{{label}}</label>
        <textarea type="text" ng-model="inputText" validator-required="{{required}}" validator-group="{{formName}}" id="{{formName+index}}" class="form-control" rows='6' placeholder="{{placeholder}}"/>
        <p class='help-block'>{{description}}</p>
    </div>
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
    <div class="block_padding">
    <label for="{{formName+index}}" class="control-label" ng-class="{'fb-required':required}">{{label}}</label>
        <input type='hidden' ng-model="inputText" validator-required="{{required}}" validator-group="{{formName}}"/>
        <div class='checkbox' ng-repeat="item in options track by $index">
            <label><input type='checkbox' ng-model="$parent.inputArray[$index]" value='item'/><span class='checkbox_square'></span>
                {{item}}
            </label>
        </div>
        <p class='help-block'>{{description}}</p>
    </div>
</div>
`,
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required\n        </label>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
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
    <div class="block_padding">
    <label for="{{formName+index}}" class="control-label" ng-class="{'fb-required':required}">{{label}}</label>
        <div class='radio' ng-repeat="item in options track by $index">
            <label><input name='{{formName+index}}' ng-model="$parent.inputText" validator-group="{{formName}}" value='{{item}}' type='radio'/> <span class='radio_circle'></span>
                {{item}}
            </label>
        </div>
        <p class='help-block'>{{description}}</p>
    </div>
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
            
            <div class="block_padding">
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
            </div>
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
      $builderProvider.registerComponent('higherEducation', {
        group: 'Anketa',
        label: 'Освіта',
        description: [0, 1, 2, 3, 4],
        placeholder: ['Назва освітнього закладу', 'Диплом (свідоцтво), серія, номер', 'Рік закінчення', 'Спеціальність (професія)', 'Кваліфікація', 'Форма навчання'],
        required: true,
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
          `<div class='block_padding form-collapse-questions'>
            <h4 class="form-collapse-title" ng-click="required = !required">{{label}}: <i class="expanded icon-up" ng-class="{'collapsed': required}"></i></h4>
            <div class="form-block animate-slide rows-6" ng-hide="required">
            <div class="row form-row">
              
              <label for="{{formName + index + 00}}" class="control-label">{{placeholder[0]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][0]" class="form-control" placeholder="{{placeholder[0]}}"/>
              
            </div>
            <div class="row form-row">
              
              <label for="{{formName + index + 01}}" class="control-label">{{placeholder[1]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][1]" class="form-control" placeholder="{{placeholder[1]}}"/>
              
            </div>
            <div class="row form-row">
              
              <label for="{{formName + index + 02}}" class="control-label">{{placeholder[2]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][2]" class="form-control" placeholder="{{placeholder[2]}}"/>
              
            </div>
            <div class="row form-row">
              
              <label for="{{formName + index + 03}}" class="control-label">{{placeholder[3]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][3]" class="form-control" placeholder="{{placeholder[3]}}"/>
              
            </div>
            <div class="row form-row">
              
              <label for="{{formName + index + 04}}" class="control-label">{{placeholder[4]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][4]" class="form-control" placeholder="{{placeholder[4]}}"/>
              
            </div>
            <div class="row form-row">
              
              <label for="{{formName + index + 05}}" class="control-label">{{placeholder[5]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][5]" class="form-control" placeholder="{{placeholder[5]}}"/>
              
            </div>
         </div>
            </div>
            `,
        popoverTemplate: `<form>
    <div class="form-group">
        <label class='control-label'>Підпис</label>
        <input type='text' ng-model="label" validator="[required]" class='form-control'/>
    </div>
    <div class="checkbox">
        <label>
            <input type='checkbox' ng-model="required" />
            Згорнути</label>
    </div>
    <hr/>
    <div class='form-group'>
        <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save'/>
        <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='Cancel'/>
        <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
    </div>
</form>`
      });
      $builderProvider.registerComponent('postgraduateEducation', {
        group: 'Anketa',
        label: 'Післядопломна освіта',
        description: [0, 1, 2, 3, 4],
        placeholder: ['Назва освітнього, наукового закладу', 'Диплом, номер, дата видачі', 'Рік закінчення', 'Науковий ступінь, вчене взання'],
        required: true,
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
        template: `<div class='block_padding form-collapse-questions'>
<h4 class="form-collapse-title" ng-click="required = !required">{{label}}: <i class="expanded icon-up" ng-class="{'collapsed': required}"></i></h4>
            <div class="form-block animate-slide rows-4" ng-hide="required">
            <div class="row form-row">
              <label for="{{formName + index + 00}}" class="control-label">{{placeholder[0]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][0]" class="form-control" placeholder="{{placeholder[0]}}"/>
            </div>
            <div class="row form-row">
              <label for="{{formName + index + 01}}" class="control-label">{{placeholder[1]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][1]" class="form-control" placeholder="{{placeholder[1]}}"/>
            </div>
            <div class="row form-row">
              <label for="{{formName + index + 02}}" class="control-label">{{placeholder[2]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][2]" class="form-control" placeholder="{{placeholder[2]}}"/>
            </div>
            <div class="row form-row">
              <label for="{{formName + index + 03}}" class="control-label">{{placeholder[3]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][3]" class="form-control" placeholder="{{placeholder[3]}}"/>
            </div>
         </div>
            </div>`,
        popoverTemplate: `<form>
    <div class="form-group">
        <label class='control-label'>Підпис</label>
        <input type='text' ng-model="label" validator="[required]" class='form-control'/>
    </div>
    <div class="checkbox">
        <label>
            <input type='checkbox' ng-model="required" />
            Згорнути</label>
    </div>
    <hr/>
    <div class='form-group'>
        <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save'/>
        <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='Cancel'/>
        <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
    </div>
</form>`
      });
      $builderProvider.registerComponent('recomendatios', {
        group: 'Anketa',
        label: 'Вкажіть, хто Вам, як спеціалісту, може дати рекомендації?',
        description: [0, 1, 2, 3, 4],
        placeholder: ['ПІБ', 'Посада', 'Назва організації', 'Телефони'],
        required: true,
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
        template: `<h5 class='block_padding form-collapse-questions' ng-click="required = !required">
            {{label}}: <span ng-if="required">(Розгорнути)</span><span ng-if="!required">(Згорнути)</span></h5>
            <div class="form-block animate-slide rows-4" ng-hide="required">
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 00}}" class="control-label">{{placeholder[0]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][0]" class="form-control" placeholder="{{placeholder[0]}}"/>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 01}}" class="control-label">{{placeholder[1]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][1]" class="form-control" placeholder="{{placeholder[1]}}"/>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 02}}" class="control-label">{{placeholder[2]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][2]" class="form-control" placeholder="{{placeholder[2]}}"/>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 03}}" class="control-label">{{placeholder[3]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][3]" class="form-control" placeholder="{{placeholder[3]}}"/>
              </div>
            </div>
         </div>`,
        popoverTemplate: `<form>
    <div class="form-group">
        <label class='control-label'>Підпис</label>
        <input type='text' ng-model="label" validator="[required]" class='form-control'/>
    </div>
    <div class="checkbox">
        <label>
            <input type='checkbox' ng-model="required" />
            Згорнути</label>
    </div>
    <hr/>
    <div class='form-group'>
        <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save'/>
        <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='Cancel'/>
        <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
    </div>
</form>`
      });
      $builderProvider.registerComponent('speciality', {
        group: 'Anketa',
        label: 'Основна спеціальність',
        description: [0, 1],
        placeholder: ['Назва спеціальності', 'Досвід роботи (років) за вказаною спеціальністю'],
        required: true,
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
        template: `<h5 class='block_padding form-collapse-questions' ng-click="required = !required">
            {{label}}: <span ng-if="required">(Розгорнути)</span><span ng-if="!required">(Згорнути)</span></h5>
            <div class="form-block animate-slide rows-2" ng-hide="required">
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 00}}" class="control-label">{{placeholder[0]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][0]" class="form-control" placeholder="{{placeholder[0]}}"/>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 01}}" class="control-label">{{placeholder[1]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][1]" class="form-control" placeholder="{{placeholder[1]}}"/>
              </div>
            </div>
         </div>`,
        popoverTemplate: `<form>
    <div class="form-group">
        <label class='control-label'>Підпис</label>
        <input type='text' ng-model="label" validator="[required]" class='form-control'/>
    </div>
    <div class="checkbox">
        <label>
            <input type='checkbox' ng-model="required" />
            Згорнути</label>
    </div>
    <hr/>
    <div class='form-group'>
        <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save'/>
        <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='Cancel'/>
        <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
    </div>
</form>`
      });
      $builderProvider.registerComponent('militaryService', {
        group: 'Anketa',
        label: 'Служба в армії',
        description: [0, 1],
        placeholder: ['Звання', 'Рід військ', 'Роки служби'],
        required: true,
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
        template: `<h4 class='form-title'>
            {{label}}</h4>
            <div class="form-block">
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 00}}" class="control-label">{{placeholder[0]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][0]" class="form-control" placeholder="{{placeholder[0]}}"/>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 01}}" class="control-label">{{placeholder[1]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][1]" class="form-control" placeholder="{{placeholder[1]}}"/>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 01}}" class="control-label">{{placeholder[2]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][2]" class="form-control" placeholder="{{placeholder[2]}}"/>
              </div>
            </div>
         </div>`,
        popoverTemplate: `<form>
    <div class="form-group">
        <label class='control-label'>Підпис</label>
        <input type='text' ng-model="label" validator="[required]" class='form-control'/>
    </div>
    <div class="checkbox">
        <label>
            <input type='checkbox' ng-model="required" />
            Згорнути</label>
    </div>
    <hr/>
    <div class='form-group'>
        <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save'/>
        <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='Cancel'/>
        <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
    </div>
</form>`
      });
      $builderProvider.registerComponent('workingExperience', {
        group: 'Anketa',
        label: 'Досвід роботи у зворотньому хронологічному порядку',
        description: [0, 1, 2, 3, 5, 6],
        placeholder: ['Роки роботи', 'Назва компанії, вид діяльності, тел., посада', 'Функціональні обов\'язки, які Ви виконували', 'Розмір заробітньої плати', 'Причина звільнення?', 'Запис в трудовій книзі'],
        required: true,
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
            <div class='block_padding form-collapse-questions'>
            <h4 class="form-collapse-title" ng-click="required = !required">{{label}}: <i class="expanded icon-up" ng-class="{'collapsed': required}"></i></h4>
            <div class="form-block animate-slide rows-6" ng-hide="required">
            <div class="row form-row">
              <label for="{{formName + index + 00}}" class="control-label">{{placeholder[0]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][0]" class="form-control" placeholder="{{placeholder[0]}}"/>
              </div>
            <div class="row form-row">
              <label for="{{formName + index + 01}}" class="control-label">{{placeholder[1]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][1]" class="form-control" placeholder="{{placeholder[1]}}"/>
            </div>
            <div class="row form-row">
              <label for="{{formName + index + 02}}" class="control-label">{{placeholder[2]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][2]" class="form-control" placeholder="{{placeholder[2]}}"/>
            </div>
            <div class="row form-row">
              <label for="{{formName + index + 03}}" class="control-label">{{placeholder[3]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][3]" class="form-control" placeholder="{{placeholder[3]}}"/>
            </div>
            <div class="row form-row">
              <label for="{{formName + index + 04}}" class="control-label">{{placeholder[4]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][4]" class="form-control" placeholder="{{placeholder[4]}}"/>
            </div>
            <div class="row form-row">
              <label for="{{formName + index + 05}}" class="control-label">{{placeholder[5]}}</label>
                <input class="form-control" type="text" ng-model="inputText[0][5]" class="form-control" placeholder="{{placeholder[5]}}"/>
            </div>
         </div>
            </div>
        `,
        popoverTemplate: `<form>
    <div class="form-group">
        <label class='control-label'>Підпис</label>
        <input type='text' ng-model="label" validator="[required]" class='form-control'/>
    </div>
    <div class="checkbox">
        <label>
            <input type='checkbox' ng-model="required" />
            Згорнути</label>
    </div>
    <hr/>
    <div class='form-group'>
        <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save'/>
        <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='Cancel'/>
        <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
    </div>
</form>`
      });
      $builderProvider.registerComponent('priority', {
        group: 'Anketa',
        label: 'Вкажіть пріоритет для кожної з позицій від 1 до 10 (де 1 - найбільш важлива позиція, 10 - найменш важлива позиція)',
        description: '',
        placeholder: ['Кар\'єрний ріст', 'Престижна та надійна фірма', 'Висока інтенсивність роботи', 'Позмінна робота', 'Стабільна оплата та пільги', 'Близькість до житла', 'Можливість навчання та підвищення кваліфікації', 'Спокійна, не дуже відповідальна робота', 'Дружелюбний колектив', 'Реалізація власних ідей та рішень'],
        required: true,
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
          `<h5 class='form-title' ng-click="required = !required">
            {{label}}</h5><div class="form-block">
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 00}}" class="control-label">{{placeholder[0]}}</label>
              <select class="form-control" name=""
                    ng-model="inputText[0][0]">
              <option
                  ng-repeat="i in [1,2,3,4,5,6,7,8,9,10]"
                  value="{{i}}">
                {{i}}
              </option>
            </select>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 01}}" class="control-label">{{placeholder[1]}}</label>
              <select class="form-control" name=""
                    ng-model="inputText[0][1]">
              <option
                  ng-repeat="i in [1,2,3,4,5,6,7,8,9,10]"
                  value="{{i}}">
                {{i}}
              </option>
            </select>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 02}}" class="control-label">{{placeholder[2]}}</label>
              <select class="form-control" name=""
                    ng-model="inputText[0][2]">
              <option
                  ng-repeat="i in [1,2,3,4,5,6,7,8,9,10]"
                  value="{{i}}">
                {{i}}
              </option>
            </select>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 03}}" class="control-label">{{placeholder[3]}}</label>
              <select class="form-control" name=""
                    ng-model="inputText[0][3]">
              <option
                  ng-repeat="i in [1,2,3,4,5,6,7,8,9,10]"
                  value="{{i}}">
                {{i}}
              </option>
            </select>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 04}}" class="control-label">{{placeholder[4]}}</label>
              <select class="form-control" name=""
                    ng-model="inputText[0][4]">
              <option
                  ng-repeat="i in [1,2,3,4,5,6,7,8,9,10]"
                  value="{{i}}">
                {{i}}
              </option>
            </select>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 05}}" class="control-label">{{placeholder[5]}}</label>
              <select class="form-control" name=""
                    ng-model="inputText[0][5]">
              <option
                  ng-repeat="i in [1,2,3,4,5,6,7,8,9,10]"
                  value="{{i}}">
                {{i}}
              </option>
            </select>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 06}}" class="control-label">{{placeholder[6]}}</label>
              <select class="form-control" name=""
                    ng-model="inputText[0][6]">
              <option
                  ng-repeat="i in [1,2,3,4,5,6,7,8,9,10]"
                  value="{{i}}">
                {{i}}
              </option>
            </select>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 07}}" class="control-label">{{placeholder[7]}}</label>
              <select class="form-control" name=""
                    ng-model="inputText[0][7]">
              <option
                  ng-repeat="i in [1,2,3,4,5,6,7,8,9,10]"
                  value="{{i}}">
                {{i}}
              </option>
            </select>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 08}}" class="control-label">{{placeholder[8]}}</label>
              <select class="form-control" name=""
                    ng-model="inputText[0][8]">
              <option
                  ng-repeat="i in [1,2,3,4,5,6,7,8,9,10]"
                  value="{{i}}">
                {{i}}
              </option>
            </select>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding">
              <label for="{{formName + index + 09}}" class="control-label">{{placeholder[9]}}</label>
              <select class="form-control" name=""
                    ng-model="inputText[0][9]">
              <option
                  ng-repeat="i in [1,2,3,4,5,6,7,8,9,10]"
                  value="{{i}}">
                {{i}}
              </option>
            </select>
              </div>
            </div>
         </div>`,
        popoverTemplate: `<form>
    <div class="form-group">
        <label class='control-label'>Підпис</label>
        <input type='text' ng-model="label" validator="[required]" class='form-control'/>
    </div>
    <div class="checkbox">
        <label>
            <input type='checkbox' ng-model="required" />
            Згорнути</label>
    </div>
    <hr/>
    <div class='form-group'>
        <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save'/>
        <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='Cancel'/>
        <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
    </div>
</form>`
      });
      $builderProvider.registerComponent('skillsIt', {
        group: 'Anketa',
        label: 'Як саме Ви удосконалюєте свої професійні знання та навички з ІТ? ',
        description: [0, 1, 2, 3, 4],
        placeholder: ['Мені достатньо того рівня знань, який у мене є', 'Вивчаю професійну літературу', 'Відвідував спеціалізовані курси з напряму ІТ-технологій', 'Відвідував курси із вивчення іноземної мови', 'Інше'],
        required: true,
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
        template: `<h5 class='form-title'>
            {{label}}</h5>
            <div class="form-block">
            <div class="row form-row">
              <div class="block_padding checkbox">
              <label class="">
              <input class="" type="checkbox" ng-model="inputText[0][0]" class="form-control"/>
              <!--<input class="" ng-checked="!inputText || inputText[0][0]" type="checkbox" ng-model="inputText[0][0]" class="form-control"/>-->
              <span class='checkbox_square'></span>
              {{placeholder[0]}}
              </label>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding checkbox">
              <label class="">
              <input class="" type="checkbox" ng-model="inputText[0][1]" class="form-control"/>
              <span class='checkbox_square'></span>
              {{placeholder[1]}}
              </label>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding checkbox">
              <label class="">
              <input class="" type="checkbox" ng-model="inputText[0][2]" class="form-control"/>
              <span class='checkbox_square'></span>
              {{placeholder[2]}}
              </label>
              </div>
            </div>
            <div class="row form-row">
              <div class="block_padding checkbox">
              <label class="">
              <input class="" type="checkbox" ng-model="inputText[0][3]" class="form-control"/>
              <span class='checkbox_square'></span>
              {{placeholder[3]}}
              </label>
              </div>
            </div>
            
            <div class="row form-row" ng-click="(!else)?inputText[0][4] = '':'';">
              <div class="block_padding checkbox">
              <label class="">
              <input class="" type="checkbox" ng-model="else" class="form-control"/>
              <span class='checkbox_square'></span>
              {{placeholder[4]}} <input ng-disabled="!else" class="small_input" type="text" ng-model="inputText[0][4]" class="form-control"/>
              </label>
              </div>
            </div>
         </div>`,
        popoverTemplate: `<form>
    <div class="form-group">
        <label class='control-label'>Підпис</label>
        <input type='text' ng-model="label" validator="[required]" class='form-control'/>
    </div>
    <hr/>
    <div class='form-group'>
        <input type='submit' ng-click="popover.save($event)" class='btn btn-primary' value='Save'/>
        <input type='button' ng-click="popover.cancel($event)" class='btn btn-default' value='Cancel'/>
        <input type='button' ng-click="popover.remove($event)" class='btn btn-danger' value='Delete'/>
    </div>
</form>`
      });
      $builderProvider.registerComponent('professionNow', {
        group: 'Anketa',
        label: 'За яким фахом ІТ-сфери Ви працюєте на даний час?',
        description: [0, 1, 2, 3, 4],
        placeholder: ['Розробник програмного забезпечення', 'Системний адміністратор', 'Системний архітектор', 'Менеджер проекта', 'Тестувальник', 'Працюю не за фахом', 'Не працюю'],
        required: true,
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
        template: `<h5 class='form-title' ng-init="inputText = inputText || placeholder[0]">
            {{label}}</h5>
            <div class="form-block">
            <div class="row form-row" ng-click="(else)?else=false:'';">
              <div class="block_padding radio">
              <label class="">
              <input name="{{formName + index}}" class="disabled_radio" type="radio" ng-model="inputText" class="form-control" ng-value="placeholder[0]"/>
              <span class="radio_circle"></span>
              {{placeholder[0]}}
              </label>
              </div>
            </div>
            <div class="row form-row" ng-click="(else)?else=false:'';">
              <div class="block_padding radio">
              <label class="">
              <input name="{{formName + index}}" class="disabled_radio" type="radio" ng-model="inputText" class="form-control" ng-value="placeholder[1]"/>
              <span class="radio_circle"></span>
              {{placeholder[1]}}
              </label>
              </div>
            </div>
            
            <div class="row form-row" ng-click="(else)?else=false:'';">
              <div class="block_padding radio">
              <label class="">
              <input name="{{formName + index}}" class="disabled_radio" type="radio" ng-model="inputText" class="form-control" ng-value="placeholder[2]"/>
              <span class="radio_circle"></span>
              {{placeholder[2]}}
              </label>
              </div>
            </div>
            
            <div class="row form-row" ng-click="(else)?else=false:'';">
              <div class="block_padding radio">
              <label class="">
              <input name="{{formName + index}}" class="disabled_radio" type="radio" ng-model="inputText" class="form-control" ng-value="placeholder[3]"/>
              <span class="radio_circle"></span>
              {{placeholder[3]}}
              </label>
              </div>
            </div>
            
            <div class="row form-row" ng-click="(else)?else=false:'';">
              <div class="block_padding radio">
              <label class="">
              <input name="{{formName + index}}" class="disabled_radio" type="radio" ng-model="inputText" class="form-control" ng-value="placeholder[4]"/>
              <span class="radio_circle"></span>
              {{placeholder[4]}}
              </label>
              </div>
            </div>
            
            <div class="row form-row" ng-click="(else)?else=false:'';">
              <div class="block_padding radio">
              <label class="">
              <input name="{{formName + index}}" class="disabled_radio" type="radio" ng-model="inputText" class="form-control" ng-value="placeholder[5]"/>
              <span class="radio_circle"></span>
              {{placeholder[5]}}
              </label>
              </div>
            </div>
            
            <div class="row form-row" ng-click="(else)?else=false:'';">
              <div class="block_padding radio">
              <label class="">
              <input name="{{formName + index}}" class="disabled_radio" type="radio" ng-model="inputText" class="form-control" ng-value="placeholder[6]"/>
              <span class="radio_circle"></span>
              {{placeholder[6]}}
              </label>
              </div>
            </div>
            <div class="row form-row" ng-click="!else ? inputText='' : '';">
              <div class="block_padding radio">
              <label class="">
              <input name="{{formName + index}}" class="disabled_radio" type="radio" ng-model="else" class="form-control" ng-value="true"/>
              <span class="radio_circle"></span>
              Інше:  
              <input disabled ng-hide="else === true" class="small_input" type="text" class="form-control"/>        
              <input ng-show="else === true"  class="small_input" type="text" ng-model="inputText" class="form-control"/>        
              </label>
              </div>
            </div>
         </div>`,
        popoverTemplate: `<form>
    <div class="form-group">
        <label class='control-label'>Підпис</label>
        <input type='text' ng-model="label" validator="[required]" class='form-control'/>
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
    <div class="block_padding">
    <label for="{{formName+index}}" class="control-label">{{label}}</label>
        <select ng-options="value for value in options" id="{{formName+index}}" class="form-control"
            ng-model="inputText" ng-init="inputText = options[0]"/>
        <p class='help-block'>{{description}}</p>
    </div>
</div>`,
        popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Description</label>\n        <input type='text' ng-model=\"description\" class='form-control'/>\n    </div>\n    <div class=\"form-group\">\n        <label class='control-label'>Options</label>\n        <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
      });
    }]
  );
