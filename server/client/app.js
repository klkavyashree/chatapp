
var app = angular.module('chatapp', ['ui.router','btford.socket-io']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
            url: '/login',//assigning values to to the properties of state provider
            templateUrl: 'templets/login.html',
            controller:'userControl'//assigning values to to the properties of state provider
        })
        .state('register', {
            url: '/register',//assigning values to to the properties of state provider
            templateUrl: 'templets/register.html',
             controller:'userControl'//assigning values to to the properties of state provider
        })
        .state('singleChat', {
            url: '/singleChat',//assigning values to to the properties of state provider
            templateUrl: 'templets/singleChat.html',
             controller:'singleChatControl'//assigning values to to the properties of state provider
        })
        $urlRouterProvider.otherwise('login');//if no other option then go to login page

       
});
app.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:3000')//connecting socket io 
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


