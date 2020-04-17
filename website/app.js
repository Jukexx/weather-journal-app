/* Global Variables */

//import { cachedDataVersionTag } from "v8";

// function getBaseUrl(zipCode, countryCode){
//     let baseURL = `127.0.0.1:8000/all?zipCode=${zipCode}`;
//     return baseURL;
// }


function initializePage(){
    document.querySelector('#generate').addEventListener('click', getWeatherForPostCode);

}

function getWeatherForPostCode(){
    let zipCode = getZipCode();
    let url = getUrl(zipCode);
    getWeather(url);
}

const getWeather = async (url='') =>{ 
    const request = await fetch(url);
    try {
        const allData = await request.json();
        console.log('alldata:'+ JSON.stringify(allData, null, 4));
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };

  
// Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

initializePage();

function getUrl(zipCode) {
    let url = `/all?zipCode=${zipCode}`;
    return url;
}

function getZipCode() {
    return document.querySelector('#zip').value;
}
