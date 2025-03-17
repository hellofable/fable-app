// src/lib/debounce.js
export function debounce(func, wait) {
	let timeout;
	return function (...args) {
		const context = this;
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(context, args), wait);
	};
}

export function throttle(func, wait) {
	let timeout = null;
	let lastRun = 0;

	return function (...args) {
		const context = this;
		const now = Date.now();

		if (now - lastRun >= wait) {
			// If enough time has passed, execute the function immediately
			lastRun = now;
			clearTimeout(timeout);
			func.apply(context, args);
		} else {
			// Otherwise, schedule to run the function after the remaining time
			clearTimeout(timeout);
			timeout = setTimeout(
				() => {
					lastRun = Date.now();
					func.apply(context, args);
				},
				wait - (now - lastRun)
			);
		}
	};
}
