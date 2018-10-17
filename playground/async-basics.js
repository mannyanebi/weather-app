console.log('Starting App');

setTimeout(() => {
    console.log('Inside Async Callback');
}, 2000);

setTimeout(() => {
    console.log('Second Async Callback');
}, 1000);

console.log('Finishing App');