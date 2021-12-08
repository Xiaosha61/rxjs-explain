const Rx = require('rxjs');

function handleEvent(event) {
	console.log('===', event);
	return event.index;
}

const newObserver = new Rx.Observable((subscriber) => {
	// 1-3s
	subscriber.next({ description: 'from constructor', time: 0 });
	setTimeout(()=>subscriber.next({ description: 'from constructor', time: 0.9 }), 900);
	setTimeout(()=>subscriber.next({ description: 'from constructor', time: 2.5 }), 2500);

	// 4-6s nothing

	// 7-9s
	setTimeout(()=>subscriber.next({ description: 'from constructor', time: 7.7 }), 7700);
	setTimeout(()=>subscriber.next({ description: 'from constructor', time: 8.8 }), 8800);
});

newObserver.pipe(Rx.filter(evt => true), Rx.debounceTime(3000)).subscribe((val) => handleEvent(val));

/**
 * note: every event will get debounced!
 * 
 * debounceTime: on each new event, the previous one will be immediately dismissed, and the new one is debounced with n ms.
 */
