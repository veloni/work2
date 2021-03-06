const switchMenuJs = () => {
	const switchPeriodOne = document.querySelector('.js-menu-switch-period-one');
	const switchPeriodTwo = document.querySelector('.js-menu-switch-period-two');
	const switchPeriodThree = document.querySelector('.js-menu-switch-period-three');
	const openSwitch = document.querySelector('.js-switch-period-two');
	const iconOpenSwitch = document.querySelector('.js-switch-period-two-open');
	let savePeriodTwo;

	const AddDnTwo = () => {
		switchPeriodThree.classList.add('dn');
		switchPeriodTwo.classList.add('dn');
		iconOpenSwitch.classList.add('dn');
		openSwitch.classList.remove('dn');
	}

	AddDnTwo();

	openSwitch.onclick = function() {
		switchPeriodTwo.classList.remove('dn');
		switchPeriodThree.classList.remove('dn');
		iconOpenSwitch.classList.remove('dn');
		openSwitch.classList.add('dn');
	}

	iconOpenSwitch.onclick = function(){
		switchPeriodTwo.classList.add('dn');
		switchPeriodThree.classList.add('dn');
		iconOpenSwitch.classList.add('dn');
		openSwitch.classList.remove('dn');
	}

	switchPeriodOne.onclick = function() {
		switchPeriodTwo.classList.add('dn');
		switchPeriodThree.classList.add('dn');
		iconOpenSwitch.classList.add('dn');
		openSwitch.classList.remove('dn');
	}

	const changeDataCircle = () => {
		if (!_adideOpenForDraw) {
			_argumentCircle = 0;
      _canvasHeight = 0;
      _canvasWidth = 0;
			return;
		}
		_argumentCircle = 2;
		_canvasHeight = 20;
		_canvasWidth = 20;
	}

	switchPeriodTwo.onclick = function() {
		savePeriodTwo = switchPeriodOne.textContent
		switchPeriodOne.innerHTML = switchPeriodTwo.textContent;
		switchPeriodTwo.innerHTML = savePeriodTwo;

		changePeriod();
		changeDataCircle();
		DrawCircle(_argumentCircle, _canvasHeight, _canvasWidth);
		AddDnTwo();
	}

	switchPeriodThree.onclick = function() {
		savePeriodTwo = switchPeriodOne.textContent
		switchPeriodOne.innerHTML = switchPeriodThree.textContent;
		switchPeriodThree.innerHTML = savePeriodTwo;
		
		changePeriod();
		changeDataCircle();
		DrawCircle(_argumentCircle, _canvasHeight, _canvasWidth);
		AddDnTwo();
	}

	const date = new Date();
	const start = new Date(date.getFullYear(), 0, 0);
	const diff = date - start;
	const oneDay = 1000 * 60 * 60 * 24;
	const day = Math.floor(diff / oneDay);
	let indexWeek = [];
	let WeekDataSearch = [];
	let WeekData = [];

	const giveWeekIndex = () => {
		_quantityDataMassive.forEach(function(item, index) {
			if (day >= index && day < index + 7) {
				indexWeek.push(index);
				indexWeek.push(item)
			}
		});
	}

	giveWeekIndex();

	const giveValueWeekSearch = () => {
		indexWeek.forEach(function(item, index) {
			if (index % 2 === 0) {
				const dateNumberYears = new Date(2021, 0, item);
				const maxDateMonthTwo = new Date(dateNumberYears.getFullYear(), dateNumberYears.getMonth() + 1, 0).getDate();
				let giveMonth = dateNumberYears.getMonth();
				let giveDate = dateNumberYears.getDate();

				if (giveDate >= maxDateMonthTwo) {
					giveDate = 0;
					giveMonth += 1;
				}

				WeekDataSearch.push(giveDate + 0 + ' ' + _monthMassive[giveMonth]);
			}
		});
	}
	giveValueWeekSearch();

	let AllTaskWeek = 0;

	const dateLoadWeek = () => {
		_task.id.filter(function(item) {
			WeekDataSearch.forEach(function(elem) {
				if (item['dueDate'] === elem) {
					WeekData.push(item['conditionTask']);
					AllTaskWeek += 1;
				}
			});
		});
	}

	dateLoadWeek();

	let indexMonth = [];

	const giveMonthIndex = () => {
		_quantityDataMassive.forEach(function(item, index) {
			nowDate = _now.getDate();

			if (index > day - nowDate && index < day - nowDate + maxDateMonth && item != 0) {
				indexMonth.push(index);
				indexMonth.push(item);
			}
		});
	}

	giveMonthIndex();

	const monthDataSearch = [];

	const giveValueMonthSearch = () => {
		indexMonth.forEach(function(item, index) {
			if (index % 2 === 0) {
				const dateNumberYears = new Date(2020, 0, item);
				const giveMonth = dateNumberYears.getMonth();
				const giveDate = dateNumberYears.getDate();

				monthDataSearch.push(giveDate + 1 + ' ' + _monthMassive[giveMonth]);
			}
		});
	}

	giveValueMonthSearch();

	const MonthData = [];
	let allTaskMonth = 0;

	const MonthLoadWeek = () => {
		_task.id.filter(function(item, index) {
			monthDataSearch.forEach(function(elem) {
				if (item['dueDate'] == elem) {
					MonthData.push(item['conditionTask']);
					allTaskMonth += 1;
				}
			});
		});
	}

	MonthLoadWeek();

	// load yearsDate

	const YearData = [];

	const loadDataYear = () => {
		_task.id.forEach(function(item) {
			YearData.push(item['conditionTask']);
		});
	}

	loadDataYear();

	const YearsDataSearch = [];

	const loadDataSearchYear = () => {
		_task.id.forEach(function(item) {
			YearsDataSearch.push(item['dueDate']);
		});
	}

	loadDataSearchYear();

	const loadInterest = (period, length) => {
		_quantityCompleted = 0;
		_quantityEnded = 0;
		_quantityActive = 0;

		period.forEach((item) => {
			switch (item) {
				case ('active'):
					_quantityActive += 1;
					break;
				case ('completed'):
					_quantityCompleted += 1;
					break;
				case ('ended'):
					_quantityEnded += 1;
					break;
				default:
					break;
			}
		});

		if (length === 0) {
			_quantityCompleted = 0;
			_quantityActive = 0;
			_quantityEnded = 0;
			return;
		}
		_quantityCompleted = _quantityCompleted / length * 100;
		_quantityActive = _quantityActive / length * 100;
		_quantityEnded = _quantityEnded / length * 100;
	}

	const changePeriod = () => {
		switch (switchPeriodOne.textContent.trim()) {
			case 'This month'.trim():
				loadInterest(MonthData, MonthData.length);
				break;
			case 'This week'.trim():
				loadInterest(WeekData, WeekData.length);
				break;
			case 'This year'.trim():
				loadInterest(YearData, _lenghtJson);
				break;
			default:
				break;
		}
	}

	loadInterest(WeekData, WeekData.length);

	let completedTask = 0;
	const switchPeriodTaskOne = document.querySelector('.js-task-menu-change-week');
	const switchPeriodTaskTwo = document.querySelector('.js-task-menu-change-month');
	const switchPeriodTaskThree = document.querySelector('.js-task-menu-change-year');
	const openTaskSwitch = document.querySelector('.js-switch-task-period');
	const switchPeriodOpen = document.querySelector('.js-switch-task-period-open');

	const AdDn = () => {
		switchPeriodTaskTwo.classList.add('dn');
		switchPeriodTaskThree.classList.add('dn');
		switchPeriodOpen.classList.add('dn');
	}

	switchPeriodTaskOne.onclick = function() {
		switchPeriodTaskTwo.classList.add('dn');
		switchPeriodTaskThree.classList.add('dn');
		openTaskSwitch.classList.remove('dn');
		switchPeriodOpen.classList.add('dn');
	}

	switchPeriodOpen.onclick = function() {
		switchPeriodTaskTwo.classList.add('dn');
		switchPeriodTaskThree.classList.add('dn');
		switchPeriodOpen.classList.add('dn');
		openTaskSwitch.classList.remove('dn');
	}

	AdDn();

	openTaskSwitch.onclick = function() {
		switchPeriodTaskThree.classList.remove('dn');
		switchPeriodTaskTwo.classList.remove('dn');
		switchPeriodOpen.classList.remove('dn');
		openTaskSwitch.classList.add('dn');
	}

	switchPeriodTaskTwo.onclick = function() {
		savePeriodTwo = switchPeriodTaskOne.textContent;
		switchPeriodTaskOne.innerHTML = switchPeriodTaskTwo.textContent;
		switchPeriodTaskTwo.innerHTML = savePeriodTwo;

		openTaskSwitch.classList.remove('dn');

		changePeriodTaskCompleted();
		renderTask();
		AdDn();
	}

	switchPeriodTaskThree.onclick = function() {
		savePeriodTwo = switchPeriodTaskOne.textContent
		switchPeriodTaskOne.innerHTML = switchPeriodTaskThree.textContent;
		switchPeriodTaskThree.innerHTML = savePeriodTwo;

		openTaskSwitch.classList.remove('dn');

		changePeriodTaskCompleted();
		renderTask();
		AdDn();
	}

	const renderTask = () => {
		firtTextBarTask.innerHTML = completedTask + ' task completed out of ' + lengthTaskMeter;
		skaleTask.style.width = 100 * completedTask / lengthTaskMeter + '%';
	};

	window.globalRenderTask = renderTask;

	const firtTextBarTask = document.querySelector('.js-first-tex-bar-task');
	const skaleTask = document.querySelector('.value-skale-tasks');
	let lengthTaskMeter = 0;

	const loadCompleteTask = (period, lenght) => {
		completedTask = 0;

		period.forEach((item) => {
			if (item === 'completed') {
				completedTask += 1;
				lengthTaskMeter = lenght;
			}
		});
	}

	const changePeriodTaskCompleted = () => {
		switch (switchPeriodTaskOne.textContent.trim()) {
			case 'This month'.trim():
				loadCompleteTask(MonthData, allTaskMonth);
				break;
			case 'This week'.trim():
				loadCompleteTask(WeekData, AllTaskWeek);
				break;
			case 'This year'.trim():
				loadCompleteTask(YearData, _lenghtJson);
				break;
			default:
				break;
		}
	}

	loadCompleteTask(WeekData, AllTaskWeek);

	// lineal graph

	const switchPeriodLinealGraphOne = document.querySelector('.js-menu-change-week-lineal-graph');
	const switchPeriodLinealGraphTwo = document.querySelector('.js-menu-change-month-lineal-graph');
	const switchPeriodLinealGraphThree = document.querySelector('.js-menu-change-year-lineal-graph');
	const closeLinealGraphSwitch = document.querySelector('.js-button-close-lineal-graph');
	const openLinealGraphSwitch = document.querySelector('.js-button-open-lineal-graph');
	let savePeriodLinealGraph = 0;

	const addDnLinealGraph = () => {
		switchPeriodLinealGraphTwo.classList.add('dn');
		switchPeriodLinealGraphThree.classList.add('dn');
		openLinealGraphSwitch.classList.add('dn');
	}

	addDnLinealGraph();

	switchPeriodLinealGraphOne.onclick = function() {
		openLinealGraphSwitch.classList.add('dn');
		switchPeriodLinealGraphTwo.classList.add('dn');
		switchPeriodLinealGraphThree.classList.add('dn');
		closeLinealGraphSwitch.classList.remove('dn');
	}

	closeLinealGraphSwitch.onclick = function() {
		openLinealGraphSwitch.classList.remove('dn');
		switchPeriodLinealGraphTwo.classList.remove('dn');
		switchPeriodLinealGraphThree.classList.remove('dn');
		closeLinealGraphSwitch.classList.add('dn');
	}

	openLinealGraphSwitch.onclick = function() {
		switchPeriodLinealGraphTwo.classList.add('dn');
		switchPeriodLinealGraphThree.classList.add('dn');
		openLinealGraphSwitch.classList.add('dn');
		closeLinealGraphSwitch.classList.remove('dn');
	}

	let dateX = [];
	let dateY = [];

	const monthDataFromLinealGraph = (period) => {
		_dataForGraph = [];
		dateX = [];
		dateY = [];
		_maxNumberX = 0;
		_minNumberX = 0;
		_maxNumberY = 0;
		_minNumberY = 0;
		_labelX = [];

		const monthDataLinealGraph = [];
		const calcDateX = [];

		_task.id.filter(function(item) {
			period.forEach(function(elem) {
				if (item['dueDate'] === elem && item['conditionTask'] === 'completed') {
					monthDataLinealGraph.push(elem);
				}
			});
		});

		monthDataLinealGraph.filter(function(item) {
			let quanityCompleted = 0;

			monthDataLinealGraph.forEach(function(elem, index) {
				if (item === elem) {
					calcDateX.push(item);
					quanityCompleted += 1;
					delete monthDataLinealGraph[index];
				}
			});

			dateY.push(quanityCompleted);
		});

		calcDateX.forEach(function(item, index) {
			if (calcDateX[index] == calcDateX[index - 1]) {
				delete calcDateX[index - 1];
			}
		});

		calcDateX.forEach(function(item) {
			dateX.push(item.match(/\d+/));
		});

		let calcOne = dateY;
		let calcTwo = dateX;

		calcTwo.forEach(function(el, i, item) {
			item[i] = [item[i], calcOne[i]];
		});

		calcTwo.sort(function(a, b) { return a[0] - b[0]; });

		let calcThree = calcTwo.map(function(el, i, item) {
			item[i] = el[0];
			return el[1];
		})

		dateX = calcTwo.flat();
		dateY = calcThree.flat();

		dateX.forEach(function(item, index) {
			dateX[index] = parseFloat(dateX[index]);
		});

		if (dateX.length === 12) {
			_maxNumberX = 12;
			_minNumberX = 0;
			_labelX = _monthMassiveRecutionForLinealGraph;
		} else {
			_maxNumberX = Math.max.apply(Math, dateX);
			_minNumberX = Math.min.apply(Math, dateX);
		}

		_maxNumberY = Math.max.apply(Math, dateY);
		_minNumberY = Math.min.apply(Math, dateY);

		dateX.forEach(function(item, index) {
			_dataForGraph[index] = {
				x: dateX[index],
				y: dateY[index],
			}
		});
	};

	const yearDataFromLinealGraph = () => {
		let yerLinealGraph = [];
		let yerLinealGraphTwo = [];
		_dataForGraph = [];
		dateX = [];
		dateY = [];
		_maxNumberX = 0;
		_minNumberX = 0;
		_maxNumberY = 0;
		_minNumberY = 0;
		_labelX = [];

		_task.id.forEach(function(item) {
			if (item['conditionTask'] === 'completed') {
				yerLinealGraph.push(item['dueDate']);
			}
		});

		yerLinealGraphTwo = yerLinealGraph;

		yerLinealGraphTwo.filter(function(item, i) {
			let saveCompletedTask = 0;

			yerLinealGraph.forEach(function(elem) {
				if (item === elem) {
					saveCompletedTask = saveCompletedTask + 1;
				}

				dateY[i] = saveCompletedTask;
			});
		});

		let monthDataNumber = [];
		let numberMonthDataNumber = [];

		yerLinealGraphTwo.forEach(function(item) {
			monthDataNumber.push(item.replace(/[0-9]/g, '').trim());
			numberMonthDataNumber.push(item.match(/\d+/));
		});

		let monthDataNumberValue = [];

		monthDataNumber.forEach(function(item) {
			_monthMassive.forEach(function(elem, i) {
				if (item === elem) {
					monthDataNumberValue.push(_monthValue[i]);
				}
			});
		});

		const monthForDateX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		const monthForDateY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		monthDataNumber.forEach(function(item) {
			_monthMassive.forEach(function(elem, i) {
				if (item === elem) {
					monthForDateY[i] = monthForDateY[i] + 1;
				}
			});
		});

		dateY = monthForDateY;
		dateX = monthForDateX;

		if (dateX.length === 12) {
			_maxNumberX = 12;
			_minNumberX = 0;
			_labelX = _monthMassiveRecutionForLinealGraph;
		} else {
			_maxNumberX = Math.max.apply(Math, dateX);
			_minNumberX = Math.min.apply(Math, dateX);
		}

		_maxNumberY = Math.max.apply(Math, dateY);
		_minNumberY = Math.min.apply(Math, dateY);

		dateX.forEach(function(item, index) {
			_dataForGraph[index] = {
				x: dateX[index],
				y: dateY[index],
			}
		});
	}

	monthDataFromLinealGraph(WeekDataSearch);

	window.globalRerender();

	const changePeriodLinealGraph = (period) => {
		switch (period.trim()) {
			case 'This month'.trim():
				monthDataFromLinealGraph(monthDataSearch);
				document.querySelector('.js-trigger-charts').click();
				break;
			case 'This week'.trim():
				monthDataFromLinealGraph(WeekDataSearch);
				document.querySelector('.js-trigger-charts').click();
				break;
			case 'This year'.trim():
				yearDataFromLinealGraph();
				document.querySelector('.js-trigger-charts').click();
				break;
			default:
				break;
		}
	}

	switchPeriodLinealGraphTwo.onclick = function () {
		changePeriodLinealGraph(switchPeriodLinealGraphTwo.textContent);
		savePeriodLinealGraph = switchPeriodLinealGraphOne.textContent
		switchPeriodLinealGraphOne.innerHTML = switchPeriodLinealGraphTwo.textContent;
		switchPeriodLinealGraphTwo.innerHTML = savePeriodLinealGraph;
		closeLinealGraphSwitch.classList.remove('dn');
		addDnLinealGraph();
	}

	switchPeriodLinealGraphThree.onclick = function () {
		changePeriodLinealGraph(switchPeriodLinealGraphThree.textContent);
		savePeriodLinealGraph = switchPeriodLinealGraphOne.textContent
		switchPeriodLinealGraphOne.innerHTML = switchPeriodLinealGraphThree.textContent;
		switchPeriodLinealGraphThree.innerHTML = savePeriodLinealGraph;
		addDnLinealGraph();
		closeLinealGraphSwitch.classList.remove('dn');
	}

	monthDataFromLinealGraph(WeekDataSearch);
}

switchMenuJs();