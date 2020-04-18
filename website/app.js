/* Global Variables */

function initializePage() {
    document.querySelector('#generate').addEventListener('click', getWeatherForZipCode);
};

function getWeatherForZipCode() {

    clearCurrentWeatherInfo();
    let zipCode = getZipCode();
    let isFeelingPopulated = checkFeeling();

    if (!zipCode || !checkFeeling()) {
        return;
    }

    let zipCodeUrl = getZipCodeUrl(zipCode);

    if (!validateZipCode(zipCodeUrl)) {
        return;
        //TODO set zipCode textbox background to red
    }

    let weatherUrl = getWeatherUrl(zipCode);
    getWeather(weatherUrl).json;
};

//#region server calls

const validateZipCode = async (zipCodeUrl = '') => {
    const request = await fetch(zipCodeUrl);
    const isValidUrl = await request.json();

    if (request.status === 400) {
        console.log('invalid zipcode');
        setFieldClassToError('zip');
        document.querySelector(`#invalidzipwarning`).style.display = 'block'; 
    }
    else {
        console.log('valid zipcode');
        console.log('city ', isValidUrl.postalCode.city);
        setFieldClassToValid('zip');
    }
};

const getWeather = async (url = '') => {
    const request = await fetch(url);
    try {
        const allData = await request.json();
        //Writes in the HTML the location, sky and temperature of the zip code added
        document.querySelector('#cityweather').innerHTML = `Weather in : ${allData.sys.country}, ${allData.name}`;
        document.querySelector('#currentweather').innerHTML = `The sky is ${allData.weather[0].main} and the temperature is : ${Math.round(allData.main.temp)}°C`;
        document.querySelector('#zip').style.backgroundColor = "green";
    }
    catch (error) {

        if (TypeError == 'SpecificError') {
            document.querySelector('#zip').style.backgroundColor = "red";
        } 
        else {
            document.querySelector('#zip').style.backgroundColor = "red";
            console.log("error", error);
        }
    }
};


//#endregion

//#region helper methods
function getWeatherUrl(zipCode) {
    let url = `/all?zipCode=${zipCode}`;
    return url;
};

function getZipCodeUrl(zipCode) {
    return `/checkzipcode?zipCode=${zipCode}`;
};

function checkZipCode() {
    let zipCodeField = document.querySelector('#zip').value;
};

function clearCurrentWeatherInfo(){
    //write this
    document.querySelector('#cityweather').innerHTML = ``;
    document.querySelector('#currentweather').innerHTML = ``;
    document.querySelector(`#invalidzipwarning`).style.display = 'none'; 
};

//#endregion

//#region UI Manipulation
function checkFeeling() {
    let feelingsField = document.querySelector('#feelings').value;

    if (feelingsField === '') {
        setFieldClassToError('feelings')
        return false;
    }
    else {
        setFieldClassToValid('feelings');
        return true;
    }
};

function setFieldClassToError(fieldName) {
    //Changes class of invalid input
    document.querySelector(`#${fieldName}`).setAttribute('class', 'error');
};

function setFieldClassToValid(fieldName) {
    //Changes class of valid input
    document.querySelector(`#${fieldName}`).setAttribute('class', 'valid'); 
};

function getZipCode() {

    let zipCode = document.querySelector('#zip').value;

    if (zipCode === '') {
        return false;
    }
    else {
        return document.querySelector('#zip').value;
    }
};
//#endregion

initializePage();








