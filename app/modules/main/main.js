(function() {
	angular
		.module('app.main', [
			"highcharts-ng",
			"angularRangeSlider"
		])
		.config(appMainConfig)
		.controller('MainController', MainController);

		appMainConfig.$inject = ['$routeProvider'];

		function appMainConfig($routeProvider) {
			$routeProvider
				.when('/main', {
					templateUrl: 'modules/main/main.view.html',
					controller: 'MainController',
					controllerAs: 'main'
				});
		}

		/*
			Controller (Main)
			Desc: main page controller.
		*/

		MainController.$inject = ['$anchorScroll'];

		function MainController($anchorScroll) {
			var vm = this;
			vm.ctr = "main";
			vm.goToScreen = goToScreen;

			function goToScreen(screen, $event) {
				if(document.querySelectorAll('#' + screen + '_screen').length)
					$anchorScroll(screen + '_screen'); else
					$event.preventDefault();
			}
		}

})();