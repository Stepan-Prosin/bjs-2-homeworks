class AlarmClock {
	constructor() {
		this.alarmCollection = [];
		this.intervalid = null;
	}

	addClock(time, callback) {
		if (!time || !callback) {
			throw new Error('Отсутствуют обязательные аргументы');
		}

		if (this.alarmCollection.find(item => item.time === time)) {
			console.warn('Уже присутствует звонок на это же время');
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
		if (this.intervalid === null) {
			this.intervalid = setInterval(() => {
				this.alarmCollection.forEach(item => checkClock(item));
			}, 1000);
		}
	}
	stop() {
		if (this.intervalid !== null) {
			clearInterval(this.intervalid);
			this.intervalid = null;
		}
	}

	resetAllCalls() {
		this.alarmCollection.forEach(item => item.canCall = true);
	}
	clearAlarms() {
		this.stop();
		this.alarmCollection = [];
	}

}