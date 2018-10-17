console.log('Starting geocode.js')
//requiring the request module for http(s) calls
const request = require('request');

function geocodeAddress(address, callback) {
    //callback is a callback function, hence an formal parameter that takes two parameters errorMessage and results
    //the parameters are created dynamically
    //modifing input address into address string with URI enconding
    address = encodeURIComponent(address);
    
    
    let url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=KVuwMjndNDZxztDGks8Z&app_code=BFTTB1Hlw9eKyNw4zWve6Q&searchtext=${address}`;
    
    // let url = "https://geocoder.api.here.com/6.2/geocode.json?app_id=KVuwMjndNDZxztDGks8Z&app_code=BFTTB1Hlw9eKyNw4zWve6Q&searchtext=Mohammadu+Buhari+Way+Area%2010+Garki+Abuja+Nigeria";
    request({
        url: url,
        json: true
        }, function (error, response, body) {
        
            if(error){
                //calling the callback function with the errorMessage only 
                //i.e. callback(errorMessage)
                callback(`Could not get data from geocoder.api.here servers, \nCheck your network connection`);
            } else if (body.Response.View.length === 0) {
                callback('Could not find this address');
            } else {
                //calling the callback function with the errorMessage as undefined and the results being an object
                callback(null, {
                    address: body.Response.View[0].Result[0].Location.Address.Label,
                    latitude: body.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
                    longitude: body.Response.View[0].Result[0].Location.DisplayPosition.Longitude
                });
            }
    });
}
module.exports = {
    geocodeAddress: geocodeAddress  
}