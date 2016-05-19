(function() {
	angular
		.module('app.main')
		.controller('MainGraphController', MainGraphController);

		/*
			Controller (GraphSort)
			Desc: screen controller with graph on main page.
		*/

		function MainGraphController() {
			var vm = this;
			vm.ctr = "graphs";
			vm.highchartsNG = {
				options: {
					chart: {
						type: 'column'
					}
				},
				series: [{
					name: "Values",
					data: [5,10,7,11,5,13,10,5,11,5,12,8]
				}],
				title: {
					text: 'Main graph'
				},
				credits: {
					enabled: false
				}
			};
		}
})();