app
  .directive('fileinput', [function () {
    return {
      scope: {
        fileinput: '=',
        filepreview: '='
      },
      link: function (scope, element, attributes) {
        element.bind('change', function (changeEvent) {
          scope.fileinput = changeEvent.target.files[0];
          let reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.filepreview = loadEvent.target.result;
            });
          };
          reader.readAsDataURL(scope.fileinput);
        });
      }
    };
  }])


  // (function(){
  //     angular.module('ngLoadingSpinner', ['angularSpinner'])
  //         .directive('usSpinner',   ['$http', '$rootScope' ,function ($http, $rootScope){
  //             return {
  //                 link: function (scope, elm, attrs)
  //                 {
  //                     $rootScope.spinnerActive = false;
  //                     scope.isLoading = function () {
  //                         return $http.pendingRequests.length > 0;
  //                     };
  //
  //                     scope.$watch(scope.isLoading, function (loading)
  //                     {
  //                         $rootScope.spinnerActive = loading;
  //                         if(loading){
  //                             elm.removeClass('ng-hide');
  //                         }else{
  //                             elm.addClass('ng-hide');
  //                         }
  //                     });
  //                 }
  //             };
  //
  //         }]);
  // }).call(this);
    // .directive('loading', ['$http',  '$routeParams','$rootScope', '$window', function ($http, $routeParams,$rootScope, $window) {
    //     return {
    //         restrict: 'AE',
    //         link: function (scope, elm, attrs) {
    //             scope.isLoading =  () => {
    //                 return $http.pendingRequests.length > 0;
    //             };
    //             scope.$watch(scope.isLoading,  (v) => {
    //
    //
    //                 // if( DefaultFactory.spinner ) {
    //                 //     if(v){
    //                 //         angular.element('.ng-view-parent').addClass('ng-fade');
    //                 //         angular.element('.ng-view-parent').before('<span class="resolve-loader showly"><span class="one"></span><span class="two"></span><span class="three"></span></span>');
    //                 //     }else{
    //                 //         setTimeout ( () => {
    //                 //             $('.resolve-loader').removeClass('showly');
    //                 //             setTimeout ( () => {
    //                 //                 $('.ng-view-parent').removeClass('ng-fade');
    //                 //                 $('.resolve-loader').hide();
    //                 //
    //                 //                 // Preloader by list of user
    //                 //                 // if( !angular.element('body').hasClass('ph-home') && DefaultFactory.getCurrentUrl() === 'home' ) {
    //                 //                 //     angular.element('body').addClass('ph-' + DefaultFactory.getCurrentUrl());
    //                 //                 // }
    //                 //
    //                 //                 setTimeout(()=>{
    //                 //                     angular.element('.resolve-loader').remove();
    //                 //                 }, 1000);
    //                 //
    //                 //             }, 200 );
    //                 //         }, 200 );
    //                 //     }
    //                 // }
    //             });
    //
    //         }
    //
    //     };
    // }])