var aplicacoin = angular.module('app', [])
.controller('Controller', function($scope, $http) {
    $scope._id = null;
    $scope.name = '';
    $scope.email = '';
    $scope.users = [];
    $scope.cargarUsers = function(){
        $http({
           method: 'GET', url: '/listar'
        }).
        success(function(data) {
           if(typeof(data) == 'object'){
              $scope.users = data;
           }else{
              alert('Error al intentar recuperar los clientes.');
           }
        }).
        error(function() {
           alert('Error al intentar recuperar los clientes.');
        });
     };
     $scope.guardarUser = function() {
        $http({
           method: 'POST',
           url: '/guardar',
           params: {
              name: $scope.name,
              email: $scope.email,
              _id: $scope._id
           }
        }).
        success(function(data) {
           if(typeof(data) == 'object'){
              $scope.limpiarDatos();
              $scope.cargarUsers();
           }else{
              alert('Error al intentar guardar el cliente.');
           }
        }).
        error(function() {
           alert('Error al intentar guardar el cliente.');
        });
     };
     $scope.recuperarUsuario = function(indice) {
        console.log('recuperarUsuario')
        $http({
           method: 'GET',
           url: '/recuperar',
           params: {
              _id: indice
           }
        }).
        success(function(data) {
            console.log('data:', data)
           if(typeof(data) == 'object'){
              $scope._id = data._id;
              $scope.name = data.name;
              $scope.email = data.email;
           }else{
              alert('Error al intentar recuperar el cliente.');
           } 
        }).
        error(function() {
           alert('Error al intentar recuperar el cliente.');
        });
     };
     $scope.eliminarUsuario = function(indice) {
        $http({
           method: 'DELETE',
           url: '/eliminar',
           params: {
              _id: indice
           }
        }).
        success(function(data) {
           if(data == 'Ok'){
              $scope.limpiarDatos();
              $scope.cargarUsers();
           }else{
              alert('Error al intentar eliminar el cliente.');
           } 
        }).
        error(function() {
           alert('Error al intentar eliminar el cliente.');
        });
     };
     $scope.limpiarDatos = function() {
        $scope._id = null;
        $scope.name = '';
        $scope.email = '';
     };
})