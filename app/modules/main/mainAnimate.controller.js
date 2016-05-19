(function() {
	angular
		.module('app.main')
		.controller('MainAnimateController', MainAnimateController);

	/*
		Controller (AnimateSort)
		Desc: screen controller with animation on main page.
	*/

	MainAnimateController.$inject = ['$scope'];

	function MainAnimateController($scope) {
		var 
			vm = this,
			animate = (animateFunction)();

		vm.ball = {};
		vm.speed = {
			name  : 'Ball speed (milliseconds)',
			value : 1000
		};
		vm.isPaused = true;
		vm.pause = function() {
			vm.isPaused = !vm.isPaused;
			!vm.isPaused ?
				animate.go() :
				animate.pause();
		};
		animate.setconfig({
			duration: 3000,
			timing: quad,
			draw: function(progress) {
				vm.ball.top = 200 + progress * 175 + 'px';
				$scope.$apply('vm.ball');
			}
		},{
			duration: 3000,
			timing: makeEaseOut(quad),
			draw: function(progress) {
				vm.ball.top = 375 + (progress * -175) + 'px';
				$scope.$apply('vm.ball');
			}
		});

		$scope.$watch('vm.speed.value', function() {
			animate.speed(vm.speed.value);
		});

		function quad(progress) {
			return Math.pow(progress, 2);
		}

		function makeEaseOut(timing) {
			return function(timeFraction) {
				return 1 - timing(1 - timeFraction);
			}
		}

		function animateFunction(){
			var pr = {
				config: {},
				configBack: null,
				start: 0,
				back: false,
				pause: false,
				speed: 0
			};
			var pb = {
				setconfig: function(config, configBack) {
					pr.config = config;
					if (configBack)
						pr.configBack = configBack;
				},
				animate: function() {
					var 
						options = pr.back && pr.configBack ? pr.configBack : pr.config,
						start = performance.now() - pr.start * (options.duration);
					pr.pause = false;
					requestAnimationFrame(function animate(time) {
						if (pr.pause===false) {
							pr.start = 0;

							if (pr.speed !== options.duration) {
								start = time - (time - start) / options.duration * pr.speed;
								pr.back.duration = options.duration = pr.speed;
								if(pr.configBack) pr.configBack.duration = pr.speed;
							}

							var timeFraction = (time - start) / options.duration;
							if (timeFraction > 1) timeFraction = 1;

							var progress = options.timing(timeFraction);

							options.draw(progress);

							if (timeFraction < 1) {
								requestAnimationFrame(animate);
							} else
								if (pr.configBack) {
									pr.back = !pr.back;
									pb.animate();
								}
						} else pr.start = (time - start) / options.duration;
					});
				},
				pause: function() {
					pr.pause = true;
				},
				changespeed: function(s) {
					pr.speed = s;
				}
			};

			return {
				setconfig: pb.setconfig,
				go: pb.animate,
				pause: pb.pause,
				speed: pb.changespeed
			}
		}
		
	}

})();