
var chatapp = angular.module('chatApp', ['ui.router']);

chatapp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('login');
    $stateProvider
  
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller:'userControl'
        })


        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller:'userControl'
        })

       

});





















// //create the module and name it scotchApp
// var chatApp = angular.module('chatApp', ['ui.Router']);

// // configure our routes
// chatApp.config(function ($routeProvider) {
//     $routeProvider

//     .when('', {
//         templateUrl: 'templates/login.html',
//         controller:'logincontroller'
    
//     })
//         // route for the home page
//         .when('/', {
//             templateUrl: 'templates/login.html',
//             controller:'logincontroller'
        
//         })
// /**The ngRoute module helps your application to become a Single Page Application.

//  */
//         // route for the registration page
//         .when('/register', {
//             templateUrl: 'templates/register.html',
//             controller:'registercontroller'
            
            
//         })
//     });


