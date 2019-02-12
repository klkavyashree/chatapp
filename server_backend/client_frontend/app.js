
var app = angular.module('chatapp', ['ui.router','btford.socket-io']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'templets/login.html',
            controller:'userControl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templets/register.html',
             controller:'userControl'
        })
        .state('singleChat', {
            url: '/singleChat',
            templateUrl: 'templets/singleChat.html',
             controller:'singleChatControl'
        })
        $urlRouterProvider.otherwise('login');

       
});
app.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:3000')
    });
}]); 





















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


