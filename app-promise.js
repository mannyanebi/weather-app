console.log('Starting App-Promise.js');

//Extending the Error object class to allow specific errors such as user address
class AddressError extends Error { };
class LocationError extends Error { };

//requiring the yargs parsers module to parse process.argv values
const yargs = require('yargs');

//requiring the axios module for making http request
//this module uses promises
const axios = require('axios');

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

//modifing input address into address string with URI enconding
address = encodeURIComponent(address);

//api url to make request for geocode data
let geocodeUrl = `https://geocoder.api.here.com/6.2/geocode.json?app_id=KVuwMjndNDZxztDGks8Z&app_code=BFTTB1Hlw9eKyNw4zWve6Q&searchtext=${address}`;

let position;

//function getWeatherData to make a http request call
var getWeatherData = function (weatherUrl) {
    //making a http request call using axios
    axios.get(weatherUrl)
        .then(function (weatherResponse) {
            if(weatherResponse.data.code == 400){
                // throws AddressError error
                // throw new LocationError(`\nThe given location (or time) is invalid`);
                console.log('Location Error');
                console.log(weatherResponse.data);
            }
            console.log(`The Current Temperature is ${weatherResponse.data.currently.temperature}\nAnd the Apparent Temperature is ${weatherResponse.data.currently.apparentTemperature}`)
            // console.log(weatherResponse.data);
        })
        .catch(function (error) {
            if (error.code == 'ENOTFOUND') {
                console.log(`Could not get data from darksky.net servers, \nCheck your network connection or api URL`);
            } else if (error instanceof LocationError) {
                console.log('Invalid Latitude and Longitude values!', error.message);
            }
            console.log(error);
        })
}

//function getGeocodeData to make a http request call
var getGeocodeData = function (geocodeUrl) {
    //making a http request call using axios
    axios.get(geocodeUrl)
        .then(function (geocodeResponse) {
            if (geocodeResponse.data.Response.View.length === 0) {
                // throws AddressError error
                throw new AddressError(`Unable to find this address.\nHint:Check your address`);
            }
            
            //position object with latitude and longitude
            position = {
                latitude: geocodeResponse.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
                longitude: geocodeResponse.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude,
            }

            //address
            let address = geocodeResponse.data.Response.View[0].Result[0].Location.Address.Label;
            
            //This prints if request was successful
            console.log(`Address: ${address}`);
            
            let weatherUrl = `https://api.darksky.net/forecast/01f9e6361372fc3b78310e171d41181a/${position.latitude},${position.longitude}`;
            getWeatherData(weatherUrl);
            
        })
        .catch(function (error) {
            if (error.code == 'ENOTFOUND') {
                console.log(`Unable to connect to geocoder.api.here servers\nHint:Check your network connection\nHint:Check your url address`);
            } else if (error instanceof AddressError) {
                console.log('Invalid Address!', error.message);
            }
        });
}

getGeocodeData(geocodeUrl);
// getWeatherData(weatherUrl);
