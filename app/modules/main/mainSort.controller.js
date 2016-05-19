(function() {
	angular
		.module('app.main')
		.controller('MainSortController', MainSortController);

		/*
			Controller (MainSort)
			Desc: sorting screen controller on main page.
		*/

		function MainSortController() {
			var vm = this;
			vm.list = getList() || ['one', 'two', 'three', 'four', 'five'];
			vm.isEdit = false; 
			vm.edit = editItem;
			vm.save = btnSave;
			vm.cancel = btnCancel;
			vm.temp = '';

			function editItem(id) {
				if(vm.isEdit===false) {
					vm.isEdit = id;
					vm.temp = vm.list[id];
				}
			}

			function btnSave(id) {
				vm.isEdit = false;
				vm.list[id] = vm.temp;
				saveList(vm.list);
			}

			function btnCancel(id) {
				vm.isEdit = false;
			}

			function getList() {
				return JSON.parse(window.localStorage.getItem('list'));
			}

			function saveList(list) {
				window.localStorage.setItem('list', JSON.stringify(list));
			}
		}
})();