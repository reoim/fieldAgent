/**
 * Created by reolee on 27/04/15.
 */
angular.module('fieldAgent.services', [])


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

.factory('userIdService', function() {

        return{
            userid : 'anonymous'
        };

    })




