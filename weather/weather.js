console.log('Starting Get Weather Data');

//requiring the request module to make http requests.
const request = require ('request');


//this function takes three arguments, the latitude, longitude coordinates and a formal callback function parameter 
//the callback function would assume any function that calls it i.e. the actual function call.
//This is to allow the flexibility of the actual callback function 
//The callback function is to take two parameters (error, results)
module.exports.getWeatherData =  function (latitude, longitude, callback) {
    // let url = "https://api.darksky.net/forecast/01f9e6361372fc3b78310e171d41181a/9.84871,8.88438";
    let url = `https://api.darksky.net/forecast/01f9e6361372fc3b78310e171d41181a/${latitude},${longitude}`;
    request({
        url: url,
        json: true
    }, function (error, response, body){
        if (error) {
            callback(`Could not get data from darksky.net servers, \nCheck your network connection or api URL`);
        }else if (body.code == 400) {
            callback('The given location (or time) is invalid');
        }else if (body == 'Forbidden\n') {
            callback('This Request is Forbidden, Check your API Key');
        }
        else{
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
}
