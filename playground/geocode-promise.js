console.log('Starting Geocode-Promise.js');
//requiring the request module
const request = require('request');

//geocodeAddress function taking one parameter (address)
function geocodeAddress(address) {
    //promise to resolve or reject if request succeeds or fails
    return new Promise(function (resolve, reject) {
    //request method to make http calls
    request({
        url: address,
        json: true
    }, function (error, response, body) {
            if(!error){
                resolve(body.Response.View[0].Result[0].Location.DisplayPosition);
            }else{
                reject('Unable to Connect to api.geocode.here server, Check your connection');
            }
        });
    })
}

geocodeAddress('https://geocoder.api.here.com/6.2/geocode.json?app_id=KVuwMjndNDZxztDGks8Z&app_code=BFTTB1Hlw9eKyNw4zWve6Q&searchtext=Rayfield%20Rd,%20Jos%20South,%20Plateau%20State,%20Nigeria')
    .then(function (position) {
    console.log(JSON.stringify(position, null, 2));
}).catch(function (error) {
    console.log('Failed, Reason is: ', error);
})
