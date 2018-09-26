app
    .service('dateService', ['$http', '$location','$scope','$rootScope', function ($http, $location,$scope,$rootScope) {

        let serv = this;

        //change date to format yyyy-mm-dd
        serv.changeDateYYYY_MM_DD = function (date) {
            let newDate = new Date(date)
            return newDate.toISOString().slice(0, 10).replace(/-/g, "-");

        }
// change date to format yyyy.mm.dd
        serv.refactorDate = function (date) {
            return new Date(date).toISOString().slice(0, 10);

        }
        // returns difference in days
        serv.dateDifferenceD = function (finish, start) {


            let timeDiff = new Date(finish).getTime() - new Date(start).getTime();
            let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
            return diffDays

        }
        // date difference in monthes
        serv.dateDifferenceM=function(st, fin){
            let finish = new Date(fin)
            let start = new Date(st)
            let d1Y = start.getFullYear();
            let d2Y = finish.getFullYear();
            let d1M = start.getMonth();
            let d2M = finish.getMonth();
            return (d2M + 12 * d2Y) - (d1M + 12 * d1Y)

        }



        // returns object of difference in years and monthes
        serv.dateDifferenceObj_M_Y = function (date) {
            let difference = {
                years: 0,
                monthes: 0
            }
            let today = new Date
            let start = new Date(date)
            let d1Y = start.getFullYear();
            let d2Y = today.getFullYear();
            let d1M = start.getMonth();
            let d2M = today.getMonth();
            let dif = (d2M + 12 * d2Y) - (d1M + 12 * d1Y)
            if (dif >= 12) {
                difference.years = parseInt(dif / 12)
                difference.monthes = dif % 12
            }
            else {
                difference.monthes = dif
            }

            return difference;
        }
        // returns strings with correct quantity of years-monthes
        ctrl.yearsMonthes = function (obj) {
            if (obj.years === 0) {
                obj.years = 0
            }
            else if (obj.years === 1) {
                obj.years = obj.years + ' рік'
            }
            else if (obj.years > 1 && obj.years < 5) {
                obj.years = obj.years + ' роки'

            }
            else if (obj.years > 4 && obj.years < 21) {
                obj.years = obj.years + ' років'
            } else if (obj.years > 20 && obj.years % 10 === 1)
                obj.years = obj.years + ' рік'
            else if (obj.years > 21 && obj.years % 10 < 4) {
                obj.years = obj.years + ' роки'

            } else {
                obj.years = obj.years + ' років'
            }
            if (obj.monthes === 0) {
                obj.monthes = 0
            }
            else if (obj.monthes === 1) {
                obj.monthes = obj.monthes + ' місяць'
            }
            else if (obj.monthes > 1 && obj.monthes < 5) {
                obj.monthes = obj.monthes + ' місяці'

            }
            else if (obj.monthes > 4) {
                obj.monthes = obj.monthes + ' місяців'

            }

            return obj
        }


    }
    ])
;