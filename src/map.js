const Rx = require('rxjs');

function handleEvent(event) {
	console.log('===', event);
	return event;
}

const newObserver = new Rx.Observable((subscriber) => {
	setTimeout(()=>subscriber.next({ description: 'from constructor', time: 1 }), 1000);
	setTimeout(()=>subscriber.next({ description: 'from constructor', time: 3 }), 3000);
});

newObserver.pipe(Rx.filter((evt) => evt.time > 2), Rx.map((evt) => undefined), Rx.filter((evt) => !!evt)).subscribe((val) => handleEvent(val));

/**
 * bufferTime will buffer all events and only dispatch on the interval,
 * if no events happened during last interval, an empty array of events is dispatched
 * this indicates some performance drawbacks
 */
