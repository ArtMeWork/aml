(function() {
	angular
		.module('app.main')
		.directive('dragsort', dragsortDirective);

	/*
		Directive (dragsort)
		Desc: sorting the list by dragg and dropp.
	*/

	dragsortDirective.$inject = ['$document'];
	
	function dragsortDirective($document) {
		var directive = {
			link: link,
			restrict: 'EA',
			scope: {
				list: '=dragsort'
			}
		};
		return directive;

		function link(scope, list, attrs) {
			var 
				element,
				top = [];
			setTimeout(function() {
				getY();
				list.children().on('mousedown', mousedown);
				scope.$watch('list', function(newValue, oldValue) {
					if (newValue !== oldValue) {
						list.children().off('mousedown', mousedown);
						list.children().on('mousedown', mousedown);
					}
				}, true);
			}, 10);

			function getY() {
				var _list = list.children();
				top = [];
				for(var i=0; i<_list.length; i++) {
					top.push(_list[i].offsetTop);
				}
			}

			function mousedown(item) {
				if (
					!list[0].className.match('edit')
					&& !item.target.className.match('no-drag')
					) {
					element = item.target;
					item.preventDefault();
					if(item.target.getAttribute('dragsort-item')===null)
						element = element.offsetParent;
					angular.element(element).addClass('drag');
					$document.on('mousemove', mousemove);
					$document.on('mouseup', mouseup);
				}
			}

			function mousemove(e) {
				var 
					item,
					newOrder = 0,
					oldOrder = element.getAttribute('dragsort-item');

				for(var i = 0; i < top.length; i++)
					if(e.pageY > top[i]) newOrder = i;
				
				if(newOrder != oldOrder)
					scope.$apply(function() {
						item = scope.list.splice(oldOrder, 1)[0];
						scope.list.splice(newOrder, 0, item);
					});
			}

			function mouseup() {
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
				angular.element(element).removeClass('drag');
				getY();
				window.localStorage.setItem('list', JSON.stringify(scope.list));
			}
		}
	}
})();