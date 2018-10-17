let asyncAdd = function (a,b) {
    return new Promise(function (resolve, reject) {
            if (!(typeof a == 'number' && typeof b == 'number')) {
                reject ('Unable to add these values');
            } else{
                resolve(a + b);
            }
        
    })
}

asyncAdd(5, 7)
    .then(function (value) {
    console.log(`The sum of the two numbers is ${value}`);
    return asyncAdd(5,'3');
})
    .catch(function (reason) {
        console.log(`This operation failed, here is why ${reason}`);
    });