export const logTimer = {
	startTime: null,
	label: '',
	showLog: false,

	start(label = 'Operation', showLog = false) {
		this.startTime = performance.now();
		this.label = label;
		this.showLog = showLog;

		if (this.showLog) {
			// console.log(`${this.label} started.`);
		}
	},

	stop() {
		if (this.startTime === null) {
			console.log('Timer was not started.');
			return;
		}
		const endTime = performance.now();
		const duration = endTime - this.startTime;
		// console.log(`${this.label} completed. Timer ran for ${duration.toFixed(2)} milliseconds.`);

		// Reset for next use
		this.startTime = null;
		this.label = '';
		this.showLog = false;
	}
};
