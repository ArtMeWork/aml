(function() {
	angular
		.module('app.something', [])
		.config(somethingConfig)
		.controller('SomethingController', SomethingController);

		somethingConfig.$inject = ['$routeProvider'];

		function somethingConfig($routeProvider) {
			$routeProvider
				.when('/something', {
					templateUrl: 'modules/something/something.view.html',
					controller: 'SomethingController',
					controllerAs: 'vm'
				});
		}

		function SomethingController() {
			var vm = this;
			vm.ctr = "something";
		}

})();