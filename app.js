console.log('Starting App.js');

//requiring the request module for http(s) calls
const request = require('request');

//requiring the yargs parsers module to parse process.argv values
const yargs = require('yargs');

//requiring a local js module file - geocode.js
const geocode = require('./geocode/geocode');

//requiring a local js module file - weather.js
const weather = require('./weather/weather')

//yargs argument for user interactions with the CLI
const argv = yargs
            .options('a', {
                alias: 'address',
                demandOption: true,
                describe: 'This is the address for the location you want to get weather information about',
                string: true
            })
            .help()
            .alias('h', 'help')
            .argv;

//getting address from user through the CLI input parsed by yargs to determine weather of desired location
let address = argv.address;


//parsing the address to the geocode function to compute its geocode data
//the function there is a callback actual parameter to the formal parameter in the geocodeAddress function,
//so if callback from geocodeAddress function is called with errorMessage as the ONLY parameter,
// the if condition is executed, else the results is printed because callback(undefined, results(object)) is called
geocode.geocodeAddress(address, function (errorMessage, results){
    if(errorMessage){
        console.log(errorMessage);
    }else{
        console.log(`The following weather data is for this address: ${results.address}`);
        
        weather.getWeatherData(results.latitude, results.longitude,function (errorMessage, weatherResults) {
            if(errorMessage){
                console.log(errorMessage);
            }
            else{
                console.log(`The Apparent Temperature is ${weatherResults.apparentTemperature}\nTemperature is ${weatherResults.temperature}`)
            }
        });
    }
});




//My Darksky API Key
//https://api.darksky.net/forecast/01f9e6361372fc3b78310e171d41181a/