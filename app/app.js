(function() {
	angular
		.module('app', [
			'ngRoute',
			'app.main',
			'app.something'
		])
		.config(appConfig)
		.run(runApp);

		appConfig.$inject = ['$routeProvider'];

		function appConfig($routeProvider) {
			$routeProvider
				.otherwise({
					template: "<h2 align='center'>404 Page not found.</h2>"
				})
				.when('/', {
					redirectTo: '/main'
				});
		}

		runApp.$inject = ['$rootScope', '$location'];
		function runApp($rootScope, $location) {
			$rootScope.$on('$routeChangeSuccess', function() {
				$rootScope.url = $location.path();
			})
		}
})();