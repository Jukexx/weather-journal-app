//

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const fetch = require("node-fetch");
// Start up an instance of app
const app = express();
/* Middleware*/
var bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;
let apiKey = '57dab2d04f62a1543169c35a20f27a8d';
 
//  function getBaseUrl(zipCode, countryCode){
//      console.log('getBaseUrl Serverside is working');
//     let baseURL = `api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}`;
//     return baseURL;
// }

// Setup Server
//api.openweathermap.org/all?zip=${zipCode},${countryCode}&appid=${apiKey}
app.get('/all', sendData);

function sendData (req, res) {
    //let url = getBaseUrl(req.zipCode, 'us');
    let countryCode = 'us';
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?zip=${req.query.zipCode},${countryCode}&appid=${apiKey}`;
        
    const retrieveData = async (endpoint) =>{ 
        const request = await fetch(endpoint);
        try {
        // Transform into JSON
        const allData = await request.json();
        res.send(allData);
        }
        catch(error) {
            console.log("error", error);
            // appropriately handle the error
        }
            
        };        
        
        retrieveData(endpoint);
}


  



const server = app.listen(port,listening);

function listening(){
    console.log('Server running');
    console.log(`Running on localhost:${port}`);
}

//POST route

// const data = [];

// app.post('/weather', getWeather)

// function getWeather( req, res){
//     newEntry = {
//         temperature: req.body.temp
//         date: req.body.date
//         userResponse: req.body.userRes 
//     }
//     projectData.push(newEntry);
//     console.log(projectData);
// }