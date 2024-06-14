class AlarmClock {
	constructor() {
		this.alarmCollection = [];
		this.IntervalID = null;
	}

	addClock(time, callback) {
		if (time === undefined || callback === undefined) {
			throw new Error('Отсутствуют обязательные аргументы');
		}

		if (this.alarmCollection.find(item => item.time === time)) {
			console.warn('Уже присутствует звонок на это же время');
			return;
		}

		this.alarmCollection.push({
			time,
			callback,
			canCall: true
		});
	}
	removeClock(time) {
		this.alarmCollection = this.alarmCollection.filter(item => item.time !== time);
	}
	getCurrentFormattedTime() {
		let date = new Date();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		if (hours < 10) {
			hours = '0' + hours;
		}
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		return hours + ':' + minutes;
	}
	start() {
		let checkClock = (item) => {
			if (this.getCurrentFormattedTime() === item.time && item.canCall) {
				item.canCall = false;
				item.callback();
			}
		}
		if (this.IntervalID === null) {
			this.IntervalID = setInterval(() => {
				this.alarmCollection.forEach(item => checkClock(item));
			}, 1000);
		}
	}
	stop() {
		if (this.IntervalID !== null) {
			clearInterval(this.IntervalID);
			this.IntervalID = null;
		}
	}
	printAlarms() {
		this.alarmCollection.forEach(item => console.log(item.time));
	}
	resetAllCalls() {
		this.alarmCollection.forEach(item => item.canCall = true);
	}
	clearAlarms() {
		this.stop();
		this.alarmCollection = [];
	}

}