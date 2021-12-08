const Rx = require('rxjs');

function handleEvent(event) {
	console.log('===', event);
	return event.index;
}

const newObserver = new Rx.Observable((subscriber) => {
	// 1-3s
	setTimeout(()=>subscriber.next({ description: 'from constructor', time: 1 }), 1000);

	// 4-6s
	setTimeout(()=>subscriber.next({ description: 'from constructor', time: 3 }), 3000);
	setTimeout(()=>subscriber.next({ description: 'from constructor', time: 5 }), 5000);

	// 7-9s
	setTimeout(()=>subscriber.next({ description: 'from constructor', time: 7 }), 7000);
	setTimeout(()=>subscriber.next({ description: 'from constructor', time: 8.5 }), 8500);
	setTimeout(()=>subscriber.next({ description: 'from constructor', time: 8.9 }), 8800);
});

newObserver.pipe(Rx.bufferTime(3000)).subscribe((val) => handleEvent(val));

/**
 * bufferTime will buffer all events and only dispatch on the interval,
 * if no events happened during last interval, an empty array of events is dispatched
 * this indicates some performance drawbacks
 */
