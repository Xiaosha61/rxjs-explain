const Rx = require('rxjs');

function handleEvent(event) {
	console.log('===', event);
	return event.index;
}

// 1. create an Observable using constructor
const newObserver = new Rx.Observable((subscriber) => {
	subscriber.next({ description: 'from constructor', index: 1 });
	subscriber.next({ description: 'from constructor', index: 2 });
});
newObserver.subscribe((val) => handleEvent(val));


// 2. create an Observable from a promise
const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('resolved!!!');
	}, 1000);
});
const observerFromPromise = Rx.observerFromPromise(promise);
observerFromPromise.subscribe(handleEvent);
