const Rx = require('rxjs');
const programStartTime = Date.now();

function handleEvent(event) {
	console.log('Event handled', event, Date.now() - programStartTime);
	return event.index;
}

const newObserver = new Rx.Observable((subscriber) => {
	// 1-3s
	subscriber.next({ description: 'from constructor', time: 0 });
	setTimeout(()=>{
		const eventSeq = 900;
		console.log(`Event ${eventSeq} happens:`, Date.now() - programStartTime);
		subscriber.next({ eventDescription: eventSeq });
	}, 900);
	setTimeout(()=>{
		const eventSeq = 2500;
		console.log(`Event ${eventSeq} happens:`, Date.now() - programStartTime);
		subscriber.next({ eventDescription: eventSeq });
	}, 2500);

	// 4-6s nothing

	// 7-9s
	setTimeout(()=>{
		const eventSeq = 7700;
		console.log(`Event ${eventSeq} happens:`, Date.now() - programStartTime);
		subscriber.next({ eventDescription: eventSeq });
	}, 7700);
	setTimeout(()=>{
		const eventSeq = 8800;
		console.log(`Event ${eventSeq} happens:`, Date.now() - programStartTime);
		subscriber.next({ eventDescription: eventSeq });
	}, 8800);
});

const subscription = newObserver.pipe(Rx.filter(evt => true), Rx.debounceTime(3000)).subscribe((val) => handleEvent(val));
setTimeout(() => {
	subscription.unsubscribe();
}, 9000); // if not unsubscribe, the debounced Event 8800 would have happened.

/**
 * note: every event will get debounced!
 * 
 * debounceTime: on each new event, the previous one will be immediately dismissed, and the new one is debounced with n ms.
 * 
 * if unsubscribed after the event happened, the debounced events that could have been handled will NOT be handled anymore.
 */