/**
 * Created by reolee on 27/04/15.
 */
angular.module('fieldAgent.services', [])

.factory('propertyDetailService', function($http, propertyIdService, $q) {

        var service = {
            propertyDetail: [],
            getPropertyDetail: getPropertyDetail
        };
        return service;

        function getPropertyDetail() {
            var def = $q.defer();

            $http.get("http://fieldagent.js-dev.co/getPropertyDetail.php?propertyid=" + propertyIdService.propertyid)
                .success(function(data) {
                    service.propertyDetail = data;
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get property detail");

                });
            return def.promise;
        }
    })


.factory('propertyListService',function($http, userIdService, $q) {

        // interface
        var  service = {
            property: [],
            getProperty: getProperty

        };

        return service;


        //implementation
        function getProperty(){
            var def = $q.defer();

            $http.get("http://fieldagent.js-dev.co/getProperties.php?userid=" + userIdService.userid)
                .success(function(data) {
                    service.property = data;
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get property");
                });
            return def.promise;
        }
    })

.factory('inspectionService', function($http, $q, propertyIdService) {
        //interface
        var service = {
            inspectionList: [],
            getInspectionList: getInspectionList
        };
        return service;

        function getInspectionList(){
            var def = $q.defer();
            $http.get("http://fieldagent.js-dev.co/getPropertyCases.php?propertyid=" + propertyIdService.propertyid)
                .success(function(data) {
                    service.inspectionList = data;
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get inspection list");
                });
            return def.promise;
        }
    })



.factory('propertyIdService', function() {
        return{
            propertyid : "defualt"
        };
    })



.factory('userIdService', function() {

        return{
            userid : 'anonymous'
        };

    })




