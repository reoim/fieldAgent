/**
 * Created by reolee on 27/04/15.
 */
angular.module('fieldAgent.services', [])

.factory('propertyListService', function($http) {

        var property_list = [];

        return{
            getPropertyList: function(){
                return $http.get("http://fieldagent.js-dev.co/getProperties.php").then(function(response){
                    property_list = response.data;
                    console.log(property_list);
                    return property_list;

                }, function(error){
                    console.log("connection failed");
                });
            }
        }
    })