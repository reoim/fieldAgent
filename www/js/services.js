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

            $http.get("https://fieldagent.js-dev.co/getPropertyDetail.php", {params: {"propertyid": propertyIdService.propertyid}})
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
            $http.get("https://fieldagent.js-dev.co/getProperties.php", {params: {"userid": userIdService.userid}})
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
            $http.get("https://fieldagent.js-dev.co/getPropertyCases.php", {params: {"propertyid": propertyIdService.propertyid}})
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

    .factory('areaService', function($http, $q, propertyIdService) {

        var service = {
            areaList: [],
            getArea: getArea
        };
        return service;

        function getArea(){
            var def = $q.defer();
            $http.get("https://fieldagent.js-dev.co/getAreas.php", {params: {"propertyid": propertyIdService.propertyid}})
                .success(function(data) {
                    service.areaList = data;
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get area list");
                });
            return def.promise;

        }
    })

    .factory('areaDetailService', function($http, $q, caseIdService, areaIdService) {

        var service = {
            areaDetail: [],
            getAreaDetail: getAreaDetail
        };
        return service;

        function getAreaDetail(){
            var def = $q.defer();
            $http.get("https://fieldagent.js-dev.co/getInspectedArea.php", {params: {"caseid": caseIdService.caseid, "areaid": areaIdService.areaid}})
                .success(function(data) {
                    service.areaDetail = data;
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get area Detail");
                });
            return def.promise;

        }
    })




    .factory('Camera', ['$q', function($q) {

        return {
            getPicture: function(options) {
                var q = $q.defer();

                navigator.camera.getPicture(function(result) {
                    // Do any magic you need
                    q.resolve(result);
                }, function(err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }
    }])



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

    .factory('caseIdService', function() {
        return{
            caseid : "defualt"
        };
    })

    .factory('areaIdService', function() {
        return{
            areaid : "default"
        };
    })



